import React, { useEffect, useState } from 'react';

// import './style/GameSettings.css'

import backIcon from '../assets/icon/back.svg'
import epicGame from '../assets/icon/epicGame.svg'



function GameBoard(): JSX.Element {
    const [data, setData] = useState('');
    // При монтировании компонента получаем данные из локального хранилища
    useEffect(() => {
      const savedData = localStorage.getItem('key');
      if (savedData) {
        setData(savedData);
      }
    }, []);
    
    // Обработчик для сохранения данных в локальное хранилище
    const handleSaveToLocalStorage = () => {
      localStorage.setItem(`${data}`, '123');
    };

  return (
        <div>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={handleSaveToLocalStorage}>Save to localStorage</button>
      </div>
    );
}

export default GameBoard;