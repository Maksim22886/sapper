import React, { useState, useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import GameSettings from '../GameSettings/GameSettings';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../AppContext';



function Top(): JSX.Element {

    interface AppContextType {
        localStorageValue: string;
        setLocalStorageValue: (value: string) => void;
    }
    
    // Получаем все ключи из localStorage

    const keys = Object.keys(localStorage);

    // Создаем объект для хранения всех данных
    const data: { [key: string]: any } = {};

    // Проходим по каждому ключу и получаем соответствующее значение из localStorage
    keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item !== null) {
          data[key] = JSON.parse(item);
        }
      });
        let keys2 = Object.keys(data)
    
  return (
    <>
  {keys2.map((key:string) => (
    <>
    <h1>{key}</h1>
    <p>{JSON.stringify(data[key])}</p>
    </>
  ))}
    </>
  );
}

export default Top;