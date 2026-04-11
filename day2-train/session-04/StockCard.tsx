import React from 'react';
 
interface StockCardProps {
  symbol: string;
  price: number;
  change: number; // percentage 
}
 
/**
 * Display a stock price card with symbol, price, and change percentage.
 * Change should be green if positive, red if negative.
 */

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const StockCard: React.FC<StockCardProps> = ({ symbol, price, change }) => {
  // TODO: Render card with:
  // - Symbol (bold, large)
  // - Price formatted as currency
  // - Change % in appropriate color (green for +, red for -)
  // - "Buy" button with click handler
const isPositive = change >= 0;
  const changeColor = isPositive ? 'green' : 'red';
  
  const handleBuyClick = () => {
    alert(`Added ${symbol} to your order!`);
  };

  return (
    <section 
      style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', maxWidth: '250px' }}
      aria-labelledby={`stock-${symbol}`}
    >
      <header>
        <h2 id={`stock-${symbol}`} style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>
          {symbol.toUpperCase()}
        </h2>
      </header>

      <div style={{ marginBottom: '12px' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '4px 0' }}>
          {formatCurrency(price)}
        </p>
        <p 
          style={{ color: changeColor, fontWeight: '600', margin: '0' }}
          aria-label={`Change percentage: ${change}%`}
        >
          {isPositive ? '+' : ''}{change}%
        </p>
      </div>

      <button 
        onClick={handleBuyClick}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        aria-label={`Buy ${symbol}`}
      >
        Buy
      </button>
    </section>
  );
};
