import React from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
import 'react-toastify/dist/ReactToastify.css';
import { SnackbarProvider } from 'notistack';

const Layout = () => {
  return (
   <>
 <Header/>
 <Outlet/>
 <Footer/>
 <SnackbarProvider/>

   </>
  )
}

export default Layout