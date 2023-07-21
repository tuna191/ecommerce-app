"use client"

import { Button } from "@/components/ui/button";
import { ColorColumns } from "./columns"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modal/alert-modal";

interface CellActionProps{
    data : ColorColumns;
}

const CellAction = ({data}:CellActionProps) => {

  const router = useRouter()
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id:string)=>{
    navigator.clipboard.writeText(id);
    toast.success("Color copied to clipboard")
}

const onDelete = async ()=>{
  try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);

      router.refresh();
      // giup quay lai root neu con store nao khac , con ko thi se bat bang tao store
      router.push("")
      toast.success("Color Delete ")
  } catch (error) {
      toast.error("Make sure you removed all product using this color first!")
  }finally{
      setLoading(false);
      setOpen(false);
  }
}
  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={()=>setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            action
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={()=> onCopy(data.id)}>
            <Copy className=" mr-2 h-4 w-4"/>
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
            <Edit className=" mr-2 h-4 w-4"/>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className=" mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction