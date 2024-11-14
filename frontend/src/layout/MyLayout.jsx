import React from 'react'
import Headers from '../Component/Headers'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'

const MyLayout = () => {
  return (
    <div>
        <div style={{marginTop:"-25px"}}>
        <Headers />
        </div>
        <Outlet />
        <Footer />

    </div>
  )
}

export default MyLayout