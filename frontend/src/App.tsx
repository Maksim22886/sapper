import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './features/Navbar/Navbar';
import Top from './features/Top/Top';
import GameSettings from './features/GameSettings/GameSettings';
import GameBoard from './features/GameBoard/GameBoard';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route index path="/settings" element={<GameSettings />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/top" element={<Top />} />
        <Route path="/game" element={<GameBoard />} />
      </Routes>
    </div>
  );
}

export default App;
