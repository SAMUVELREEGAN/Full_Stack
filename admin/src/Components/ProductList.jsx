import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { RiDeleteBin5Fill } from "react-icons/ri";


const ProductList = ({token}) => {
    const [list,setlist] = useState([])

    const fetchList = async()=>{
      try{
        const response = await axios.get("http://localhost:8000/listproduct")
        if(response.data.success){
          setlist(response.data.products.reverse())
        }else{
          toast.error(response.data.message)
        }
      }catch(err){
        toast.error(err.message)
      }
    }
    
    const Remove = async(id)=>{
      try{
        const response = await axios.post("http://localhost:8000/removeproduct",{id},{headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
          await fetchList()
        }else{
          toast.error(response.data.message)
        }
      }catch(er){
        toast.error(er.message)
      }
    }

    useEffect(()=>{
      fetchList()
    },[])
   
  return (
    <div>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>SubCategory</th>
          <th>Delete</th>
        </tr>
        
        {
        list.map((item,index)=>(
          <tr key={index}>
          <td> <img src={"http://localhost:8000/files/" + item.image[0]} alt="error" width={"100px"}/></td>
          <td>{item.name}</td>
          <td>{item.price}</td> 
          <td>{item.category}</td>
          <td>{item.subcategory}</td>
          <td style={{fontSize:"30px",color:"red",cursor:"pointer"}} onClick={()=>Remove(item._id)}><RiDeleteBin5Fill /></td>
          </tr>
        ))
      }
    
      </table>
    </div>
    
  )
}

export default ProductList