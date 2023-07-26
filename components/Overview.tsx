"use client"

import {Bar,BarChart, ResponsiveContainer,XAxis,YAxis } from "recharts"

interface OverviewProps{
    data: any[]
}
const Overview = ({data}:OverviewProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <XAxis
                dataKey="name"
                stroke="#ff0000" // màu của trục x : jan Jan,Feb,Mar,Apr
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />

            <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`} // cột y
            />
            <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]}/>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview