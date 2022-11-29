import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import SideBar from './SideBar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import { Navigate, Outlet, Route, Router, Routes } from 'react-router-dom';
import Routers from '../../Routes/Routers';

const MasterLayout = () => {
  return (
      <div className='sb-nav-fixed'>
          
          <NavBar />
          
          <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <SideBar/>
              </div>

              <div id="layoutSidenav_content">
                  <main>
                      
                      <Outlet/>  
                      
                  </main>
                  <Footer/>
              </div>
          </div>


    </div>
  );
}

export default MasterLayout;