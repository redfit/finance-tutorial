import { VariantProps, cva } from "class-variance-authority"
import { IconType } from "react-icons"

import { CountUp } from "@/components/count-up"
import { DataTable } from "@/components/data-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn, formatCurrency, formatPercentage } from "@/lib/utils"

const boxValiant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
    defaultVariants: {
      variant: "default",
    },
  },
})

const iconValiant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
    defaultVariants: {
      variant: "default",
    },
  },
})

type BoxVariants = VariantProps<typeof boxValiant>
type IconVariants = VariantProps<typeof iconValiant>

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType
  title: string
  value?: number
  dateRange: string
  percentageChange?: number
}

const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  variant,
  dateRange,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxValiant({ variant }))}>
          <Icon className={cn(iconValiant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p>
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period
        </p>
      </CardContent>
    </Card>
  )
}

export default DataCard
