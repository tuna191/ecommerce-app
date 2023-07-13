"use client"
import {Store} from "@prisma/client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
// thu vien icon
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { useStoreModal } from "@/hooks/use-store-modal";
import {Popover, PopoverContent, PopoverTrigger} from './ui/popover'
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Command,
     CommandEmpty,
     CommandGroup,
     CommandInput,
     CommandItem,
     CommandList, 
     CommandSeparator
    } from "./ui/command";


// Định nghĩa kiểu dữ liệu PopoverTriggerProps để sử dụng trong việc định nghĩa các thuộc tính của thành phần PopoverTrigger trong React.

// Định nghĩa kiểu dữ liệu StoreSwitcherProps là một giao diện (interface) để định rõ các thuộc tính và kiểu dữ liệu cho thành phần StoreSwitcher.

// Sử dụng kiểu dữ liệu StoreSwitcherProps trong hàm StoreSwitcher để xác định các tham số truyền vào và kiểu dữ liệu của chúng. Điều này giúp tăng tính chính xác và đảm bảo rằng các thuộc tính được sử dụng đúng kiểu dữ liệu.

// Tổng quan, mục đích là đảm bảo tính chính xác và kiểm soát kiểu dữ liệu của các thuộc tính trong thành phần StoreSwitcher, từ đó giúp viết mã chính xác hơn, dễ đọc và dễ bảo trì.
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
// extends là kế thừa
interface StoreSwitcherProps extends PopoverTriggerProps{
     items: Store[];
    //items: Record<string, any>[];
}

export default function StoreSwitcher({
    className,
    items = []
}:StoreSwitcherProps){
    const storeModal = useStoreModal();
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) =>({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find((item) => item.value === params.storeId)
    const [open,setOpen] = useState(false);

    const onStoreSelect = (store:{value:string, label: string})=>{
        setOpen(false);
        router.push(`/${store.value}`)
    }
    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between",className)}
                >
                    

                    <StoreIcon className="mr-2 h-4 w-4 "/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) =>(
                                <CommandItem
                                    key={store.value}
                                    onSelect={()=> onStoreSelect(store)}
                                >
                                 <StoreIcon className="mr-2 h-4 w-4"/>
                                 {store.label}
                                  <Check
                                    className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? "opacity-100" : "opacity-0" )}
                                  />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                            onSelect={()=>{
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}