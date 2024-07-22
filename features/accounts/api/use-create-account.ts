import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.accounts.$post>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log("mutationFn", json)
      const response = await client.api.accounts.$post({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Account created successfully.")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: () => {
      toast.error("Error creating account")
    },
  })

  return mutation
}
