import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        json,
        param: { id },
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Account updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["account", { id }] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: () => {
      toast.error("Error edit account")
    },
  })

  return mutation
}
