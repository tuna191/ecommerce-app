

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req:Request,
  {params}:{params:{billboardId:string}}
){
  try {

      if(!params.billboardId){
          return new NextResponse("Billboard is required",{status:400});
      }

      const billboard = await prismadb.billboard.findUnique({
          where:{
              id: params.billboardId,
          }
          
          
      })

      return NextResponse.json(billboard)
  } catch (error) {
      console.log('[BILLBOARD_GET]',error);
      return new NextResponse("Internal error",{status:500});
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string , billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label ,imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("billboard id is required", { status: 400 });
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
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// mặc dù tham số req ko đc dùng nhưng cx không được bỏ bởi vì tham số params chỉ hoạt động khi là tham số 2
export async function DELETE(
    req:Request,
    {params}:{params:{storeId:string,billboardId:string}}
){
    try {
        const {userId} = auth();

        if (!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }


        if(!params.billboardId){
            return new NextResponse("Billboard is required",{status:400});
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

        const billboard = await prismadb.billboard.deleteMany({
            where:{
                id: params.billboardId,
            },
            
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]',error);
        return new NextResponse("Internal error",{status:500});
    }
}