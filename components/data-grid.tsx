"use client"

import { useSearchParams } from "next/navigation"

import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"

import { useGetSummary } from "@/features/summary/api/use-get-summary"

import DataCard from "@/components/data-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { fromatDateRange } from "@/lib/utils"

const DataGrid = () => {
  const { data, isLoading } = useGetSummary()
  const params = useSearchParams()
  const to = params.get("to") || undefined
  const from = params.get("from") || undefined

  const dateRangeLabel = fromatDateRange({ from, to })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard
          title="Remaining"
          value={data?.remainingAmount}
          percentageCnange={data?.remainingChange}
          icon={FaPiggyBank}
          variant="default"
          dateRange={dateRangeLabel}
        />
        <DataCard
          title="Income"
          value={data?.incomeAmount}
          percentageCnange={data?.incomeChange}
          icon={FaArrowTrendUp}
          variant="default"
          dateRange={dateRangeLabel}
        />
        <DataCard
          title="Expenses"
          value={data?.expensesAmount}
          percentageCnange={data?.expencesChange}
          icon={FaArrowTrendDown}
          variant="default"
          dateRange={dateRangeLabel}
        />
      </div>
    </>
  )
}

export default DataGrid

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shirnk-0 h-10 w-24 mb-2" />
        <Skeleton className="shirnk-0 h-4 w-40" />
      </CardContent>
    </Card>
  )
}
