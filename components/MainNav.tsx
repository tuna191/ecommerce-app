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