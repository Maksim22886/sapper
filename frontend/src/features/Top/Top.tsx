import React, { useState, useContext } from 'react';
import backIcon from '../assets/icon/back.svg';
import { NavLink } from 'react-router-dom';


import './style/Top.scss';
import Locale_RU from '../../locale_ru.json'

function Top(): JSX.Element {    
    const valueToRemove = 'нет очков';

    // Получаем все ключи из localStorage
    const keys = Object.keys(localStorage);
    
    // Создаем объект для хранения всех данных
    const data: { [key: string]: any } = {};
    
    // Проходим по каждому ключу и получаем соответствующее значение из localStorage    
    keys.forEach(key => {
      if (localStorage.getItem(key) === valueToRemove) {
        localStorage.removeItem(key);
      }
      localStorage.removeItem('time');
      localStorage.removeItem('time2');
        const item = localStorage.getItem(key);        
        if (item !== null) {
          data[key] = JSON.parse(item);          
        }
      });
    
    // Функция для возврата на пред. стр.
    const buttonBack = (): void => {
      window.history.go(-1);
    }

    // Сортируем объект
    let SortPoint = Object.keys(data).sort((a, b) => data[a] - data[b]);

    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    return (
    <>
    {SortPoint[0] ?
     <>
    <h1 className='block__pageTop'>{Locale_RU.PAGE.TOP}</h1>
    <div className='block__top'>
      <div className='block__UserName'>{Locale_RU.PAGE.USER__NAME}</div>
      <div className='block__point'>{Locale_RU.PAGE.POINT}</div>
  {SortPoint.slice(0, 10).map((key : string, index : number) => (
    <div className='block__piple'>
      <div className='block__name'>
        <div>{index + 1}.</div>
        {index === 0 ? <div>🥇</div> : index === 1 ? <div>🥈</div> : index === 2 ? <div>🥉</div> : null}
        <div>{key}</div>
      </div>
      <div className='block__point'>{formatTime(Number(JSON.stringify(data[key])))}</div>
    </div>
  ))}
    </div>
    </> : 
    <h1 className='block__pageTop'>{Locale_RU.PAGE.ZEROTAB}</h1>}
          <NavLink to='/'>
          <button className='button__game--back'>
            <div className='button__text'>
              <p>Назад</p>
              <img src={backIcon} alt="" />
            </div>
          </button>
          </NavLink>
    </>
  );
}

export default Top;