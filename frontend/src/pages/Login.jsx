import React, { useState } from 'react';
import { replace, useNavigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import axios from '../config/axios';
import Form from '../components/Form';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({ username: "", password: "" });
    const history = useNavigate();

    const toggleForm = () => {
        setIsLogin(prev => !prev);
        setUser({ username: "", password: "" });
    };

    // change handler
    const onchange = (e) => setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));

    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            isLogin ?
                // login
                await axios.post('/user/login', user)
                    .then(res => {
                        console.log(res.data);
                        history('/', replace);
                    })
                :
                // sign-up 
                await axios.post('/user/sign-up', user)
                    .then(res => {
                        console.log(res.data);
                        setIsLogin(true);
                    });

        } catch (error) {
            console.log(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className='h-screen bg-primary-color text-white flex items-center justify-center'>
            <div className='min-w-[90%] md:min-w-[50%] min-h-[50vh] overflow-x-hidden bg-white p-5 rounded bg-opacity-15 flex items-center justify-center'>
                <form onSubmit={submitHandler} className='flex-1'>
                    <AnimatePresence mode='wait' custom={isLogin ? 1 : -1}>
                        {
                            isLogin ?
                                <Form keys={"login"} user={user} onchange={onchange} toggleForm={toggleForm} headerText={'Login'} subHeaderText={"Don't have an account?"} link={"Create a new account"} />
                                :
                                <Form keys={"sign-up"} user={user} onchange={onchange} toggleForm={toggleForm} headerText={"Join us"} subHeaderText={"Already have an account?"} link={"Sign in"} />
                        }
                    </AnimatePresence>
                </form>
            </div>
        </div>
    )
}
