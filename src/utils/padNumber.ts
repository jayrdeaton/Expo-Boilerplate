export const padNumber = (number: number, digits: number) => {
  let result = `${number}`
  while (result.length < digits) result = `0${result}`
  return result
}

export default padNumber
