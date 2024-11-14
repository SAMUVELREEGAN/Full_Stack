import React from 'react'
import Image from 'react-bootstrap/Image';

const Card = ({pic}) => {
  return (
    <div>
      <div className="home_card_item">
      <Image src={pic} width={"400px"} fluid/>
      </div>
    </div>
  )
}

export default Card
