export const initials = (s: string | null) => (!s ? '' : s.split(' ').reduce((a, i) => (a.length > 1 ? a : a + i[0]), ''))

export default initials
