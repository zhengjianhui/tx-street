import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { TxStreetContainer } from '../../containers/TxStreetContainer';
import { SidebarView } from './Sidebar';

const LandingWrapper = styled.div`
  position: fixed;
  z-index: 500;
  display: flex;
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  overflow: visible;
  font-size: 1.5rem;

  .landing-grid {
    float: left;
    flex-grow: 1;
    position: relative;
    overflow: auto;
    overflow-x: hidden;
    min-width: 320px !important;
    padding-bottom: 100px;
  }
`;

export const LandingView: React.FC = () => {
  const { showSidebar } = TxStreetContainer.useContainer();

  return (
    <LandingWrapper>
      {showSidebar && <SidebarView />}
      <Outlet />
    </LandingWrapper>
  );
};
