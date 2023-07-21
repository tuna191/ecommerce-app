

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req:Request,
  {params}:{params:{colorId:string}}
){
  try {

      if(!params.colorId){
          return new NextResponse("color is required",{status:400});
      }

      const color = await prismadb.color.findUnique({
          where:{
              id: params.colorId,
          },
          
      })

      return NextResponse.json(color)
  } catch (error) {
      console.log('[COLOR_GET]',error);
      return new NextResponse("Internal error",{status:500});
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string , colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name ,value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("color id is required", { status: 400 });
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
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// mặc dù tham số req ko đc dùng nhưng cx không được bỏ bởi vì tham số params chỉ hoạt động khi là tham số 2
export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string,colorId:string}}
){
    try {
        const {userId} = auth();

        if (!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }


        if(!params.colorId){
            return new NextResponse("colorId is required",{status:400});
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

        const color = await prismadb.color.deleteMany({
            where:{
                id: params.colorId,
            },
            
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[SIZE_DELETE]',error);
        return new NextResponse("Internal error",{status:500});
    }
}