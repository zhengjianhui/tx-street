import React from 'react';
import styled from 'styled-components';
import { LandingTop } from '../../components/LandingTop';

const GasWrapper = styled.section``;

export const GasView: React.FC = () => {
  return (
    <GasWrapper className="landing-grid">
      <LandingTop title="⛽ ETH Gas Prices"></LandingTop>
      gas
    </GasWrapper>
  );
};
