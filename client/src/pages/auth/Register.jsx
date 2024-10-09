import CommonForm from '@/components/common/CommonForm'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    userName : '',
    email : '',
    password : ''
}
const Register = () => {

    const [formData, setFormData] = useState( initialState)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(registerUser(formData)).then((data)=>{
            if(data?.payload?.success){
                toast.success(data.payload.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/auth/login');
            }else{
                toast.error(data.payload.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        });
    }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className="text-center">
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create a New Account</h1>
        </div>
        <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
        <p className='mt-2'>Already have an account? 
            <Link className='font-medium text-primary ml-2 hover:underline hover' to='/auth/login'>Click Here</Link> </p>
    </div>
  )
}

export default Register