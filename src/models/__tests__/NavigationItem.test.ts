type Image = { id?: string; value?: string; blurhash?: string | null }

import { NavigationItem } from '../NavigationItem'

describe('NavigationItem', () => {
  it('parses images when stored as JSON text', () => {
    const rawImages = JSON.stringify([{ id: '1', value: 'https://example.com/1.png', blurhash: 'BH1' }])
    const item = new NavigationItem({ id: 'nav-1', images: rawImages })

    expect(item.images).toHaveLength(1)
    expect(item.images[0].value).toBe('https://example.com/1.png')
  })

  it('uses images array as-is when provided', () => {
    const images: Image[] = [{ id: '2', value: 'https://example.com/2.png', blurhash: 'BH2' }]
    const item = new NavigationItem({ id: 'nav-2', images })

    expect(item.images).toHaveLength(1)
    expect(item.images[0].id).toBe('2')
  })

  it('falls back to an empty array when images are invalid JSON', () => {
    const item = new NavigationItem({ id: 'nav-3', images: '{bad json}' })

    expect(item.images).toEqual([])
  })
})
