import CommonForm from '@/components/common/CommonForm';
import AddressCard from '@/components/shopping-view/AddressCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addressFormControls } from '@/config';
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddress } from '@/store/shop-slice/address-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const initialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}


const Address = ({setCurSelectedAddress}) => {

    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress)
    const [curEditAddressId, setCurEditAddressId] = useState();

    function handleManageAddress(event){
        event.preventDefault();

        if(addressList.length >= 3 && curEditAddressId === null){
            toast.info("You can add max 3 addresses", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setFormData(initialAddressFormData);
            return;
        }

        curEditAddressId !== null ? dispatch(editaAddress({
            userId : user?.id,
            addressId : curEditAddressId,
            formData
        })).then((data)=> {
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setCurEditAddressId(null);
                setFormData(initialAddressFormData)
            }
        }) : 
            dispatch(addNewAddress({
            ...formData,
            userId : user?.id
        })).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setFormData(initialAddressFormData)
            }
        })
        
    }

    function isFormValid(){
        return Object.values(formData).every((value) => value.trim() !== '');
    }

    useEffect(()=> {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])

    function handleDeleteAddress(curAddressId){
        dispatch(deleteAddress({
            userId : user?.id,
            addressId : curAddressId
        })).then((data)=>{
            if(data.payload.success){
                dispatch(fetchAllAddress(user?.id))
            }
        })
    }

    function handleEditAddress(curAddress){
        setCurEditAddressId(curAddress?._id)
        setFormData({
            ...formData,
            address : curAddress?.address,
            city : curAddress?.city,
            phone : curAddress?.phone,
            pincode : curAddress?.pincode,
            notes : curAddress?.notes
        })
    }

  return (
    <Card>
        <div>
            {
                addressList && addressList.length > 0 ? 
                    <h3 className='m-4 font-semibold text-3xl'>Saved Address :</h3> : null
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                    addressList && addressList.length > 0 ? 
                    addressList.map(singleAddress =>    
                        <AddressCard key={singleAddress?._id}
                            addressInfo={singleAddress}
                            handleDeleteAddress={handleDeleteAddress}
                            handleEditAddress={handleEditAddress}
                            setCurSelectedAddress={setCurSelectedAddress}/>
                    ) : null
                }
            </div>
        </div>
        <CardHeader>
            <CardTitle>{
                curEditAddressId !== null ? "Edit Saved Address" : "Add new Address"
                }
            </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <CommonForm 
                formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={curEditAddressId !== null ? "Save Changes" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()} />
        </CardContent>
    </Card>
  )
}

export default Address