import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { CloudUpload, File, X } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const ProductImageUpload = ({file, setFile, uploadedImageUrl, setUploadedImageUrl,
    imageLoadingState, setImageLoadingState
}) => {

    const inputRef = useRef();

    function handleImageFileChange(event){
        const selectedFile = event.target.files?.[0];
        if(selectedFile){
            setFile(selectedFile);
        }
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile){
            setFile(droppedFile);
        }
    }

    function handleRemoveFile(){
        setFile(null);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', file);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
        if(response.data?.success){
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
    }
    

    useEffect(()=>{
        if(file !== null){
            uploadImageToCloudinary();
        }
    },[file])


  return (
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-base font-medim mb-2 block'>Upload product image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop}
             className='border-2 border-dashed rounded-md'>
            <Input id='image-upload' type='file' 
                className="hidden" 
                ref={inputRef}
                onChange={handleImageFileChange}/>
            {
                !file ?
                <Label htmlFor='image-upload' 
                    className='flex flex-col items-center justify-center h-32 cursor-pointer '>
                    <CloudUpload className='w-10 h-10 text-muted-foreground mb-2'/>
                    <span>Drag & drop or Click to upload</span>
                </Label> : <div className='flex items-center justify-between'>
                                <div className='flec items-center'>
                                <File  className='w-5 text-primary mr-2 h-5'/>
                                </div>
                                <p className='text-sm font-medium'>{file.name}</p>
                                <Button variant='ghost' size='icon' 
                                    className='text-muted-foreground hover:text-foreground'
                                    onClick={handleRemoveFile}
                                ><X className='w-4 h-4'/></Button>
                                <span className='sr-only'>Remove file</span>
                            </div>
            }
        </div>
    </div>
  )
}

export default ProductImageUpload