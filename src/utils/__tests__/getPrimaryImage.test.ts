import { AppImage as Image } from '../../types'

import { getPrimaryImage } from '../getPrimaryImage'

describe('getPrimaryImage', () => {
  it('returns undefined when images are missing', () => {
    expect(getPrimaryImage()).toBeUndefined()
    expect(getPrimaryImage([])).toBeUndefined()
    expect(getPrimaryImage(null)).toBeUndefined()
  })

  it('returns the first array item', () => {
    const images: Image[] = [
      { id: 'first', value: 'https://example.com/1.png', blurhash: 'BH1' },
      { id: 'second', value: 'https://example.com/2.png', blurhash: 'BH2' },
      { id: 'third', value: 'https://example.com/3.png', blurhash: 'BH3' }
    ]

    expect(getPrimaryImage(images)?.id).toBe('first')
  })

  it('returns the only item when array has one element', () => {
    const images: Image[] = [{ id: 'solo', value: 'https://example.com/solo.png', blurhash: null }]

    expect(getPrimaryImage(images)?.id).toBe('solo')
  })
})
