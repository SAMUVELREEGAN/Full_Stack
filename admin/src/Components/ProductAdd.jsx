import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import upload from '../Assets/upload.png'

const ProductAdd = ({token}) => {
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subcategory, setSubCategory] = useState("topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const submithandler = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subcategory",subcategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post("http://localhost:8000/addproduct",formData,{headers:{token}})

        if (response.data.success) {
          toast.success(response.data.message)
          setName('')
          setDescription('')
          setImage1(false)
          setImage2(false)  
          setImage3(false)
          setImage4(false)
          setPrice('')
      } else {
        toast.error(response.data.message)
      }

    }catch(err){
      toast.error(err.message)
    }
  }
  return (
    <div>
      <form onSubmit={submithandler}>
      
      <div style={{display:"flex",flexWrap:"wrap"}}>
      
          <div style={{display:'flex',flexWrap:'wrap',flexDirection:"column"}} className='add_image'>
          <h3>Upload Images</h3>
          <label htmlFor="image1" className='m-2'>
            <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" width={"150px"}/>
            <input type="file" onChange={(e)=>setImage1(e.target.files[0])} id='image1' hidden />
          </label>

          <label htmlFor="image2" className='m-2'>
            <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" width={"150px"}/>
            <input type="file" onChange={(e)=>setImage2(e.target.files[0])} id='image2' hidden />
          </label>

          <label htmlFor="image3" className='m-2'>
            <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" width={"150px"}/>
            <input type="file" onChange={(e)=>setImage3(e.target.files[0])} id='image3' hidden />
          </label>

          <label htmlFor="image4" className='m-2'>
            <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" width={"150px"}/>
            <input type="file" onChange={(e)=>setImage4(e.target.files[0])} id='image4' hidden />
          </label>
        </div>

        <div>
          <h4 style={{textAlign:"center",marginTop:"10px"}}>Product Details</h4>
          <div>
          <div style={{display:"flex",flexWrap:"wrap"}}>
              <div>
                  
                  <select onChange={(e) => setCategory(e.target.value)} style={{width:"220px",margin:"5px 10px",padding:"10px 0px"}}>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kid">Kids</option>
                  </select>
                </div>

              <div>
                  <select onChange={(e) => setSubCategory(e.target.value)} style={{width:"220px",margin:"5px 10px",padding:"10px 0px"}}>
                      <option value="topwear">Topwear</option>
                      <option value="bottomwear">Bottomwear</option>
                      <option value="winterwear">Winterwear</option>
                  </select>
                </div>
          </div>

          <div style={{display:"flex",flexWrap:"wrap"}}>
              <div style={{margin:"10px 10px"}}>
                  <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Product Name' style={{padding:"10px 1px",width:"220px"}}/>
                </div>
                <div style={{margin:"10px 10px"}}>
                  <input type="Number" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='Product Price' style={{padding:"10px 1px",width:"220px"}}/>
                </div>
          </div>

          <div style={{display:"flex"}}>
            <div style={{margin:"10px 10px"}}>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder='Product Description' required style={{width:"460px",height:"60px"}}/>
            </div>
            </div>
            <div>
            
              <div style={{display:"flex"}}>
                <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])}>
                  <p className={`${sizes.includes("S") ? "size_select" : "size_dselect" } px-4 py-2 mx-3 mt-1`}>S</p>
                </div>
                
                <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])}>
                  <p className={`${sizes.includes("M") ? "size_select" : "size_dselect" } px-4 py-2 mx-3 mt-1`}>M</p>
                </div>

                <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])}>
                  <p className={`${sizes.includes("L") ? "size_select" : "size_dselect" } px-4 py-2 mx-3 mt-1`}>L</p>
                </div>

                <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])}>
                  <p className={`${sizes.includes("XL") ? "size_select" : "size_dselect" } px-4 py-2 mx-3 mt-1`}>XL</p>
                </div>

                <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])}>
                  <p className={`${sizes.includes("XXL") ? "size_select" : "size_dselect" } px-4 py-2 mx-3 mt-1`}>XXL</p>
                </div>
              </div>
  
            </div>

            <div>
              <div style={{margin:"10px 10px"}}>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
            <label className='ms-2' htmlFor="bestseller">SPECIAL OFFER </label>
            </div>
            </div>
          
          </div>
          <button type="submit" style={{backgroundColor:"gray",color:"black",width:"470px",margin:"10px 10px",padding:"5px 0px"}}>ADD PRODUCT</button>
        </div>
        
      </div>
      
      </form>

      
    </div>
  )
}

export default ProductAdd