import React, { useEffect, useState, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../../Context';

import './style/GameBoard.scss'

import backIcon from '../assets/icon/back.svg'
import epicGame from '../assets/icon/epicGame.svg'
import LiderIcon from '../assets/icon/lider.svg'


// чтобы добрать до el будем использовать формулу y * size + x

const Mine = -1;
const Masker1 = 1;
const Masker2 = 2;
const Masker3 = 3;
const Masker4 = 4;
const Masker5 = 5;
const Masker6 = 6;
const Masker7 = 7;
const Masker8 = 8;
const Masker0 = 0;

function createField(size: number, size2: number): number[] {
  const field: number[] = size2 > 16 ? new Array(size * Math.ceil(size2 / 2)).fill(0) : new Array(size * size2).fill(0);
      
  function inc(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size2) {
      if (field[y * size + x] === Mine) return;
      field[y * size + x] += 1;
      }
    }
      
    for (let i = 0; i < size;) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size2);
    if (field[y * size + x] === Mine) continue;
      field[y * size + x] = Mine;
      i += 1;
      inc(x + 1, y);
      inc(x - 1, y);
      inc(x, y + 1);
      inc(x, y - 1);
      inc(x + 1, y - 1);
      inc(x - 1, y - 1);
      inc(x + 1, y + 1);
      inc(x - 1, y + 1);
  }
  return field;
  }

enum Mask {
  Transparent,
  Fill,
  Flag,
  Question,
}

const mapMaskToVview : Record<Mask, React.ReactNode> = {
  [Mask.Transparent]: null,
  [Mask.Fill]: '🐙',
  [Mask.Flag]: '🚩',
  [Mask.Question]: '❓',
}

