import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from "react-router-dom";
// import {products} from '../Data/AllProduct'
import {toast} from 'react-toastify'
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const [search,setSearch] = useState('')
  const[showSearch,setShowSearch] = useState(true)
  const [cartItems,setCartItems] = useState({})
  const navigate = useNavigate()
  const [products,setProducts] = useState([])
  const [token,setToken] = useState('')

  const addToCart = async(itemId,size)=>{
    if(!size){
        
        toast.error("Select Product Size")
        return;
    }
   
    let cartData = structuredClone(cartItems)

    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] +=1
        }else{
            cartData[itemId][size] = 1
        }
    }
    else{
        cartData[itemId] ={}
        cartData[itemId][size] =1
        toast.success("Added Cart")
    }
    setCartItems(cartData)
    if(token){
        try{
            await axios.post("http://localhost:8000/add",{ itemId, size }, { headers: { token } })
        }catch(er){
            toast.error(er.message)
        }
    }

}

const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {

            }
        }
    }
    return totalCount;
}

const getUserCart = async(token)=>{
    try{
        const response = await axios.post("http://localhost:8000/get",{},{headers:{token}})
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
    }catch(er){
        toast.error(er.message)
    }
}

const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
        try {

            await axios.post("http://localhost:8000/update", { itemId, size, quantity }, { headers: { token } })

        } catch (error) {
            toast.error(error.message)
        }
    }

}

const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
        let itemInfo = products.find((product) => product._id === items);
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            } catch (error) {
            }
        }
    }
    return totalAmount;
}

const getProductData = async()=>{
    try{
        const response =await axios.get("http://localhost:8000/listproduct")
        if(response.data.success){
                setProducts(response.data.products.reverse())
        }
    }catch(err){
        toast.error(err.message)
    }
}


useEffect(()=>{
    getProductData()
},[])


useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
    if (token) {
        getUserCart(token)
    }
},[token])

  const value = {
    products, currency, delivery_fee,search,setSearch,showSearch,
    setShowSearch,cartItems,navigate,addToCart,updateQuantity,getCartAmount,token,setToken,getCartCount,setCartItems
};
  return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
  )
}

export default ShopContextProvider