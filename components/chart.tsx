import { useState } from "react"

import { BarChart3, FileSearch, Loader2 } from "lucide-react"
import { AreaChart, LineChart } from "recharts"

import AreaVariant from "@/components/area-variant"
import BarVariant from "@/components/bar-variant"
import LineVariant from "@/components/line-variant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  data?: {
    date: string
    income: number
    expenses: number
  }[]
}
const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("area")
  const onTypeChange = (type: string) => {
    setChartType(type)
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Select onValueChange={onTypeChange} defaultValue={chartType}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="siza-4 mr-2 shrink-0">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="siza-4 mr-2 shrink-0">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="siza-4 mr-2 shrink-0">
                <BarChart3 className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground text-sm" />
            <p className="text-muted-foreground">No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === "line" && <LineVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
            {chartType === "area" && <AreaVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Chart

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  )
}
