import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.transactions.$post>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"]

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Transaction created successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: () => {
      toast.error("Error creating transaction")
    },
  })

  return mutation
}
