import React from 'react'
import {card_2} from '../Data/Card'
import Card from '../Component/Card'

const SecondCard = () => {
  return (
    <div>
    <div className="home_card">
    {
       card_2.map((e,index)=>(
         <Card pic={e.pic} key={index}/>
       ))  
     }
    </div>
 </div>
  )
}

export default SecondCard