export const stringifyError = (err: any) => {
  return JSON.stringify(
    err,
    (_key, value) => {
      if (value instanceof Error) {
        const error: any = {}
        Object.getOwnPropertyNames(value).forEach((key) => {
          error[key] = value[key as keyof Error]
        })
        return error
      }
      return value
    },
    2
  )
}

export default stringifyError
