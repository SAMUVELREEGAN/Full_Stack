import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Assets/logo.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { FaHome } from "react-icons/fa";
import { IoShirtSharp } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const Headers = () => {
  const {getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
}
  return (
    <div>
        {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-light mb-3" style={{borderBottom:"1px solid black",backgroundColor:"rgb(190, 190, 240)"}}>
          <Container fluid>
            <Navbar.Brand href="/" className='nav_logo w-75 d-flex ps-lg-5'>
            <img src={logo} className='nav_img ' alt='Error'/>
            <h3 style={{position:"relative",top:"23px"}}> <span style={{color:"gray"}}>Fashion</span> Cart</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3 mx-3 ">
                  <Nav.Link as={Link} to="/" className='me-2 d-flex nav_name'><span className='me-1'style={{fontSize:"23px",marginTop:"-9px"}}><FaHome /></span><span style={{fontWeight:"700"}}>Home</span></Nav.Link>
                  <Nav.Link as={Link} to="/collection" className='me-2 d-flex nav_name'><span className='me-1' style={{fontSize:"19px",marginTop:"-5px"}}><IoShirtSharp /></span><span style={{fontWeight:"700"}}>Collection</span></Nav.Link>
                  <Nav.Link as={Link} to="/cart" className='me-2 d-flex nav_name'><span className='me-1' style={{fontSize:"20px",marginTop:"-6px"}}><BsCart /></span><span style={{position:"absolute",marginLeft:"8px",fontSize:"10px",marginTop:"4px"}}>{getCartCount()}</span><span style={{fontWeight:"700"}}>Cart</span></Nav.Link>
                  
                  {token ? (
                    <Nav.Link as={Link} to="/orders" className='me-2 d-flex nav_name'><span style={{fontSize:"23px",marginTop:"-9px"}}><TbTruckDelivery /></span><span style={{fontWeight:"700"}}>Orders</span></Nav.Link>
                  ) : (
                    ""
                  )}
                  {token ? (
                    <Nav.Link onClick={logout} className='login m2-3 d-flex nav_name'><span style={{fontWeight:"700"}}>Logout</span> <span style={{fontSize:"23px",marginTop:"-9px"}}><HiOutlineLogout /></span></Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/login" className='login m2-3 d-flex nav_name'><span style={{fontSize:"23px",marginTop:"-9px"}}><FaUserCircle /></span><span style={{fontWeight:"700"}}>Login</span></Nav.Link>
                  )}
                  
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}

export default Headers