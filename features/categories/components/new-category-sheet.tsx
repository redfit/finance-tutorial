import { z } from "zod"

import { insertCategorySchema } from "@/db/schema"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import CategoryForm from "@/features/categories/components/category-form"
import { useNewCategory } from "@/features/categories/hooks/use-new-category"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const formSchema = insertCategorySchema.pick({ name: true })
type FormValues = z.input<typeof formSchema>

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()
  const mutation = useCreateCategory()
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Category Sheet</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transaction
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPaused}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  )
}

export default NewCategorySheet
