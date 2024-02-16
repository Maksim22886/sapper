import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './style/Navbar.scss';

function Navbar(): JSX.Element {

  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <>
      <div className='block__app'>
        <NavLink to='/settings'><button className='button button__game'>Играть</button></NavLink>
        <NavLink to='/top'><button className='button button__game'>Таблица Лидеров</button></NavLink>
      </div>
      <Outlet />
    </>
    </div>
  );
}

export default Navbar;