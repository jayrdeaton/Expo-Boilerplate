type Tag = { id: string; title?: string; color?: string }

export const tagsReduced = (tags: Tag[]) => (tags ? tags.reduce((a, i) => `${a ? `${a}, ` : ''}${i.title ?? ''}`, '') : '')

export default tagsReduced
