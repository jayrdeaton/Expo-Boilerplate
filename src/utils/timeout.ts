export const timeout = (t: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), t))
}

export default timeout
