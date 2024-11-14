import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({  category }) => {
  const [related, setRelated] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    if (products.length > 0) {
      const productsCopy = products.filter(item =>item.category === category);

      setRelated(productsCopy.slice()); 
    }
  }, [products, category]); 

  return (
    <div>
      <Title text1={"Related"} text2={"Collections"} />
      <div className='collection_data'>
        {related.map(item => (
          <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
