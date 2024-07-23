import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({
        json,
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Account deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: () => {
      toast.error("Error delete account")
    },
  })

  return mutation
}
