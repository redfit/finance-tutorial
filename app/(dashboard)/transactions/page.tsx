"use client"

import { useState } from "react"

import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

import { columns } from "@/app/(dashboard)/transactions/columns"
import ImportCard from "@/app/(dashboard)/transactions/import-card"
import UploadButton from "@/app/(dashboard)/transactions/upload-button"
import { transactions as transactionSchema } from "@/db/schema"
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useSelectAccount } from "@/features/transactions/hooks/use-select-account"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  error: [],
  meta: {},
}

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount()
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResult, setImportResult] = useState(INITIAL_IMPORT_RESULT)
  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    setImportResult(results)
    setVariant(VARIANTS.IMPORT)
  }
  const onCancelImport = () => {
    setImportResult(INITIAL_IMPORT_RESULT)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction()
  const createTransactions = useBulkCreateTransactions()
  const deleteTransactions = useBulkDeleteTransactions()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

  const onSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[],
  ) => {
    const accountId = await confirm()

    if (!accountId) {
      return toast.error("Please select an account to continue")
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }))

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      },
    })
  }

  if (transactionsQuery.isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
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
        <AccountDialog />
        <ImportCard
          data={importResult.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
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
              onClick={newTransaction.onOpen}
              size="sm"
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
    </div>
  )
}

export default TransactionsPage
