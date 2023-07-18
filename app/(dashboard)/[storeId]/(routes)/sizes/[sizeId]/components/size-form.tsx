"use client";
import AlertModal from "@/components/modal/alert-modal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUploadPage from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z  from "zod";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})
type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps{
    initialData: Size | null;
}

export const SizeForm = ({initialData}:SizeFormProps) =>{
    const params = useParams()
    const router = useRouter()

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit a size" : "Create a size";
    const description = initialData ? "Edit a size" : "Add a new size";
    const toastMessage = initialData ? "size updated." : "size created.";
    const action = initialData ? "Save change" : "Create";
    

    const form = useForm<SizeFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })


    const onSubmit = async (data:SizeFormValues)=>{
        try {
            setLoading(true);
            // nếu mà có dữ liệu ban đầu r thì dùng lệnh patch để cập nhật 1 phần
            // còn ko thì dùng post khi ko có dữ liệu ban đầu 
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);

            }else{
                await axios.post(`/api/${params.storeId}/sizes`, data);

            }
            // cap nhat lai du lieu , 
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success(toastMessage);
        } catch (error) {
            console.log(error);
            
            toast.error("Something went wrong!!");
        }finally {
            setLoading(false);
        }
    }

    const onDelete = async ()=>{
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

            router.refresh();
            // giup quay lai root neu con store nao khac , con ko thi se bat bang tao store
            router.push(`/${params.storeId}/sizes`)
            toast.success("size Delete ")
        } catch (error) {
            toast.error("Make sure you removed all product using this size first!")
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    
    return(
        <>
        <AlertModal 
            isOpen={open}
            onClose={()=> setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <div className="flex items-center justify-between">
            <Heading
                title={title}
                description={description}
            />
            {initialData && (
                <Button
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={()=>{setOpen(true)}}
            >
            <Trash className="h-4 w-4"/>
            </Button>
            )}
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mb-2">
            
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size value" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type = "submit">{action}</Button>
            </form>
        </Form>

        </>
    )
}

