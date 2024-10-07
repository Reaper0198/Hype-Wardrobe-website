import CommonForm from '@/components/common/CommonForm'
import { loginFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {


    const initialState = {
        email : '',
        password : ''
    }

    const [formData, setFormData] = useState( initialState)

    const onSubmit = () =>{
        console.log("hello");
    }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className="text-center">
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your Account</h1>
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