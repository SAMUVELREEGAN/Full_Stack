import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import im1 from '../Assets/3.jpg'
import im2 from '../Assets/4.png'


const Cursole = () => {
  return (
    <div>
         <Carousel>
                <Carousel.Item interval={1000}>
                  <img src={im1} alt="" className='w-100'/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                <img src={im2} alt="" className='w-100'/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                <img src={im1} alt=""className='w-100' />
                </Carousel.Item>
              </Carousel>
       
    </div>
  )
}

export default Cursole