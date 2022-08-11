import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingTop } from '../../components/LandingTop';

const HomeWrapper = styled.section`
  .launch-bg-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(31, 31, 31, 0.8);
    z-index: 0;
    backdrop-filter: blur(5px);
  }

  .launch-bg-container {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    > div {
      background-size: cover;
      height: 100%;
      width: 100%;
    }
  }

  .launch-container {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    text-align: center;
    left: 0;
    right: 0;
    z-index: 1;

    > div {
      display: inline-block;
      background: rgba(0, 0, 0, 0.3);
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 0 100px 100px rgb(0 0 0 / 30%);
    }

    .launch-button {
      display: inline-block;
      font-weight: 700;
      font-size: 2.5rem;
      cursor: pointer;
      border-radius: 290486px;
      padding: 1.25rem 3rem;
      background-color: #0bc2a6;
      border-color: transparent;
      color: #fff;
    }
  }
`;

export const HomeView: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate('/v/ckb');
  };

  return (
    <HomeWrapper className="landing-grid">
      <LandingTop />
      <div className="launcher">
        <div className="launch-bg-overlay"></div>
        <div className="launch-bg-container">
          <div style={{ backgroundImage: 'url(/static/img/banners/btc.jpg)' }}></div>
        </div>
        <div className="launch-container">
          <div>
            <button className="launch-button" onClick={() => handleLaunch()}>
              Launch
            </button>
          </div>
        </div>
      </div>
      <div className="below-content"></div>
    </HomeWrapper>
  );
};
