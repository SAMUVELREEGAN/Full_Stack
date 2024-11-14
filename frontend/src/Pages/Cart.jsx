import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { RiDeleteBin6Fill } from "react-icons/ri";
import CartTotal from '../Component/CartTotal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cart = () => {
    const {products, currency, navigate, cartItems, updateQuantity} = useContext(ShopContext)

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
     
    if (products.length > 0) {
        const tempData = [];
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              })
            }
          }
        }
        setCartData(tempData);
      }
    }, [cartItems, products])

    console.log(cartData);
    

  return (
    <div>
        <div>
        <Container>
            <div>
                <h1><span>Your</span> Cart</h1>
            </div>
            <Row>
                <Col md={8}>
                <hr />
                {
                    cartData.map((item,index)=>{
                        const ProductData = products.find((product) =>product._id === item._id)
                        return(
                            <div key={index}>
                                <div style={{display:"flex"}}>  
                                    
                                    <div className='me-md-5 me-3'>
                                        <img src={"http://localhost:8000/files/" +ProductData.image[0]} alt="" width={"100px"}/>
                                    </div>
                                    <div style={{display:"flex" , flexWrap:"wrap",marginLeft:"5px"}} className='mt-lg-4'>
                                    <div className='me-md-5 me-2'>
                                        <p style={{width:"250px"}} className='cat_name'>{ProductData.name}</p>
                                    </div>
                                  <div style={{display:"flex",flexWrap:"wrap"}}>
                                        <div className='me-md-5 me-2'>
                                                <p>{currency} {ProductData.price}</p>
                                            </div>
                                            <div className='me-md-5 me-2'>
                                                <p style={{backgroundColor:"rgb(171, 109, 290)" , padding:"3px 10px",border:"2px solid purple"}}>{item.size}</p>
                                            </div>
                                  </div>
                                    <div className='me-md-5'>
                                        <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} style={{width:"40px"}}/>
                                    </div>
                                    </div>
                                    <div className='mt-lg-3 ms-lg-5' style={{fontSize:"24px",cursor:"pointer"}}>
                                        <p onClick={()=>updateQuantity(item._id ,item.size ,0)} title='Delete'><RiDeleteBin6Fill /></p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            
                        )
                    })
                }
                
                 </Col>
               
               
                <Col md={4}>
                <Row>
                    <Col sm={1} md={1} lg={1}>
                    </Col>
                    <Col sm={11} md={11} lg={11} className='mt-lg-5'>
                    <div className='mt-lg-5'>
                    <CartTotal />
                    <button onClick={()=>navigate('/place-order')} className='mt-2 ms-4 py-2' style={{width:"200px",backgroundColor:"black" ,color:"white"}}>Proceed Payment</button>
                </div>
                    </Col>
                </Row>
                </Col>
            </Row> 
        </Container>
        </div>
    </div>
  )
}

export default Cart