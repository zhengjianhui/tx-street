import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { TxStreetContainer } from '../../containers/TxStreetContainer';

const LandingTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;

  .top-left-buttons {
    order: 1;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  .landing-title {
    order: 2;
    margin-left: 1.5rem;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  .top-right-buttons {
    order: 3;
    margin-left: auto;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    margin: 0.75rem;
    align-items: center;
    padding: 0.75rem;
    background-color: #ffff;
    border: 1px solid transparent;
  }
  button.is-primary {
    background-color: #0bc2a6;
    border-color: transparent;
    color: #fff;
  }
  button.is-dark {
    background-color: #1f1f1f;
    border-color: transparent;
    color: #fff;
  }
`;

interface LandingTopProps {
  title?: string;
}

export const LandingTop: React.FC<LandingTopProps> = (props: LandingTopProps) => {
  const { showSidebar, setShowSidebar } = TxStreetContainer.useContainer();
  return (
    <LandingTopWrapper>
      <div className="top-left-buttons">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="top-right-buttons">
        <button className="is-primary">Connect Wallet</button>
        <button className="is-dark">
          <FontAwesomeIcon icon={faMoon} />
        </button>
      </div>
      <div className="landing-title">{props.title}</div>
    </LandingTopWrapper>
  );
};
