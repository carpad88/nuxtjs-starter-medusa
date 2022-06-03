export const formatPrice = (amount, currencyCode, quantity = 1) => {
  return (amount / 100 * quantity).toFixed(2) +
    ' ' +
    currencyCode.toUpperCase()
}
