import CommonForm from '@/components/common/CommonForm'
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {


    const initialState = {
        email : '',
        password : ''
    }

    const [formData, setFormData] = useState( initialState);
    const dispatch = useDispatch();

    const onSubmit = (e) =>{
        e.preventDefault();
        if(formData.email === '' || formData.password === ''){
            toast.success("Invalid details", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        dispatch(loginUser(formData)).then((data) =>{
            if(data?.payload?.success){
                toast.success(data.payload.message, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else{
                toast.error(data?.payload?.message, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        })
    }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className=' lg:hidden flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold tracking-tight text-foreground text-center'>HypeWardrobe</h1>
            <h3 className='text-center font-light'>Your one stop for all trendy outfits</h3>
        </div>
        <div className="text-center">
            <h1 className='text-3xl font-semibold tracking-tight text-foreground'>Sign in to your Account</h1>
        </div>
        <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
        <p className='mt-2'>Don't have an account? 
            <Link className='font-medium text-primary ml-2 hover:underline hover' to='/auth/register'>Click Here</Link> </p>
    </div>
  )
}

export default Login