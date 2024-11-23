import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/loginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

import { Toaster } from "react-hot-toast";

import {Loader} from 'lucide-react'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth,onlineUsers}=useAuthStore()
  const {theme}=useThemeStore()

  console.log( onlineUsers)

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div data-theme={theme} >
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ?<HomePage/> : <Navigate to='/login'/> }/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/settings'  element={authUser ?<SettingsPage/> : <Navigate to='/login'/> }/>
        <Route path='/profile'  element={authUser ?<ProfilePage/> : <Navigate to='/login'/> }/>




      </Routes>
      <Toaster />

    </div>
  )
}

export default App