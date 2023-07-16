"use client";
import AlertModal from "@/components/modal/alert-modal";
import Heading from "@/components/ui/Heading";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-orgin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z  from "zod";

interface SettingFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingFormValues = z.infer<typeof formSchema>
export const SettingForm = ({initialData}:SettingFormProps) =>{
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data:SettingFormValues)=>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            // cap nhat lai du lieu , 
            router.refresh();

            toast.success("Update success");
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
            await axios.delete(`/api/stores/${params.storeId}`);

            router.refresh();
            // giup quay lai root neu con store nao khac , con ko thi se bat bang tao store
            router.push("/")
            toast.success("Delete success")
        } catch (error) {
            toast.error("Make sure you removed all products and categories first!")
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
                title="Setting"
                description="Manage store"
            />
            <Button
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={()=>{setOpen(true)}}
            >
            <Trash className="h-4 w-4"/>
            </Button>
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
                                    <Input disabled={loading} placeholder="Store name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type = "submit">Save changes</Button>
            </form>
        </Form>
        <Separator/>

        <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        description={`${origin}/api/${params.storeId}`} 
        variant="public"/>
        </>
    )
}

