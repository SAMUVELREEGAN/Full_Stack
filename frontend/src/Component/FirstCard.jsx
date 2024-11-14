import React from 'react'
import {card_1} from '../Data/Card'
import Card from '../Component/Card'
import { Container } from 'react-bootstrap'

const FirstCard = () => {
  return (
    <div>
      <Container>
       <div className="home_card">
       {
          card_1.map((e,index)=>(
            <Card pic={e.pic} key={index}/>
          ))  
        }
       </div>
       </Container>
    </div>
  )
}

export default FirstCard