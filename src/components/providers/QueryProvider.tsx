'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

const QueryProvider = ({ children } : { children : React.ReactNode }) => {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions:{
                queries:{
                    staleTime: 60 * 1000, //1 min
                    refetchOnWindowFocus: false,
                    retry: 1
                }
            }
        })
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default QueryProvider