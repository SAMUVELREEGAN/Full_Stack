import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from '../Component/ProductItem'
import Image from 'react-bootstrap/Image';
import ban from '../Assets/ban (1).jpg'
import Title from './Title';
import { FaSearch } from "react-icons/fa";


const Collection = () => {
  const {products,search,showSearch,setSearch} = useContext(ShopContext)
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState('')


  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(a => a !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(a => a !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }


  const applyFilter = () =>{
    let productsCopy = products.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }
    setFilterProducts(productsCopy)
    
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div >

       <div style={{marginTop:"-35px" , boxShadow:"0px 0px 3px black"}}>
       <Image src={ban} fluid />;
       </div>

    <div style={{display:"flex" , marginTop:"2%"}}>


          {/* Category Filter */}
      <div style={{display:"flex" , flexDirection:"column",paddingLeft:"2%" }} className='collection_media'>

          <div style={{marginTop:"90px"}} >
            <h6>Filters</h6>
            <h3>CATEGORIES</h3>
          <p><input type="checkbox" onChange={toggleCategory} value={"men"}/>Men</p>
            <p><input type="checkbox" onChange={toggleCategory} value={"women"}/>Women</p>
            <p><input type="checkbox" onChange={toggleCategory} value={"kid"}/>Kids</p>
          </div>
  
         {/* SubCategory Filter */}

          <div>
            <h3>Types</h3>
                <p><input value={"topwear"} onChange={toggleSubCategory} type="checkbox" /> Topwear </p>
                <p><input value={"bottomwear"} onChange={toggleSubCategory} type="checkbox" /> Bottomwear </p>
                <p><input value={"winterwear"} onChange={toggleSubCategory} type="checkbox" /> Winterwear </p>
          </div>

          <div>
            <h3>Price</h3>
                <p><input value="low-high"  onChange={(e) => setSortType(e.target.value)} type="checkbox" /> Low-High </p>
                <p><input value="high-low"  onChange={(e) => setSortType(e.target.value)} type="checkbox" /> High-Low </p>
          </div>

          

      </div>
      {/* line */}
      <div style={{width:"10px",backgroundColor:"gray", marginLeft:"5%",marginTop:"-30px"}} className='collection_line'></div>

        <div>
            <Title text1={"All"} text2={"Collection"}/>
           <div style={{textAlign:"center"}}>
           <input type="text" placeholder='Search Products' style={{width:"60%"}} onChange={(e)=>setSearch(e.target.value)} value={search}/><button style={{backgroundColor:"black",color:"white"}} ><FaSearch /> </button>
           </div>
            <div className='collection_data'>
            {
                  filterProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                  ))
                }
            </div>
        </div>
    </div>

    </div>
  )
}

export default Collection