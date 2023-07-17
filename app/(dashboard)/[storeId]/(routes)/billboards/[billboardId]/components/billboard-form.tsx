"use client";
import AlertModal from "@/components/modal/alert-modal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUploadPage from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z  from "zod";


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})
type BillboardFromValues = z.infer<typeof formSchema>

interface BillboardFromProps{
    initialData: Billboard | null;
}

export const BillboardFrom = ({initialData}:BillboardFromProps) =>{
    const params = useParams()
    const router = useRouter()

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit a Billboard" : "Create a Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const action = initialData ? "Save change" : "Create";
    

    const form = useForm<BillboardFromValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })


    const onSubmit = async (data:BillboardFromValues)=>{
        try {
            setLoading(true);
            // nếu mà có dữ liệu ban đầu r thì dùng lệnh patch để cập nhật 1 phần
            // còn ko thì dùng post khi ko có dữ liệu ban đầu 
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);

            }else{
                await axios.post(`/api/${params.storeId}/billboards`, data);

            }
            // cap nhat lai du lieu , 
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

            router.refresh();
            // giup quay lai root neu con store nao khac , con ko thi se bat bang tao store
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard Delete ")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first!")
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
            <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUploadPage
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}

                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard lable" {...field} />
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

