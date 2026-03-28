export const currencyString = (n: number = 0) => `$${(n / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export default currencyString
