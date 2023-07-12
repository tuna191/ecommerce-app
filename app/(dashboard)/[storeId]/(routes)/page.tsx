import React from 'react'
import prismadb from '@/lib/prismadb'

interface DashboardProps{
  params: {storeId:string}
};

 const Dashboard = async ({params}: DashboardProps) => {
  const store = await prismadb.store.findFirst({
    where:{
      id:params.storeId
    }
  })
  return (
    <div>
      {store?.name}
    </div>
  )
}
export default Dashboard