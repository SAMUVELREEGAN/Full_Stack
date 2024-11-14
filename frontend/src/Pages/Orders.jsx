import React, { useContext, useEffect, useState } from 'react'
import Title from '../Component/Title'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const Orders = () => {
    const { currency ,token } = useContext(ShopContext);
    const [orderData,setorderData] = useState([])

    const loadOrderData = async () => {
        try {
          if (!token) {
            return null
          }
    
          const response = await axios.post("http://localhost:8000/userorders",{},{headers:{token}})
          if (response.data.success) {
            let allOrdersItem = []
            response.data.orders.map((order)=>{
              order.items.map((item)=>{
                item['status'] = order.status
                item['payment'] = order.payment
                item['paymentMethod'] = order.paymentMethod
                item['date'] = order.date
                allOrdersItem.push(item)
              })
            })
            setorderData(allOrdersItem.reverse())
          }
          
        } catch (error) {
          
        }
      }
    
      useEffect(()=>{
        loadOrderData()
      },[token])
  return (
    <div className='border-t pt-16'>

            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
                <hr />
            </div>

            <div>
                {orderData.slice(0, 4).map((item, index) => (
                    <div key={index} className='mb-4' >
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                            <div style={{display:"flex"}}>
                            <img  src={"http://localhost:8000/files/" + item.image[0]} alt="" width={"100px"} className='me-4'/>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <p>{item.name}</p>
                                <div >
                                    <p >{currency}{item.price}</p>
                                    <div style={{display:"flex"}}>
                                    <p>Quantity: {item.quantity}</p>
                                    <p className='ms-3'>Size: {item.size}</p>
                                    </div>
                                </div>
                                <p c>Date: <span>{new Date(item.date).toDateString()}</span></p>
                            </div>
                            </div>
                            
                            
                            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <p>🟢{item.status}</p>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <button onClick={loadOrderData}  style={{backgroundColor:"black" ,color:"white",padding:"5px 10px"}}>Track Order</button>
                            </div>

                        </div>
                        <hr />
                    </div>
                ))}
            </div>


        </div>
  )
}

export default Orders