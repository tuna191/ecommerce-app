"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {CategoriesColumn, columns} from './columns'
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface CategoryClientProps{
    data: CategoriesColumn[]
}
export const CategoryClient = ({data} :CategoryClientProps) =>{

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
            <Heading
             title={`Categories(${data.length})`}
             description="Manage Categories for your store "
            />
            <Button onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add new
            </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading 
                title= "API"
                description="API calls for categories"
            />
            <Separator/>
            <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}