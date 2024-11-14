import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './MyLayout/Layout';
import ProductAdd from './Components/ProductAdd';
import ProductList from './Components/ProductList';
import Orders from './Components/Orders';
import User from './Components/User';
import Login from './Components/Login';
import { useEffect, useState } from 'react';

function App() {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])


   return (
    <div className="App">
      <ToastContainer />
      {
        token === "" ? <Login setToken ={setToken}/>:
        <Routes>
        <Route path='/' element={<Layout setToken ={setToken} />}>
        <Route path='/' element={<ProductAdd token={token}/>}></Route>
        <Route path='/productlist' element={<ProductList token={token}/>}></Route>
        <Route path='/orders' element={<Orders token={token}/>}></Route>
        <Route path='/user' element={<User token={token}/>}></Route>
        </Route>
      </Routes>
      }
    </div>
  );
}

export default App;
