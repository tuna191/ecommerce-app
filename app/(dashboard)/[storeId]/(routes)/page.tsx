import React from 'react'
import prismadb from '@/lib/prismadb'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import { formatter } from '@/lib/utils'
import { getTotalRevenue } from '@/action/getTotalRevenue'
import { getSalesCount } from '@/action/getSalesCount'
import { getStockCount } from '@/action/getStockCount'
import Overview from '@/components/Overview'
import { getGraphRevenue } from '@/action/getGraphRevenue'

interface DashboardProps{
  params: {storeId:string}
};

 const Dashboard = async ({params}: DashboardProps) => {
  // Lấy tổng số tiền đã đc thanh toán
  const totalRevenure = await getTotalRevenue(params.storeId)
  // đếm số lượng hàng bán đc
  const saleCount = await getSalesCount(params.storeId)
  // đếm hàng tồn
  const stockCount = await getStockCount(params.storeId)
  //biểu đồ theo tháng và giá , sẽ chỉ cộng các đơn hàng ở thời điểm hiện tại
  const graphRevenue  = await getGraphRevenue(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store '/>
        <Separator/>
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
              Total revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenure)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
              Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{saleCount}</div>
            </CardContent>
          </Card><Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
              Products in stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
                <Overview data={graphRevenue}/>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Dashboard