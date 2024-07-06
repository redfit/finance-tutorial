"use client"

import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction"
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useConfirm } from "@/hooks/use-confirm"

type Props = {
  id: string
}

const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this transaction",
  })

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  const deleteMutation = useDeleteTransaction(id)
  const { onOpen } = useOpenTransaction()
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={false}
            onClick={() => {
              onOpen(id)
            }}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={handleDelete}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Actions
