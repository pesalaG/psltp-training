/**
 * Format a number as LKR currency with comma separators.
 * Example: 1500000 -> "Rs. 1,500,000.00"
 */
export function formatCurrency(amount: number): string {
  const absoluteAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  // Intl.NumberFormat is a built-in JS tool that handles commas and decimals perfectly
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign}Rs. ${formatter.format(absoluteAmount)}`;
}

/**
 * Validate CDS number format: CDS-XXXX-XXXX where X is a digit.
 * Example: CDS-1234-5678 -> true, CDS-ABCD-1234 -> false
 */
export function validateCDSNumber(cds: string): boolean {

  const cdsRegex = /^CDS-\d{4}-\d{4}$/;
  
  return cdsRegex.test(cds);
}