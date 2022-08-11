import { faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PassengerDetail } from '../../components/PassengerDetail';
import { ReactEvent } from '../../events/ReactEvent';
import { startGame } from '../../playground';

const PlaygroundWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  color: #1f1f1f;
  font-family: Inter, Arial, sans-serif;
  button {
    line-height: 1.5rem;
    font-size: 1.5rem;
    position: fixed;
    cursor: pointer;
    top: 0;
    z-index: 40;
    border: none;
    padding: 0.75rem;
    background-color: white;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
`;

export const PlaygroundView: React.FC = () => {
  const { symbol } = useParams();
  const [passengers, setPassengers] = React.useState<{ hash: string; x: number; y: number }[]>([]);

  useEffect(() => {
    console.log(`playground ${symbol} init`);
    const webSocket = new WebSocket('ws://localhost:8899');
    webSocket.onopen = () => {
      console.log('open');
    };

    webSocket.onmessage = (event) => {
      console.log('message');
      console.log(event);
    };
    const timeout = setTimeout(() => {
      const game = startGame();
      // setPlaygroundGame(game);
      game.events.addListener('REACT_EVENT', (event: ReactEvent) => {
        if (event.action === 'showWin') {
          if (!passengers.find((p) => p.hash === event.payload.hash)) {
            setPassengers((_passengers) => [..._passengers, event.payload]);
          }
        }
      });
    }, 300);
    return () => clearTimeout(timeout);
  });

  return (
    <PlaygroundWrapper>
      <button className="left">
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button className="right">
        <FontAwesomeIcon icon={faCog} />
      </button>
      <div>
        {passengers.map((passenger) => (
          <PassengerDetail
            {...passenger}
            key={passenger.hash}
            handleClose={() => setPassengers(passengers.filter((p) => p.hash !== passenger.hash))}
          ></PassengerDetail>
        ))}
      </div>
    </PlaygroundWrapper>
  );
};
