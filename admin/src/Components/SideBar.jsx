import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiShieldUserFill } from "react-icons/ri";

const SideBar = () => {
  return (
    <div>
        <div className='sidebar_button'>
            <button className='d-flex'> <div style={{fontSize:"30px"}}><FaCartPlus /></div><a href='/'>Product Add</a></button>
            <button className='d-flex'> <div style={{fontSize:"30px"}}><FaListCheck /></div><a href='/productlist'>Product List</a></button>
            <button className='d-flex'> <div style={{fontSize:"30px"}}><BsFillCartCheckFill /></div><a href='/orders'>Order List</a></button>
            <button className='d-flex'> <div style={{fontSize:"30px"}}><RiShieldUserFill /></div><a href='/user'>User List</a></button>
        </div>
    </div>
  )
}
 
export default SideBar