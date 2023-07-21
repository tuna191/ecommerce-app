import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
export async function POST(
    req: Request,
    {params}:{params: {storeId: string}}
    ){
    
    try{
        const {userId} = auth();
        const body = await req.json();

        const {name ,value} = body;

        // khi người dùng chưa đăng nhập
        if(!userId){
            return new NextResponse("Unauthenticated",{status: 401})
        }
        if(!name){
            return new NextResponse("name is required",{status:400})
        }

        if(!value){
            return new NextResponse("value is required",{status:400})
        }

        if(!params.storeId){
            return new NextResponse("storeId is required",{status:400})
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
        const color = await prismadb.color.create({
            data:{
                name,
                value,
                storeId: params.storeId,
            }
        })
        return NextResponse.json(color);
    } catch(error){
        console.log("[COLOR_POST]",error);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function GET(
    req: Request,
    {params}:{params: {storeId: string}}
    ){
    
    try{
        if(!params.storeId){
            return new NextResponse("storeId is required",{status:400})
        }
       
        const color = await prismadb.color.findMany({
            where:{
                storeId: params.storeId,

            }
        })
        return NextResponse.json(color);
    } catch(error){
        console.log("[COLOR_GET]",error);
        return new NextResponse("Internal error",{status:500});
    }
}