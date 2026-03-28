import { getHex } from '../getHex'

describe('getHex', () => {
  it('should be defined', () => {
    expect(getHex).toBeDefined()
  })

  describe('rgb to hex', () => {
    it('should convert rgb() to 6-digit hex', () => {
      expect(getHex('rgb(255, 87, 51)')).toBe('#ff5733')
      expect(getHex('rgb(0, 0, 0)')).toBe('#000000')
      expect(getHex('rgb(255, 255, 255)')).toBe('#ffffff')
    })

    it('should convert rgba() to 8-digit hex with alpha', () => {
      expect(getHex('rgba(255, 87, 51, 1)')).toBe('#ff5733ff')
      expect(getHex('rgba(255, 87, 51, 0.5)')).toBe('#ff573380')
      expect(getHex('rgba(0, 0, 0, 0)')).toBe('#00000000')
    })

    it('should handle varied spacing', () => {
      expect(getHex('rgb(255,87,51)')).toBe('#ff5733')
      expect(getHex('rgb( 255 , 87 , 51 )')).toBe('#ff5733')
    })
  })

  describe('hex passthrough', () => {
    it('should normalize hex colors', () => {
      expect(getHex('#ff5733')).toBe('#ff5733')
      expect(getHex('ff5733')).toBe('#ff5733')
      expect(getHex('#FFF')).toBe('#ffffff')
      expect(getHex('FFF')).toBe('#ffffff')
    })

    it('should preserve alpha in 8-digit hex', () => {
      expect(getHex('#ff5733ff')).toBe('#ff5733ff')
      expect(getHex('#ff573380')).toBe('#ff573380')
    })
  })

  describe('invalid input', () => {
    it('should return null for invalid formats', () => {
      expect(getHex('invalid')).toBeNull()
      expect(getHex('')).toBeNull()
      expect(getHex('rgb()')).toBeNull()
    })
  })
})
