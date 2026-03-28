export const getAddress3 = <T extends { city: string | null; state: string | null; zip: string | null }>(item?: T) => {
  let address3 = item?.city
  if (item?.state) address3 = address3 ? `${address3} ${item.state}` : item.state
  if (item?.zip) address3 = address3 ? `${address3}, ${item.zip}` : item.zip
  return address3
}

export default getAddress3
