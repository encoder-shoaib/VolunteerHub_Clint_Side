import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/shared/Navbar ';
const MainLayout = () => {
  return (
    <div className='bg-gradient-to-r from-[#ddf1e6] to-[#d4dff5]'>
      <Navbar></Navbar>
      <div className=' max-w-11/12 mx-auto px-4'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;