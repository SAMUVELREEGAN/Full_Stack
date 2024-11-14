import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState("login");
    const { token, setToken, navigate } = useContext(ShopContext);

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'signup') {
                const response = await axios.post('http://localhost:8000/register', { name, email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    setName('')
                    setEmail('')
                    setPassword('')
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post('http://localhost:8000/login', { email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    setEmail('')
                    setPassword('')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className='login_container'>
            <form onSubmit={handler}>
                <div className="login_bg">
                    <div>
                        <h2 className='text-center m-4'>{currentState.charAt(0).toUpperCase() + currentState.slice(1)}</h2>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='m-2'>
                            <button type="button" className='login_parent_btn'onClick={() => setCurrentState('login')}>Login</button>
                            <button type="button" className='login_parent_btn' onClick={() => setCurrentState('signup')}>Sign Up </button>
                        </div>

                        {currentState === 'signup' && (
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='User Name'/>
                        )}

                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' />
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password'/>
                        <div className='login_info'>
                            {currentState === 'login' && <p className='cursor-pointer'>Forgot Password?</p>}
                        </div>
                    </div>

                    <div>
                        <button className='login_bottom_btn' type="submit">
                            {currentState === "login" ? "Login" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
