import React from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'
export default function  () {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}