function GameBoard(): JSX.Element {
  // Изначально думал через Context делать, но потом начал делать через LocalStorerg
  const {loginName, setLoginName} = useContext<any>(Context);
  const {timer, setTimer} = useContext<any>(Context);
  const {sizeBord, setSizeBord} = useContext<any>(Context);
  const [data, setData] = useState('');

      
    // При монтировании компонента получаем данные из локального хранилища
    useEffect(() => {
      const savedData = localStorage.getItem('key');
      if (savedData) {
        setData(savedData);
      }
    }, []);
    
    //игра
    const [seconds, setSeconds] = useState<number>((localStorage.time));
    const [seconds2, setSeconds2] = useState<number>(localStorage.time);
    const [board, setBoard] = useState<number>(localStorage.board);
    const [boardBigY, setBoardBigY] = useState<number>(localStorage.boardBigY);

    const size: number = Number(board);
    const size3: number = Number(boardBigY);

    
    
    // размер игры
    const dimension = new Array(size).fill(null);

    const [field, setField] = useState<number[]>(()=>createField(size,size3));

    const [mask, setMask] = useState<Mask[]>(()=> new Array(size * size3).fill(Mask.Fill));
    const [death, setDeath] = useState(false)
    const [color, setColor] = useState<string>('#988f8f');

    // Проверка массива на кол эллемента, остаавлю консоль
    console.log(field);

          const win = useMemo(() => {
            const allMinesFlagged = field.every(
              (cell, index) => {          
                if(cell === Mine) {
                  return mask[index] === Mask.Flag;
                }
                return true;
              }
            );
            return allMinesFlagged;
          }, [field, mask, loginName]);

            function getKeyByValue(value:any) {
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const storedValue = localStorage.getItem(String(key));
                if (storedValue === value) {
                  return key;
                }
              }
              return null;
            }
            
            useEffect(()=>{
              setLoginName(getKeyByValue('нет очков'))  
            }, [loginName])
                                    
                  
      
        const reloadPage = () => {
          window.location.reload();
        };

        const valueToRemove = 'нет очков';

        // Получаем все ключи из localStorage
        const keys = Object.keys(localStorage);
        
        // Создаем объект для хранения всех данных
        const datas: { [key: string]: any } = {};
        
        // Проходим по каждому ключу и получаем соответствующее значение из localStorage  
        const deleteUser = () =>{
        keys.forEach(key => {
          if (localStorage.getItem(key) === valueToRemove) {
            localStorage.removeItem(key);
          }
          localStorage.removeItem('time');
          localStorage.removeItem('time2');
          localStorage.removeItem('board');
          localStorage.removeItem('boardBigX');
          localStorage.removeItem('boardBigY');
            const item = localStorage.getItem(key);        
            if (item !== null) {
              datas[key] = JSON.parse(item);          
            }
          });}

          const deleteUser2 = () =>{
            keys.forEach(key => {
              if (localStorage.getItem(key) === valueToRemove) {
                localStorage.removeItem(key);
              }
              localStorage.removeItem('time');
              localStorage.removeItem('time2');
              localStorage.removeItem('board');
              localStorage.removeItem('boardBigX');
              localStorage.removeItem('boardBigY');
                const item = localStorage.getItem(key);        
                if (item !== null) {
                  datas[key] = JSON.parse(item);          
                }
              })
          }
          window.addEventListener('popstate', deleteUser);
          const [vremy, setVremy] = useState(0)
          
                  
                  useEffect(() => {
                    const interval = setInterval(() => {
                    setSeconds(prevSeconds => {
                      if (prevSeconds < 0 || win === true) {
                        clearInterval(interval);
                        localStorage.setItem(`${loginName}`, `${seconds2 - prevSeconds}`);
                        setVremy(seconds2 - prevSeconds)              
                        return seconds2 - prevSeconds;
                      } else {
                        return prevSeconds - 1;
                      }
                  });}, 1000)          
                    
                    return () => clearInterval(interval);
          
                    }, [win, timer]);
                                              
                
                  const formatTime = (time: number): string => {
                    const minutes = Math.floor(time / 60);
                    const seconds = time % 60;
                    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                  }; 
          
      return (
        <div>
        {death ?
        <div>
            <h1>Игра закончена</h1>
        </div>
         : <></>}
        <p>Ваш логин: {loginName}</p>
        <div>
        {death === true ?  <button onClick={reloadPage} className="button__game--start">
              <div className='button__text'>
                <p>Начать заново</p>
                <img src={epicGame} alt="" />
              </div>
            </button>: <></>}
        {win ? <>
        <NavLink to='/settings'>
          <button className='button__game--back' onClick={() => {deleteUser();deleteUser2()}}>
            <div className='button__text'>
              <p>Вернуться к настройкам</p>
              <img src={backIcon} alt="" />
            </div>
          </button>
        </NavLink>
          <NavLink to='/top'>
            <button className='button__game--back' onClick={() => {deleteUser();deleteUser2()}}>
                    <div className='button__text'>
                    <p>Таблица лидеров</p>
                <img src={LiderIcon} alt="" />
              </div>
            </button>
          </NavLink></> : <></>}
          <div className='block__attributes'>
        <h1 className='block__flag'>⛳#{(field.filter(num => num === -1).length) - (mask.filter(num => num === 2).length)}</h1>
        {death !== true ? <h1>⌚ {formatTime(seconds)}</h1> : <></>}
        </div>
        {win ? <h1>Вы победили за {(formatTime(vremy))}</h1> : <></>}
        <div className='block__gameBoard'>
          {dimension.map((_, y) => {
            return (
              <div key={y} style={{display: 'flex'}}> 
                {dimension.map((_, x) => {
                  return <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '10vw',
                    height: '6.2vw',
                    margin: '2px',
                    backgroundColor: death ? '#FAA' : win ? 'blue' : '#988f8f',
                }}
                  onClick={()=>{
                    if(mask[y * size + x] === Mask.Transparent) return;

                    const clearing : [number, number][] = []

                    function clear(x:number, y:number) {
                      if (x >= 0 && x < size && y >= 0 && y < size) {
                        if (mask[y * size + x] === Mask.Transparent) return;
                        clearing.push([x, y])
                      }
                    }

                    clear(x, y);

                    while(clearing.length) {
                      const [x, y] = clearing.pop()!!;

                      mask[y * size + x] = Mask.Transparent;

                      if (field[y * size + x]!==0) continue;

                      clear(x + 1, y);
                      clear(x - 1, y);
                      clear(x, y + 1);
                      clear(x, y - 1);
                    }
                    // условие при котором поле открывается, если под ячейкой мина
                    if (field[y * size + x] === Mine) {
                      mask.forEach((_, i) => mask[i] = Mask.Transparent);
                      setDeath(true);
                    }
                    
                    setMask((prev)=>[...prev]);
                  }}

                  onContextMenu={(e)=> {
                    e.preventDefault();
                    e.stopPropagation();

                  if(mask[y * size + x] === Mask.Transparent) return;                  
                    if (mask[y * size + x] === Mask.Fill
                       && mask.filter(num => num === 2).length < field.filter(num => num === -1).length
                      ){
                      mask[y * size + x] = Mask.Flag;
                    } else if (mask[y * size + x] === Mask.Flag){
                      mask[y * size + x] = Mask.Question;
                    } else if (mask[y * size + x] === Mask.Question){
                      mask[y * size + x] = Mask.Fill;
                    }

                    setMask((prev)=>[...prev])
                  }}

                  key={x}>{
                    mask[y * size + x] !== Mask.Transparent 
                    ? mapMaskToVview[mask[y * size + x]]
                    : field[y * size + x] === Mine ? '💣'
                    : field[y * size + x] === Masker1 ? <div style={{color: 'Blue'}}>1</div>
                    : field[y * size + x] === Masker2 ? <div style={{color: 'green'}}>2</div>
                    : field[y * size + x] === Masker3 ? <div style={{color: 'red'}}>3</div>
                    : field[y * size + x] === Masker4 ? <div style={{color: '#00008b'}}>4</div>
                    : field[y * size + x] === Masker5 ? <div style={{color: 'brown'}}>5</div>
                    : field[y * size + x] === Masker6 ? <div style={{color: 'turquoise'}}>6</div>
                    : field[y * size + x] === Masker7 ? <div style={{color: 'black'}}>7</div>
                    : field[y * size + x] === Masker8 ? <div style={{color: 'white'}}>8</div>
                    : field[y * size + x] === Masker0 ? <div></div>
                    : field[y * size + x]}
              </div>;
                })}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
}

export default GameBoard;
