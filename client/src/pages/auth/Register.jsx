import CommonForm from '@/components/common/CommonForm'
import { registerFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {


    const initialState = {
        userName : '',
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