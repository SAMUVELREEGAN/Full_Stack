import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import or from '../Assets/or.png'

const Orders = ({token}) => {
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
    
        try {
    
          const response = await axios.post("http://localhost:8000/list", {},{headers:{token}})
          if (response.data.success) {
            setOrders(response.data.orders.reverse())
          } else {
            toast.error(response.data.message)
          }
    
        } catch (error) {
          toast.error(error.message)
        }
    
    
      }

      const statusHandler = async ( event, orderId ) => {
        try {
          const response = await axios.post("http://localhost:8000/status", {orderId, status:event.target.value})
          if (response.data.success) {
            await fetchAllOrders()
          }
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        fetchAllOrders();
      }, [])
      console.log(orders);
      
  return (
    <div>
      <h3>Order Page</h3>
      <hr />
      <div>
        {
            orders.map((order,index)=>(
                <div style={{borderBottom:"1px solid black",display:"flex",justifyContent:'space-around',alignItems:"center"}}>
                    <div style={{opacity:"0.7",filter:'drop-shadow(2px 2px 5px black)'}} className='zoom-container'><img src={or} alt="" width={"120px"}/></div>
                   
                    <div>
                    {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p key={index}> {item.name} x {item.quantity} <span> {item.size} </span> </p>
                    }
                    else {
                      return <p key={index}> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                    }
                  })}
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div style={{fontSize:"15px",color:"gray"}}>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p style={{fontSize:"15px",color:"gray"}}> <span style={{fontWeight:"700",color:"black"}}>Contact : </span> {order.address.phone}</p>
                  </div>
                <div>
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>₹ {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Out for delivery">Out for delivery</option>
              </select>
            </div>
            ))
        }
      </div>
      
    </div>
  )
}

export default Orders