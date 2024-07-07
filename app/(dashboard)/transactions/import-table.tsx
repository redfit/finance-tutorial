import TableHeadSelect from "@/app/(dashboard)/transactions/table-head-select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  headers: string[]
  body: string[][]
  selectedColumns: Record<string, string | null>
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void
}

export const ImportTable = ({
  headers,
  body,
  selectedColumns,
  onTableHeadSelectChange,
}: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  key={index}
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}