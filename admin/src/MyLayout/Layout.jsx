import React from 'react'
import Headers from '../Components/Headers'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import SideBar from '../Components/SideBar'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = ({setToken}) => {
  return (
    <div>
      <Headers setToken={setToken}/>
      
      <Container>
        <Row>
          <Col lg={3} className='d-flex'>
           <div className='d-flex'> 
              <SideBar />
              <div style={{width:"5px",backgroundColor:"wheat",height:"100vh" ,marginLeft:"40px"}} className='collection_line'></div>
          </div>
          </Col>
         
          <Col lg={9}>
         <Outlet />
         </Col>
        </Row>
      </Container>
  
      <Footer />
      </div>
  )
}

export default Layout