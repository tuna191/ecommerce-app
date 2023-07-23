"use client"
// kieu ghep style theo clsx 
import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams,usePathname } from "next/navigation";

export function MainNav({className,...props}:React.HtmlHTMLAttributes<HTMLElement>){
    // ví dụ : http://localhost:3000/b173cf05-1fbc-424c-b010-f066c2242849
    // params sẽ truy suất và trả về "b173cf05-1fbc-424c-b010-f066c2242849" <-> storeId 
    // pathName sẽ theo tác với url hiện tại và trả về  http://localhost:3000/b173cf05-1fbc-424c-b010-f066c2242849/setting
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Size',
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Color',
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`,
          },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        }
       
    ]
    return(

    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
        {
            routes.map((route) =>(
                <Link 
                key={route.href}
                href={route.href}
                className={cn('text-sm font-medium transition-colors hover:text-primary',
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
                )}
                >
                {route.label}
                </Link> 
            )
               
            )
        }
    </nav>    
)
}