import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import Image from 'react-bootstrap/Image';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../Component/RelatedProduct';
import { toast } from 'react-toastify';

const Product = () => {
    const {productId} = useParams()
    const {products, currency,addToCart,token ,navigate} = useContext(ShopContext)
    const [productData, setProductData] = useState(false);
    const [size, setSize] = useState("")
    const [image, setImage] = useState("")
    const fetchProductData =async()=>{
        products.map((item)=>{
            if(item._id === productId){
                setProductData(item)
                setImage("http://localhost:8000/files/" +item.image[0])
            }
            return null
        })
    }
    

    useEffect(() => {
        fetchProductData()
      }, [productId,products])
    
  return (
    <div>
        <div style={{display:"flex", flexWrap:"wrap"}}>

            <div style={{display:"flex",flexDirection:"column" , width:"100px",margin:"10px",height:"150px"}} className='product_maping_image'>
                { productData && productData.image.map((item,index)=>(<img key={index} onClick={()=>setImage("http://localhost:8000/files/" +item)} src={"http://localhost:8000/files/" +item} style={{margin:"10px",width:"100%" ,height:"100%"}} alt='error'/>))}
            </div>

            <div className='product_image'>
                <div style={{margin:"19px" ,width:"100%" }}>
                    <Image src={image} fluid/>
                </div>
            </div>
            

            <div className='ms-3'>
                    <div className='mt-3' >
                        <h3>{productData.name}</h3>
                    </div>

                    <div style={{color:"orangered" , fontSize:"25px"}}>
                    <FaStar className='pe-1'/>
                    <FaStar className='pe-1'/>
                    <FaStar className='pe-1'/>
                    <FaStarHalfAlt className='pe-1'/> <span style={{color:"black",fontSize:"15px"}}>(4.5k)</span>
                    </div>

                    <div style={{marginTop:"20px",fontWeight:"700",fontSize:"30px"}}>
                        {currency}{productData.price}
                    </div>

                    <div className='mt-4'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, harum!</p> {productData.description}
                    </div>

                    <div style={{marginTop:"45px"}}>
                        <h6>Select Size</h6>
                        <div>
                            {
                                productData && productData.sizes.map((item,index)=>(<button key={index} onClick={()=>setSize(item)} className={`size_not_click py-2 px-4 bg-gray-100 ${item === size ? "size_click" : ""}`}>{item}</button>))
                            }
                        </div>
                    </div>
                    <div>
                        {
                            token && token ?<button onClick={()=>addToCart(productData._id,size)} style={{marginTop:"40px" , padding:"10px" , backgroundColor:"black",color:"white"}}>ADD TO CART</button> : <button style={{marginTop:"40px" , padding:"10px" , backgroundColor:"black",color:"white"}} onClick={()=>navigate('/login')}>Go Login</button>
                        }
                    </div>
                    <div>
                        <h6 style={{color:"gray",marginTop:"30px"}}> 100% Original product. <br /><br />Cash on delivery is available on this product. <br /> <br />Easy return and exchange policy within 7 days.</h6>
                    </div>

                    <button onClick={()=> toast.success("Toast Working")}>Clickme</button>
            </div>
        </div>
      <div>
      <RelatedProduct category={productData.category} />
      </div>
    </div>
  ) 
}

export default Product