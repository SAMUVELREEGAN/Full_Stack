import React from 'react'
import Cursole from './Component/Cursole'
import LatestCollection from './Component/LatestCollection'
import Bestseller from './Component/Bestseller'
import ban from './Assets/ban (5).jpg'
import Image from 'react-bootstrap/Image';
import FirstCard from './Component/FirstCard'
import SecondCard from './Component/SecondCard'

const Home = () => {
  return (
    <div>
        <div className='home_cursole'>
        <Cursole />
        
        <LatestCollection />
        <FirstCard />
        <Bestseller />
        <Image src={ban} fluid />;
        <SecondCard />
        <div style={{textAlign:"center"}}>
        <button style={{backgroundColor:"blue",color:"white",borderRadius:"3px"}}>Load More..</button>
        </div>
        </div>
    </div>
  )
}

export default Home