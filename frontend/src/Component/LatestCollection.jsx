import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts , setLatestProduct] = useState([])

    useEffect(()=>{
           const shuffleArray = (item) => {
            return item.sort(() => Math.random() - 0.5);
        }
        
        const shuffledProducts = shuffleArray(products);
        setLatestProduct(shuffledProducts.slice(0, 10));
        
    },[products])
  return (
    <div>
        <div>
            <Title text1={"Latest"} text2={"Collections"}/>

        </div>

        <div className='latest_collection'>
            
            {
                latestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id}  image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection