import { format } from "date-fns"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

import CustomTooltip from "@/components/custom-tooltip"

type Props = {
  data?: {
    date: string
    income: number
    expenses: number
  }[]
}

const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid stroke="3 3" />
        <XAxis
          axisLine={false}
          tickline={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3b82f6" />
        <Bar dataKey="expenses" fill="#f43f5e" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarVariant
