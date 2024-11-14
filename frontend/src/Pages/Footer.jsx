import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <div style={{backgroundColor:"black",color:"white",marginTop:"5px"}}>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",paddingTop:"40px"}}>
        <div><div>
          <h3 className='pe-5'>Fashion Cart</h3>  
        </div></div>
        <div className='pe-5'><div>
          <p>WEEBLY THEMES</p>
          <p>PRE-SALE-FAQS</p>
          <p>SUMBIT A TICKET</p>
          </div></div>
        <div><div>
          <p>SERVICES</p>
          <p>THEME TWEAK</p>
          </div></div>
        <div><div>
          <p>SHOWCASE</p>
          <p>WIDGETKIT</p>
          <p>SUPPORT</p>
          </div></div>
        <div><div>
          <p>ABOUT US</p>
          <p>CONTACT US</p>
          <p>AFFILIATES</p>
          <p>RESOURCES</p>
          </div></div>
      </div>
        <hr />
        <div style={{textAlign:"center"}}>
          <div style={{margin:"10px"}} className='footer_icons'>
          <FaFacebookF style={{margin:"0px 5px",cursor:"pointer"}}/>
          <FaTwitter style={{margin:"0px 5px",cursor:"pointer"}}/>
          <FaInstagram style={{margin:"0px 5px",cursor:"pointer"}}/>
          <FaGoogle style={{margin:"0px 5px",cursor:"pointer"}}/>
          </div>
          <div>@Copyright.All rights reserved</div>
        </div>
    </div>
  )
}

export default Footer