type User = { firstName?: string; middleName?: string; lastName?: string }

export const userName = (user: User) => {
  let name: string = ''
  if (user?.firstName) name += `${user.firstName} `
  if (user?.middleName) name += `${user.middleName} `
  if (user?.lastName) name += `${user.lastName} `
  return name.trim()
}
