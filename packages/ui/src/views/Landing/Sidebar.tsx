import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  background: #fff;
  height: 100%;
  max-height: 100%;
  width: 250px;
  min-width: 250px !important;
  max-width: 250px !important;
  float: left;
  text-align: center;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  .dash-logo {
    padding: 10px 35px;
  }

  .dash-buttons {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0.5rem;

    .button-container {
      position: relative;
      width: 100%;

      .button {
        margin-right: 0;
        width: 100%;
        justify-content: left;
        display: inline-flex;
        padding: 0.75rem;
        :hover {
          background-color: #f2f2f2;
        }
      }
      .is-active {
        color: #0bc2a6 !important;
        background-color: #f2f2f2;
      }
    }
  }
`;

export const SidebarView: React.FC = () => {
  const location = useLocation();

  const activeIndex = useMemo(() => {
    if (location.pathname === '/d/gas') return 1;
    if (location.pathname === '/d/happening') return 2;
    return 0;
  }, [location]);

  return (
    <SidebarWrapper>
      <img src="/static/img/icons/logo.svg" className="dash-logo" alt="logo" />
      <div className="dash-buttons">
        <div className="button-container">
          <Link className={`button ${activeIndex === 0 ? 'is-active' : null}`} to="/">
            🚌 Visualizer
          </Link>
        </div>
        <div className="button-container">
          <Link className={`button ${activeIndex === 1 ? 'is-active' : null}`} to="/d/gas">
            ⛽ ETH Gas Prices
          </Link>
        </div>
        <div className="button-container">
          <Link className={`button ${activeIndex === 2 ? 'is-active' : null}`} to="/d/happening">
            👀 Happening
          </Link>
        </div>
      </div>
    </SidebarWrapper>
  );
};
