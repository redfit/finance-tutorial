"use client"

import { useState } from "react"

import { Loader2, Plus } from "lucide-react"

import { columns } from "@/app/(dashboard)/transactions/columns"
import ImportCard from "@/app/(dashboard)/transactions/import-card"
import { UploadButton } from "@/app/(dashboard)/transactions/upload-button"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  error: [],
  meta: {},
}

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT)
  }
  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction()
  const deleteTransactions = useBulkDeleteTransactions()
  const transactionQuery = useGetTransactions()
  const transactions = transactionQuery.data || []

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard onCancel={onCancelImport} onSubmit={onUpload} />
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              size="sm"
              onClick={newTransaction.onOpen}
              className="w-full lg:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteTransactions.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
      <div></div>
    </div>
  )
}

export default TransactionsPage
