import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Bestseller = () => {
    const {products} = useContext(ShopContext)
    const [bestseller , setBestseller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestseller(bestProduct.slice(0,5))
    },[products])
    console.log(bestseller);
    
  return (
    <div>
        <Title text1={"New"} text2={"Offer ."}/>
        <div className='latest_collection'>
        {
            bestseller.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
        </div>
    </div>
  )
}

export default Bestseller