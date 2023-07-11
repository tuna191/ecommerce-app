"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'react-hot-toast'
// định nghĩa 1 đối tượng
const formSchema = z.object({
  // định nghĩa name với kiểu chuỗi , tối thiểu 1 ký tự
  name: z.string().min(1)
})

const StoreModal = () => {

    const modalStore = useStoreModal();

    const [loading, setLoading] = useState(false)
    // z.infer là một hàm từ thư viện zod để suy ra kiểu dữ liệu từ lược đồ được định nghĩa trong biến formSchema
    const form = useForm<z.infer< typeof formSchema>>({
      //resolver xác thực dữ liệu theo biến formSchema được định nghĩa ở trên 
      resolver: zodResolver(formSchema),
      // định nghĩa giá trị mặc định
      defaultValues:{
        name: "",
      }
    })

    const onSubmit = async (values:z.infer< typeof formSchema>) =>{
      try {
        setLoading(true);

        const response = await axios.post('/api/stores',values);
        toast.success("store created successfully")
      } catch (error) {
        toast.error("something went wrong!!")
      }finally{
        setLoading(false);
      }
    }
  return (
    <Modal
        title="Create store"
        description='add a new store to manage products and categories'
        isOpen={modalStore.isOpen}
        onClose={modalStore.onClose}
    >
        <div>
          <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render ={({field})=>(
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                        disabled={loading}
                        placeholder='ecommerce' {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <div className='pt-6 space-x-2 flex items-center justify-end'>
                    <Button 
                    disabled={loading}
                    variant={'outline'} onClick={modalStore.onClose}>Cancel</Button>
                    <Button 
                    disabled={loading}
                    type='submit'>Continue</Button>

                </div>
              </form>
            </Form>
          </div>

        </div>
    </Modal>
  )
}

export default StoreModal