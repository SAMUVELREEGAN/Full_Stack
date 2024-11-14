import React, { useContext, useState } from 'react'
import { Container, Row , Col} from 'react-bootstrap'
import CartTotal from '../Component/CartTotal'
import Image from 'react-bootstrap/Image';
import rk from '../Assets/pngegg.png'
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate,cartItems,getCartAmount,token,setCartItems,products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
})

const onChangeHandler = (event) => {
  const name = event.target.name
  const value = event.target.value
  setFormData(data => ({ ...data, [name]: value }))
}
const onSubmitHandler = async (event) => {
  event.preventDefault()
  try {

      let orderItems = []

      for (const items in cartItems) {
          for (const item in cartItems[items]) {
              if (cartItems[items][item] > 0) {
                  const itemInfo = structuredClone(products.find(product => product._id === items))
                  if (itemInfo) {
                      itemInfo.size = item
                      itemInfo.quantity = cartItems[items][item]
                      orderItems.push(itemInfo)
                  }
              }
          }
      }

      let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + 50
      }
      
      console.log(orderItems);
      switch (method) {
          case 'cod':
              const response = await axios.post("http://localhost:8000/place" ,orderData,{headers:{token}})
              if (response.data.success) {
                  setCartItems({})
                  navigate('/orders')
              } else {
                  toast.error(response.data.message)
              }
              break;

            default:
              break;
      }


  } catch (error) {
      console.log(error)
      toast.error(error.message)
  }
}


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
    <div>
      <Container className='mt-lg-5' >
        <h3><span>DELIVERY</span> INFORMATION</h3>
        <Row>
          <Col lg={5}>
          <div className='place_order_info'>
            <div className='d-flex flex-wrap'>
              <div><input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name'/></div>
              <div><input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name'/></div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap"}}>
              <div><input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' /></div>
              <div><input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone Number' /></div>
            </div>
            <div style={{display:'flex',flexWrap:"wrap"}}>
              <div><input required onChange={onChangeHandler} name='city' type="text" placeholder='City'/></div>
              <div> <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' /></div>
            </div>
            <div style={{display:'flex',flexWrap:"wrap"}}>
              <div><input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Pin Code'/></div>
              <div><input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State'/></div>
            </div>
            
          </div>
          </Col>

          <Col lg={4} className='my-4'>
          <CartTotal />
          <div className='mt-3'>
          <h5><span>PAYMENT </span>METHOD</h5>
          <div className="d-flex">
          <div onClick={() => setMethod('cod')}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p style={{ border:"1px solid gray" , padding:"5px 20px" ,width:"220px" , margin:"10px 2px"}}>CASH ON DELIVERY</p>
                        </div>
          </div>
          </div>
          <button type='submit' className='mt-2 py-2' style={{width:"200px",backgroundColor:"black" ,color:"white"}}>Place Order</button>
          </Col>
          <Col lg={3}>
          <Image src={rk} fluid/>;
          </Col>
        </Row>
      </Container>
    </div>
    </form>
  )
}

export default PlaceOrder