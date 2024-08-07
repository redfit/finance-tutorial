import { z } from "zod"

import { insertAccountSchema } from "@/db/schema"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"
import { AccountForm } from "@/features/accounts/components/account-form"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const formSchema = insertAccountSchema.pick({ name: true })

// prettier-ignore
type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {
  const mutation = useCreateAccount()
  const { isOpen, onClose } = useNewAccount()
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
          <SheetTitle>New Account Sheet</SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  )
}
