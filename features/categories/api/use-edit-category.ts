import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$patch"]({
        json,
        param: { id },
      })
      return await response.json()
    },
    onSuccess: () => {
      toast.success("Category updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: () => {
      toast.error("Error edit category")
    },
  })

  return mutation
}
