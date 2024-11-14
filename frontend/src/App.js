import { Route, Routes } from 'react-router-dom';
import './App.css';
import MyLayout from './layout/MyLayout';
import Login from './Pages/Login';
import Home from './Home';
import Collection from './Component/Collection';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartTotal from './Component/CartTotal';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
      <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<MyLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product/:productId' element={<Product />}></Route>
        <Route path='/collection' element={<Collection />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/cart-total' element={<CartTotal />}></Route>
        <Route path='/place-order' element={<PlaceOrder />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
