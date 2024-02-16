import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Navbar from './features/Navbar/Navbar';
import Top from './features/Top/Top';
import GameSettings from './features/GameSettings/GameSettings';
import GameBoard from './features/GameBoard/GameBoard';
import Context from './Context';
 
function App(): JSX.Element {
  // Для передачи Login
  const [loginName, setLoginName] = useState<string>('');
  // Для передачи времени игры
  const [timer, setTimer] = useState<number | null>(null)
  // Передаача размера площадки
  const [sizeBord, setSizeBord] = useState<number>();

  return (
    <Context.Provider value={{ loginName, setLoginName, /*  */ timer, setTimer, /*  */ sizeBord, setSizeBord }}>
    <div className="App">
      <Routes>
        <Route index path="/settings" element={<GameSettings />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/top" element={<Top />} />
        <Route path="/game" element={<GameBoard />} />
      </Routes>
    </div>
    </Context.Provider>
  );
}

export default App;
