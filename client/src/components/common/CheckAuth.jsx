import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    
    const location = useLocation();
    
    // console.log('user', user)
    // console.log('isAuthenticated', isAuthenticated)

    if(!isAuthenticated && !user && (location.pathname.includes("/login") || 
    location.pathname.includes("/register"))){
        return <>{children} </>
    }

    
    if (!isAuthenticated && !(location.pathname.includes("/login") ||
    location.pathname.includes("/register"))) {
        return <Navigate to="/auth/login" />;
    } 
    
    if (isAuthenticated === false && user === null) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        <Navigate to='/auth/login'/>
        </div>
        ) // Show a loading spinner or message
    }
    if (isAuthenticated && (location.pathname.includes("/login") ||
        location.pathname.includes('/register'))) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        }  else if (location.pathname === "/auth/login" || location.pathname === "/auth/register") {
            return <Navigate to='/shop/home' />
        }
    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />
    }

    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />
    }

    return (
        <>{children}</>
    )
}

export default CheckAuth