import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { LandingView } from './Landing';
import { GasView } from './Landing/Gas';
import { HappeningView } from './Landing/Happening';
import { HomeView } from './Landing/Home';
import { PlaygroundView } from './Playground';

const MainWrapper = styled.div``;

export const AppView: React.FC = () => {
  return (
    <MainWrapper>
      <Routes>
        <Route path="/d" element={<LandingView />}>
          <Route path="home" element={<HomeView />}></Route>
          <Route path="gas" element={<GasView />}></Route>
          <Route path="happening" element={<HappeningView />}></Route>
          <Route path="*" element={<HomeView />}></Route>
        </Route>
        <Route path="/v/:symbol" element={<PlaygroundView />}></Route>
        <Route path="*" element={<LandingView />}>
          <Route path="*" element={<HomeView />}></Route>
        </Route>
      </Routes>
    </MainWrapper>
  );
};
