import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div>
        <div className='title_head'>
            <h1><span style={{color:"gray"}}>{text1}</span> {text2}</h1> 
        </div>
        <div>
          <p style={{textAlign:"center"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, accusantium.</p>
        </div>
    </div>
  )
}

export default Title