export const commaString = (n: number): string => (n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : n.toString())

export default commaString
