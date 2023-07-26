

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


// mặc dù tham số req ko đc dùng nhưng cx không được bỏ bởi vì tham số params chỉ hoạt động khi là tham số 2
export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string,orderId:string}}
){
   
   
    try {
        const {userId} = auth();

        if (!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }


        if(!params.orderId){
            return new NextResponse("Order is required",{status:400});
        }

        const storeByUserId = await prismadb.store.findFirst({
          where:{
              id:params.storeId,
              userId
          }
      })
      // khi người dùng đăng nhập rồi nhưng ko có quyền để sửa , update..
      if(!storeByUserId){
          return new NextResponse("Unauthorized",{status:403})
      }

        const order = await prismadb.order.delete({
            where:{
                id: params.orderId,
            },
            
        })

        return NextResponse.json(order)
    } catch (error) {
        console.log('[ORDER_DELETE]',error);
        return new NextResponse("Internal error",{status:500});
    }
}