import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';


import './style/GameSettings.scss';

import backIcon from '../assets/icon/back.svg';
import epicGame from '../assets/icon/epicGame.svg';
import Context from '../../Context';


function GameSettings(): JSX.Element {
  const [selected, setSelected] = useState<number | null>(null); // Определение чекбокса
  const [userName, setUserName] = useState(''); // Запись UserName в key, очки для параметра
  const [loginName2, setLoginName2] = useState<string>('')
  const {loginName, setLoginName} = useContext<any>(Context);
  const {timer, setTimer} = useContext<any>(Context);
  const {sizeBord, setSizeBord} = useContext<any>(Context);

  const inputUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginName2(e.target.value)
  }
  

// проверка чекбоксов
  const checkTimer = () => {
    if(selected === 1){
      setTimer(600)
      setSizeBord(8)
    } else if(selected === 2){
      setTimer(2400)
      setSizeBord(16)
    } else if(selected === 3) {
      setTimer(6000)
      setSizeBord(18)
    }
  };


  
  const handleClick = () => {
    // Перезаписываем значение
    setLoginName(userName);
  };
  
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
        localStorage.setItem(`${userName}`, `нет очков`);
      };

      const TrafikTaim = (value: number) => {
        localStorage.setItem(`time`, `${value}`);
      };

      const TrafikBoard = (value: number) => {
        localStorage.setItem(`board`, `${value}`);
      };

      const TrafikBigBoard = (value2:number) => {
        localStorage.setItem(`boardBigY`, `${value2}`);
      };

      const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
      };

      // проверки на пустой input
      const handleSubmit = () => {
        if (userName.trim() === "") {
          alert("Имя не должно быть пустым");
        } else {
          handleSaveToLocalStorage()
        }
      };

      const handleAllFunctions = () => {
        checkTimer();
        handleSubmit(); 
        handleClick();
      };

      const [number, setNumber] = useState('');
      const [number2, setNumber2] = useState('');
      const [castomTime, setCastomTime] = useState('')


      const handleChange23 = (e : ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value);
      }
      const handleChange234 = (e : ChangeEvent<HTMLInputElement>) => {
        setNumber2(e.target.value);
      }
      const handleChange2345 = (e : ChangeEvent<HTMLInputElement>) => {
        setCastomTime(e.target.value);
      }
    
      const handleSave = () => {
        localStorage.setItem(`board`, `${number}`);
      }
      const handleSave2 = () => {
        localStorage.setItem(`boardBigY`, `${number2}`);
      }

      const TrafikTaim2 = () => {
        localStorage.setItem(`time`, `${Number(castomTime) * 60}`);
      };

      const handleAllFunctions2 = () => {
        handleSave();
        handleSave2();
        TrafikTaim2();
      };

      const [modal, setModal] = useState(false);

      const Bbttnn = (): void => {
        setModal((prev) => !prev);
      };

  return (
    <div className='block__settings'>
      <div className='block__titul'>
          <div className='block__title'>Укажите имя</div>
          <input placeholder='User Name' type="text" value={userName} onChange={handleInputChange} />
      </div>
      <div className="block__option--one">
        <div className='block__titleAnd--settings'>
        <div className='block__title--option'>Выбор уровня сложности</div>
        <div className='block__castomBoard'>
        <h3>Кастомная сложность</h3>
        {modal && (<>
                <input type="number" value={number} placeholder='введите колчество клеток по оси x' onChange={(e)=>{handleChange23(e)}} />
                <input type="number" value={number2} placeholder='введите колчество клеток по оси y' onChange={(e)=>{handleChange234(e)}} />
                <input type="number" value={castomTime} placeholder='введите время (мин)' onChange={(e)=>{handleChange2345(e)}} />
                <button onClick={handleAllFunctions2}>Сохранить</button>
                </>
        )}
      <button type="button" onClick={Bbttnn}>
        {modal ? <>Закрыть</> :<>Открыть</>}
      </button>
        </div>
        <div className='block__option--two'>
          <label className='block__option--text'>
            <input checked={selected === 1} onChange={() => {handleCheckboxChange(1);TrafikTaim(600);TrafikBoard(8);TrafikBigBoard(8)}} type="checkbox" name="easy" value="yes" />Простой 8x8, 10 мин;
          </label>
          <label className='block__option--text'>
            <input checked={selected === 2} onChange={() => {handleCheckboxChange(2);TrafikTaim(2400);TrafikBoard(16);TrafikBigBoard(16)}} type="checkbox" name="midl" value="yes" />Средний 16x16, 40 мин;
          </label>
          <label className='block__option--text'>
            <input checked={selected === 3} onChange={() => {handleCheckboxChange(3);TrafikTaim(6000);TrafikTaim(6000);TrafikBoard(32);TrafikBigBoard(16)}} type="checkbox" name="hard" value="yes" />Сложный 32x16, 100 мин.
          </label>
          </div>
        </div>
        <div className='block__buttons'>
          {/* сделал это так-как после пропуска в игру если мы возвращаемся
           на -1 меня происходит редиректит в главное меню через window.location.replace */}
          {userName && (selected || castomTime) ? (
            <NavLink to='/game'>
              <button onClick={handleAllFunctions} className="button__game--start">
                <div className='button__text'>
                  <p>Начать игру</p>
                  <img src={epicGame} alt="" />
                </div>
              </button>
            </NavLink>
          ) : (
            <button onClick={handleAllFunctions} className="button__game--start disabled">
              <div className='button__text'>
                <p>Начать игру</p>
                <img src={epicGame} alt="" />
              </div>
            </button>
          )}
          <NavLink to='/'>
          <button className='button__game--back'>
            <div className='button__text'>
              <p>Назад</p>
              <img src={backIcon} alt="" />
            </div>
          </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default GameSettings;
