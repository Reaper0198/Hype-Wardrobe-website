import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/CommonForm'



const initialFormData = {
    status : ''
}

const AdminOrderDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData);

    function handleUpdateStatus(event){
        event.preventDefault();

    }

    return (
        <DialogContent className='sm:max-w-[600px]'>
            <div className='grid gap-6'>
                <div className='grid gap-2'>
                    <div className='flex items-center mt-6 justify-between'>
                        <p className='font-medium'>Order ID</p>
                        <Label>123456</Label>
                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium'>Order Date</p>
                        <Label>12/03/2024</Label>
                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium'>Order Status</p>
                        <Label>Pending</Label>
                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium'>Order Price</p>
                        <Label>$1200</Label>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-semibold'>Order Details</div>
                        <ul>
                            <li className='flex items-center justify-between font-normal'>
                                <span>Product One</span>
                                <span>$122</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-semibold'>Shipping Info</div>
                            <div className='grid gap-0.5 text-muted-foreground'>
                                <span>John Doe</span>
                                <span>Address</span>
                                <span>City</span>
                                <span>Pincode</span>
                                <span>Phone No.</span>
                                <span>Notes</span>
                            </div>
                    </div>
                </div>
                <div>
                    <CommonForm 
                        formControls={[
                            {
                                label : "Order Status",
                                name : 'status',
                                componentType : 'select',
                                options : [
                                    {id : "pending", label : "pending"},
                                    {id : "inProcess", label : "In process"},
                                    {id : "inShipping", label : "In Shipping"},
                                    {id : "rejected", label : "Rejected"},
                                    {id : "delivered", label : "Delivered"},
                                ],
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}/>
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView