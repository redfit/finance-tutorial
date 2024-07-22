import { useQuery } from "@tanstack/react-query"

import app from "@/app/api/[[...route]]/accounts"

import { client } from "@/lib/hono"

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api
    },
  })
}
