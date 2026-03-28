export const stringifyEquals = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b)

export default stringifyEquals
