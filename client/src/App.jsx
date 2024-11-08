import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/register'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminOrders from './pages/admin-view/AdminOrders'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-found/NotFound'
import ShoppingHome from './pages/shopping-view/ShoppingHome'
import ShoppingListing from './pages/shopping-view/ShoppingListing'
import ShoppingCheckout from './pages/shopping-view/ShoppingCheckout'
import ShoppingAccount from './pages/shopping-view/ShoppingAccount'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauth-page/UnauthPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import ShoppingSearch from './pages/shopping-view/ShoppingSearch'


const App = () => {

    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])


    
    return (
        <div className='flex flex-col overflow-hidden bg-white'>

            <Routes>

                <Route path='/auth' element={
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AuthLayout />
                    </CheckAuth>}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>

                <Route path='/admin' element={
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AdminLayout />
                    </CheckAuth>}>
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='orders' element={<AdminOrders />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='features' element={<AdminFeatures />} />
                </Route>

                <Route path='/shop' element={
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <ShoppingLayout />
                    </CheckAuth>}>
                    <Route path='home' element={<ShoppingHome />} />
                    <Route path='listing' element={<ShoppingListing />} />
                    <Route path='checkout' element={<ShoppingCheckout />} />
                    <Route path='account' element={<ShoppingAccount />} />
                    <Route path='search' element={<ShoppingSearch />} />
                </Route>

                <Route path='/unauth-page' element={<UnauthPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </div>
    )
}

export default App