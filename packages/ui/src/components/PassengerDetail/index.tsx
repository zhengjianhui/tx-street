import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

export type PassengerDetailProps = {
  hash: string;
  x: number;
  y: number;
  handleClose?: () => void;
};

const PassengerDetailWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  z-index: auto;

  .box {
    background-color: rgba(200, 200, 200, 0.6);
    border: 1px solid #000;
    border-radius: 3px;
    width: 300px;
    height: 200px;
    margin: 10px;
    padding: 10px;
  }
  .handle {
    cursor: move;
    border: 1px solid #eee;
    display: inline-block;
    width: 280px;
  }
`;

export const PassengerDetail: React.FC<React.HTMLAttributes<HTMLSpanElement> & PassengerDetailProps> = (props) => {
  const { hash, x, y, handleClose } = props;

  // const x = window.clientX - 600;
  // const y = window.clientY - 400;
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      handle=".handle"
      defaultPosition={{ x: x - 600, y: y - 400 }}
      key={hash}
      scale={1}
    >
      <PassengerDetailWrapper ref={nodeRef}>
        <div className="box">
          <div style={{ display: 'flex' }}>
            <div className="handle">{hash}</div>
            <button style={{ display: 'inline-block' }} onClick={handleClose}>
              x
            </button>
          </div>
          <div>demo</div>
        </div>
      </PassengerDetailWrapper>
    </Draggable>
  );
};
