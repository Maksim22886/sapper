import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';


import './style/GameSettings.css'

import backIcon from '../assets/icon/back.svg'
import epicGame from '../assets/icon/epicGame.svg'


function GameSettings(): JSX.Element {
  const [selected, setSelected] = useState<number | null>(null); // Определение чекбокса
  const [userName, setUserName] = useState(''); // Запись UserName в key, очки для параметра
  



  const handleCheckboxChange = (value: number) => {
    setSelected(value);
  };

    // При монтировании компонента получаем данные из локального хранилища
    useEffect(() => {
      const savedData = localStorage.getItem('key');
      if (savedData) {
        setUserName(savedData);
      }
    }, []);

      // Обработчик для сохранения данных в локальное хранилище
      const handleSaveToLocalStorage = () => {
        localStorage.setItem(`${userName}`, '123');
      };

      const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
      };

      // проверки на пустой input
      const handleSubmit = () => {
        if (userName.trim() === "") {
          alert("Поле не должно быть пустым");
        } else {
          handleSaveToLocalStorage()
        }
      };

  return (
    <div className='block__settings'>
      <div className='block__name'>
          <h1>Укажите имя</h1>
          <input placeholder='User Name' type="text" value={userName} onChange={handleInputChange} />
      </div>
      <div className="block__option--one">
        <h3>Выбор уровня сложности</h3>
        <div className='block__option--two'>
          <label className='block__option--text'>
            <input checked={selected === 1} onChange={() => handleCheckboxChange(1)} type="checkbox" name="easy" value="yes" />Простой 8x8, 10 мин;
          </label>
          <label className='block__option--text'>
            <input checked={selected === 2} onChange={() => handleCheckboxChange(2)} type="checkbox" name="midl" value="yes" />Средний 16x16, 40 мин;
          </label>
          <label className='block__option--text'>
            <input checked={selected === 3} onChange={() => handleCheckboxChange(3)} type="checkbox" name="midl" value="hard" />Сложный 32x16, 100 мин.
          </label>
        </div>
        <div className='block__buttons'>
          {/* предумал такой вот бутерброд так-как после пропуска в игру если мы возвращаемся
           на -1 меня происходит редиректит в главное меню через window.location.replace */}
          {userName ?  <NavLink to='/game'> 
          <button onClick={handleSubmit} className="button__game--start">
              <div className='button__text'>
                <p>Начать игру</p>
                <img src={epicGame} alt="" />
              </div>
            </button>
            </NavLink> 
            : <NavLink to='#'>
            <button onClick={handleSubmit} className="button__game--start">
                <div className='button__text'>
                  <p>Начать игру</p>
                  <img src={epicGame} alt="" />
                </div>
              </button>
              </NavLink>}
          <button className='button__game--back' onClick={() => window.history.go(-1)}>
            <div className='button__text'>
              <p>Назад</p>
              <img src={backIcon} alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSettings;