"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import qs from "query-string"

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useGetSummary } from "@/features/summary/api/use-get-summary"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AccountFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const accountId = params.get("accountId") || "all"
  const from = params.get("from") || ""
  const to = params.get("to") || ""

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    }

    if (newValue === "all") {
      query.accountId = ""
    }

    const url = qs.stringify(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 fort-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">all</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AccountFilter
