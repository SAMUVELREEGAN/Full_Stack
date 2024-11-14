import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Assets/logo.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

const Headers = ({setToken}) => {
  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-light mb-3" style={{borderBottom:"1px solid black"}}>
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
                  <Nav className="justify-content-end flex-grow-1 pe-3 mx-3">
                  <Nav.Link as={Link} to="/" className='me-2'>Home</Nav.Link>
                  <Nav.Link as={Link}  onClick={()=>setToken('')} className='me-2'>Logout</Nav.Link>
                  {/* <Nav.Link as={Link} to="/login" className='me-2'>Login</Nav.Link> */}
                  <div className='navbar_button'>
                      <button> <a href='/'>Product Add</a></button>
                      <button> <a href='/productlist'>Product List</a></button>
                      <button> <a href='/orders'>Order List</a></button>
                      <button> <a href='/user'>User List</a></button>
                  </div>
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