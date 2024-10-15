import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import CommonForm from '@/components/common/CommonForm';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react'


const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : '',
    salePrice : '',
    totalStock : '',
}
const AdminProducts = () => {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);


    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);

    function onSubmit(){
    }
    console.log('formData', formData)
    
    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add new Product</Button>
            </div>
            <div className='grid gap-4 md:grid-col-3 lg:grid-col-4'>

            </div>
            <Sheet open={openCreateProductDialog} 
                onOpenChange={() => setOpenCreateProductDialog(false)}>
                <SheetContent side = 'right' className='overflow-auto'>
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        file={imageFile} 
                        setFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}/>
                    <div className='py-6'>
                        <CommonForm 
                            onSubmit={onSubmit}
                            formData={formData} 
                            setFormData={setFormData} 
                            buttonText={"Add"}
                            formControls={addProductFormElements}>

                        </CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts