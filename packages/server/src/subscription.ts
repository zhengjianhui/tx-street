import { WebSocket } from 'ws';
import { parentPort } from 'worker_threads';
import { PoolTransactionEntry } from './types';
import { HexNumber, HexString, Block, Transaction } from '@ckb-lumos/lumos';
import { TransactionWithStatus } from '@ckb-lumos/base';

function subscribe(): WebSocket {
  const rpc = process.env.CKB_RPC_WS!;

  const socket = new WebSocket(rpc);
  const results = new Array<string>(4);

  const txes = new Map<string, TransactionWithStatus>();
  const proposedTransactionHashes = new Map<string, string[]>();
  const blockProposals = new Map<HexNumber, string[]>();

  const req = {
    id: 1,
    jsonrpc: '2.0',
    method: 'subscribe',
    params: [''],
  };

  socket.on('open', async () => {
    req.id = 0;
    req.params = ['new_transaction'];
    socket.send(JSON.stringify(req));
    req.id = 1;
    req.params = ['rejected_transaction'];
    socket.send(JSON.stringify(req));
    req.id = 2;
    req.params = ['proposed_transaction'];
    socket.send(JSON.stringify(req));
    req.id = 3;
    req.params = ['new_tip_block'];
    socket.send(JSON.stringify(req));
  });

  socket.on('message', async (event) => {
    const obj = JSON.parse(event.toString());
    if (obj.id != undefined) {
      results[obj.id] = obj.result;
    } else {
      switch (obj.params.subscription) {
        case results[0]:
          handleNewTransaction(obj.params.result, txes);
          break;
        case results[1]:
          handleRejectedTransaction(obj.params.result, txes);
          break;
        case results[2]:
          handleProposedTransaction(obj.params.result, txes, proposedTransactionHashes);
          break;
        case results[3]:
          handleNewBlockTip(obj.params.result, txes, proposedTransactionHashes, blockProposals);
          break;
      }
    }
  });

  return socket;
}

function handleNewTransaction(raw: string, txes: Map<string, TransactionWithStatus>) {
  const tx = JSON.parse(raw) as PoolTransactionEntry;

  const hash = tx.transaction.hash;
  if (hash == undefined) {
    return;
  }

  parentPort?.postMessage({
    transaction: tx.transaction,
    previousStatus: undefined,
    currentStatus: 'pending',
  });

  txes.set(hash, {
    transaction: tx.transaction,
    tx_status: {
      status: 'pending',
    },
  });
}

function handleProposedTransaction(
  raw: string,
  txes: Map<string, TransactionWithStatus>,
  proposedTransactionHashes: Map<string, string[]>,
) {
  const tx = JSON.parse(raw) as PoolTransactionEntry;
  const hash = tx.transaction.hash;
  if (hash == undefined) {
    return;
  }

  const previousStatusTx = txes.get(hash);

  const proposedShortId = tx.transaction.hash!.slice(0, 10);
  let hashes = proposedTransactionHashes.get(proposedShortId);
  if (hashes == undefined) {
    hashes = [];
  }
  hashes.push(hash);
  proposedTransactionHashes.set(proposedShortId, hashes);

  parentPort?.postMessage({
    transaction: tx.transaction,
    previousStatus: previousStatusTx?.tx_status.status,
    currentStatus: 'proposed',
  });

  txes.set(hash, {
    transaction: tx.transaction,
    tx_status: {
      status: 'proposed',
    },
  });
}

function handleRejectedTransaction(raw: string, txes: Map<string, TransactionWithStatus>) {
  const res = JSON.parse(raw);
  const tx = res[0] as PoolTransactionEntry;
  const hash = tx.transaction.hash;
  if (hash == undefined) {
    return;
  }

  const previousStatusTx = txes.get(hash);

  parentPort?.postMessage({
    transaction: tx.transaction,
    previousStatus: previousStatusTx?.tx_status.status,
    currentStatus: 'rejected',
  });

  txes.delete(hash);
}

function handleNewBlockTip(
  raw: string,
  txes: Map<string, TransactionWithStatus>,
  proposedTransactionHashes: Map<string, string[]>,
  blockProposals: Map<HexNumber, string[]>,
) {
  const block = JSON.parse(raw) as Block;

  handleCommittedTransaction(block.transactions, txes, proposedTransactionHashes);

  handleProposal(block.header.number, block.proposals, blockProposals, proposedTransactionHashes, txes);
}

function handleProposal(
  blockNumber: HexNumber,
  proposals: string[],
  blockProposals: Map<HexNumber, string[]>,
  proposedTransactionHashes: Map<string, string[]>,
  txes: Map<string, TransactionWithStatus>,
) {
  blockProposals.set(blockNumber, proposals);
  blockNumber = (Number.parseInt(blockNumber, 16) - 11).toString(16);
  const backToPending = blockProposals.get(blockNumber);
  if (backToPending == undefined) {
    return;
  }

  for (const proposalShortId of backToPending) {
    const hashes = proposedTransactionHashes.get(proposalShortId);
    if (hashes == undefined) {
      continue;
    }

    for (const hash of hashes!) {
      const tx = txes.get(hash);
      if (tx == undefined) {
        continue;
      }

      tx.tx_status.status = 'pending';
      txes.set(hash, tx);
    }

    proposedTransactionHashes.delete(proposalShortId);
  }

  blockProposals.delete(blockNumber);
}

function handleCommittedTransaction(
  transactions: Transaction[],
  txes: Map<string, TransactionWithStatus>,
  proposedTransactionHashes: Map<string, string[]>,
) {
  for (const transaction of transactions) {
    const hash = transaction.hash;
    if (hash == undefined) {
      continue;
    }

    const previousStatusTx = txes.get(hash);
    const proposalShortId = hash.slice(0, 10);
    let hashes = proposedTransactionHashes.get(proposalShortId);
    if (hashes) {
      hashes = hashes.filter((v) => v != hash);
      proposedTransactionHashes.set(proposalShortId, hashes);
    }

    parentPort?.postMessage({
      transaction: transaction,
      previousStatus: previousStatusTx?.tx_status.status,
      currentStatus: 'committed',
    });

    txes.delete(hash);
  }
}

subscribe();
