import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';

const CartTotal = () => {
    const { currency, getCartAmount } = useContext(ShopContext);
  return (
    <div>
        <div>
        <h4><span>Cart</span> Total</h4>
        </div>
        <div className='ms-4 mt-3'>
        <div className='d-flex'>
            <p style={{width:"200px"}}>Total Amount </p> <span>{currency}{getCartAmount()}.00</span>
        </div>
        <div className='d-flex'>
            <p style={{width:"200px"}}>Delivery Amount</p> <span>{currency}50.00</span>
        </div>
        <div className='d-flex'>
            <p style={{width:"200px",fontWeight:"700"}}>Total Amount</p><span>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + 50 }.00</span>
        </div>
        </div>
    </div>
  )
}

export default CartTotal