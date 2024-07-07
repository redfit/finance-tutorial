import { format } from "date-fns"
import { Car } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

type Props = {
  data?: {
    date: string
    income: number
    expenses: number
  }[]
}

const AreaVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer>
      <AreaChart>
        <CartesianGrid stroke="3 3" />
        <defs>
          <linearGradient
            id="income"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          ></linearGradient>
          <stop stopColor="#3d82f6" offset="2%" stopOpacity={0.8} />
          <stop stopColor="#3d82f6" offset="98%" stopOpacity={0} />
          <linearGradient
            id="expenses"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          ></linearGradient>
          <stop stopColor="#f43f5e" offset="2%" stopOpacity={0.8} />
          <stop stopColor="#f43f5e" offset="98%" stopOpacity={0} />
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#imcome)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="expenses"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#imcome)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaVariant
