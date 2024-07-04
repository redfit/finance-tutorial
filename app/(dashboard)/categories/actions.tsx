"use client"

import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"

import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { useConfirm } from "@/hooks/use-confirm"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  id: string
}

const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this category",
  })

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  const deleteMutation = useDeleteCategory(id)
  const { onOpen } = useOpenCategory()
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
