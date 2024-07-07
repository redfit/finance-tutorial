import { format } from "date-fns"

import { Separator } from "@/components/ui/separator"

import { formatCurrency } from "@/lib/utils"

const CategoryTooltip = ({ active, payload }) => {
  if (!active) return null

  const name = payload[0].payload.name
  const value = payload[0].value

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 text-muted-foreground">
              <p className="text-sm text-muted-foreground">Income</p>
            </div>
            <p className="text-sm text-right font-medium">
              {formatCurrency(value)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 text-muted-foreground">
              <p className="text-sm text-muted-foreground">Category</p>
            </div>
            <p className="text-sm text-right font-medium">
              {formatCurrency(value * -1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryTooltip
