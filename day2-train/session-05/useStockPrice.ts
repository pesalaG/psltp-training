import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
 
interface StockData {
  symbol: string;
  price: number;
  timestamp: string;
}
 
/**
 * Custom hook to fetch stock price from API.
 * Fetches from /api/v1/stocks/{symbol} with 5s refetch interval.
 *
 * @param symbol - Stock symbol to fetch (e.g., 'JKH.N0000')
 * @returns Object with data, isLoading, error
 */
export function useStockPrice(symbol: string) {
  // TODO: Use useQuery with:
  // - queryKey: ['stock', symbol]
  // - fetch from /api/v1/stocks/{symbol}
  // - refetchInterval: 5000 (5 seconds)
  // - enabled: true if symbol is provided
  const fetchStockPrice = async (): Promise<StockData> => {
    const { data } = await axios.get<StockData>(
      `/api/v1/stocks/${symbol}`
    );
    return data;
  };

  const {
    data,
    isLoading,
    error
  } = useQuery<StockData, Error>({
    queryKey: ['stock', symbol],
    queryFn: fetchStockPrice,
    refetchInterval: 5000,
    enabled: Boolean(symbol) // disables when empty/null
  });

  return { data, isLoading, error };
}
