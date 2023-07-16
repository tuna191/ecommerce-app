"use client"

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps{
    disabled?: boolean;
    onChange: (value:string) => void;
    onRemove: (value:string) => void;
    // string[] là một mảng kiểu chuỗi
    value: string[];
}
const ImageUploadPage = ({disabled , onChange,onRemove,value}:ImageUploadProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

   

    const onUpload = (result:any)=>{
        onChange(result.info.secure_url);
    }

    if(!mounted) {
        return null;
    }
  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {value.map((url)=>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={()=>onRemove(url)} variant="destructive" size="icon">

                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>
                    <Image
                        fill
                        className="object-cover"
                        alt="Image"
                        src={url}
                    />
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="mkdwtjbw">
                {({open})=>{
                    const onClick = () =>{
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={disabled}
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an Image
                        </Button>
                    )
                }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUploadPage