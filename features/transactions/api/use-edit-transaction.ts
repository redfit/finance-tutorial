import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$patch"]({
        json,
        param: { id },
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Transaction updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: () => {
      toast.error("Error edit transaction")
    },
  })

  return mutation
}
