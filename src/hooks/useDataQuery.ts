import { useState, useEffect, useCallback, useRef } from 'react'
import usePagination from './usePagination'

export interface QueryOptions<T> {
  fetchFunction: (params: {
    page: number
    limit: number
    [key: string]: any
  }) => Promise<{
    data: T[]
    meta: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }>
  initialParams?: Record<string, any>
  debounceMs?: number
  autoFetch?: boolean
  paginationUrl?: string
  defaultLimit?: number
  defaultPage?: number
}

export interface QueryResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  updateParams: (newParams: Record<string, any>) => void
  resetParams: () => void
  // Pagination methods
  setPage: (page: number | ((prev: number) => number)) => void
  setLimit: (limit: number | ((prev: number) => number)) => void
  offset: number
}

export const useDataQuery = <T>({
  fetchFunction,
  initialParams = {},
  debounceMs = 500,
  autoFetch = true,
  paginationUrl = '/',
  defaultLimit = 10,
  defaultPage = 1
}: QueryOptions<T>): QueryResult<T> => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [params, setParams] = useState(initialParams)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // Use pagination hook
  const { page, limit, setPage, setLimit, offset } = usePagination(
    paginationUrl, 
    defaultLimit, 
    defaultPage
  )

  // Use ref to avoid dependency issues
  const fetchFunctionRef = useRef(fetchFunction)
  fetchFunctionRef.current = fetchFunction

  const performFetch = useCallback(async (fetchParams: Record<string, any> = {}) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetchFunctionRef.current({
        page,
        limit,
        ...params,
        ...fetchParams
      })
      
      setData(response.data)
      setTotal(response.meta.total)
      setTotalPages(response.meta.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, limit, params])

  const refetch = useCallback(async () => {
    await performFetch()
  }, [performFetch])

  const updateParams = useCallback((newParams: Record<string, any>) => {
    setParams(prev => ({ ...prev, ...newParams }))
    // Reset to first page when params change
    setPage(1)
  }, [setPage])

  const resetParams = useCallback(() => {
    setParams(initialParams)
    setPage(1)
  }, [initialParams, setPage])

  // Debounced effect for params changes
  useEffect(() => {
    if (!autoFetch) return

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      performFetch()
    }, debounceMs)

    setDebounceTimer(timer)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [params, debounceMs, autoFetch, performFetch])

  // Effect for pagination changes
  useEffect(() => {
    if (autoFetch) {
      performFetch()
    }
  }, [page, limit, autoFetch, performFetch])

  // Initial fetch
  useEffect(() => {
    if (autoFetch) {
      performFetch()
    }
  }, []) // Only run once on mount

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages
    },
    isLoading,
    error,
    refetch,
    updateParams,
    resetParams,
    setPage,
    setLimit,
    offset
  }
}

export default useDataQuery
