import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext)
  return (
    <div>
         <div className='product_item' style={{backgroundColor:"white"}}>
        <Link to={`/product/${id}`} style={{textDecoration:"none"}}>

    <div className="item_border">
    <div className='item_img'>
    <img src={"http://localhost:8000/files/" +image[0]} alt="" />
    </div>
   <div >
   <div className='item_name'>
        <p>{name}</p>
    </div>
    <div className='item_price'>
        <p><span style={{fontWeight:"500"}}>Price : </span>{currency} {price}</p>
    </div>
   </div>
    </div>
    
        </Link>
    </div>
    </div>
  )
}

export default ProductItem