import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurSelectedAddress}) => {
  return (
    <Card className='m-2' onClick={()=>setCurSelectedAddress(addressInfo)}>
        <CardContent className=' p-2 grid gap-3'>
            <Label className='font-semibold text-base '>Address: <span className='font-medium'>{addressInfo?.address}</span> </Label>
            <Label className='font-semibold text-base '>City: <span className='font-medium'>{addressInfo?.city}</span> </Label>
            <Label className='font-semibold text-base '>Pincode: <span className='font-medium'>{addressInfo?.pincode}</span> </Label>
            <Label className='font-semibold text-base '>Phone: <span className='font-medium'>{addressInfo?.phone}</span> </Label>
            <Label className='font-semibold text-base '>Notes: <span className='font-medium'>{addressInfo?.notes}</span> </Label>
        </CardContent>
        <CardFooter className='flex justify-between mb-2 px-2 py-0'>
            <Button onClick={()=> handleEditAddress(addressInfo)}  className='font-medium text-base  rounded-lg'>Edit</Button>
            <Button onClick={()=> handleDeleteAddress(addressInfo?._id)} className='font-medium text-base  rounded-lg'>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard