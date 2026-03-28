import { getRgb } from '../getRgb'

describe('getRgb', () => {
  it('should be defined', () => {
    expect(getRgb).toBeDefined()
  })

  describe('hex format', () => {
    it('should parse 6-digit hex with #', () => {
      expect(getRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
      expect(getRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should parse 6-digit hex without #', () => {
      expect(getRgb('ff5733')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
      expect(getRgb('000000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should parse 3-digit hex with #', () => {
      expect(getRgb('#f53')).toEqual({ r: 255, g: 85, b: 51 })
      expect(getRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 })
      expect(getRgb('#000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should parse 3-digit hex without #', () => {
      expect(getRgb('f53')).toEqual({ r: 255, g: 85, b: 51 })
      expect(getRgb('FFF')).toEqual({ r: 255, g: 255, b: 255 })
      expect(getRgb('000')).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should handle hex with whitespace', () => {
      expect(getRgb('  #ff5733  ')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('  ff5733  ')).toEqual({ r: 255, g: 87, b: 51 })
    })

    it('should parse 8-digit hex with alpha', () => {
      expect(getRgb('#ff5733ff')).toEqual({ r: 255, g: 87, b: 51, a: 1 })
      expect(getRgb('#ff573380')).toEqual({ r: 255, g: 87, b: 51, a: 0.5019607843137255 })
      expect(getRgb('ff5733ff')).toEqual({ r: 255, g: 87, b: 51, a: 1 })
      expect(getRgb('FFFFFF00')).toEqual({ r: 255, g: 255, b: 255, a: 0 })
    })
  })

  describe('rgb/rgba format', () => {
    it('should parse rgb() format', () => {
      expect(getRgb('rgb(255, 87, 51)')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('rgb(0, 0, 0)')).toEqual({ r: 0, g: 0, b: 0 })
      expect(getRgb('rgb(255, 255, 255)')).toEqual({ r: 255, g: 255, b: 255 })
    })

    it('should parse rgba() format with alpha', () => {
      expect(getRgb('rgba(255, 87, 51, 0.5)')).toEqual({ r: 255, g: 87, b: 51, a: 0.5 })
      expect(getRgb('rgba(0, 0, 0, 1)')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
      expect(getRgb('rgba(255, 251, 254, 1)')).toEqual({ r: 255, g: 251, b: 254, a: 1 })
    })

    it('should parse rgb with varied spacing', () => {
      expect(getRgb('rgb(255,87,51)')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('rgb( 255 , 87 , 51 )')).toEqual({ r: 255, g: 87, b: 51 })
    })

    it('should handle RGB/RGBA uppercase', () => {
      expect(getRgb('RGB(255, 87, 51)')).toEqual({ r: 255, g: 87, b: 51 })
      expect(getRgb('RGBA(255, 87, 51, 0.5)')).toEqual({ r: 255, g: 87, b: 51, a: 0.5 })
    })
  })

  describe('invalid formats', () => {
    it('should return null for invalid formats', () => {
      expect(getRgb('invalid')).toBeNull()
      expect(getRgb('')).toBeNull()
      expect(getRgb('#')).toBeNull()
      expect(getRgb('#gg0000')).toBeNull()
      expect(getRgb('rgb()')).toBeNull()
      expect(getRgb('rgb(256, 256, 256)')).toEqual({ r: 256, g: 256, b: 256 }) // Numbers parsed but out of range
    })
  })
})
