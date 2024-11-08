import CommonForm from '@/components/common/CommonForm'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    userName: '',
    email: '',
    password: ''
}
const Register = () => {

    const [formData, setFormData] = useState(initialState)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if(formData.email === '' || formData.password === '' || formData.userName === ''){
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
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
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
                navigate('/auth/login');
            } else {
                toast.error(data.payload.message, {
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
        });
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className=' lg:hidden flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold tracking-tight text-foreground text-center'>HypeWardrobe</h1>
                <h3 className='text-center font-light'>Your one stop for all trendy outfits</h3>
            </div>
            <div className="text-center">
                <h1 className='text-3xl font-semibold tracking-tight text-foreground'>Create a New Account</h1>
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