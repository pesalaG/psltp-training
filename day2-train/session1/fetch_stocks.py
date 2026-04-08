import asyncio
from typing import List
from datetime import datetime
from pydantic import BaseModel, ValidationError
import httpx

class StockPrice(BaseModel):
    symbol: str
    price: float
    timestamp: datetime

async def fetch_stocks(symbols: List[str]) -> List[StockPrice]:
    """Fetch stock data from mock API and validate with Pydantic."""
    url = "https://api.example.com/stocks"
    params = {"symbols": ",".join(symbols)}
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Validate each item in the response list using Pydantic
            return [StockPrice(**item) for item in data]
            
    except (httpx.HTTPStatusError, httpx.RequestError, ValidationError) as e:
        print(f"Error fetching or validating stocks: {e}")
        return []

# Example usage for testing
if __name__ == "__main__":
    symbols = ['JKH.N0000', 'COMB.N0000']
    results = asyncio.run(fetch_stocks(symbols))
    for stock in results:
        print(f"{stock.symbol}: {stock.price} at {stock.timestamp}")