import { getColorWithAlpha } from '../getColorWithAlpha'

describe('getColorWithAlpha', () => {
  describe('hex input formats', () => {
    it('should handle 6-digit hex with opacity alpha', () => {
      expect(getColorWithAlpha('#FF0000', 0.5)).toBe('#FF000080')
    })

    it('should handle 6-digit hex with 8-bit alpha', () => {
      expect(getColorWithAlpha('#FF0000', 128)).toBe('#FF000080')
    })

    it('should handle 3-digit hex (shorthand)', () => {
      expect(getColorWithAlpha('#F00', 0.5)).toBe('#FF000080')
    })

    it('should handle 8-digit hex (existing alpha)', () => {
      expect(getColorWithAlpha('#FF0000FF', 0.5)).toBe('#FF000080')
    })

    it('should handle hex without # prefix', () => {
      expect(getColorWithAlpha('FF0000', 0.5)).toBe('#FF000080')
    })
  })

  describe('rgb input format', () => {
    it('should handle rgb() format', () => {
      expect(getColorWithAlpha('rgb(255,0,0)', 0.5)).toBe('#FF000080')
    })

    it('should handle rgb() with spaces', () => {
      expect(getColorWithAlpha('rgb( 255 , 0 , 0 )', 0.5)).toBe('#FF000080')
    })
  })

  describe('rgba input format', () => {
    it('should handle rgba() format and overwrite alpha', () => {
      expect(getColorWithAlpha('rgba(255,0,0,1)', 0.5)).toBe('#FF000080')
    })

    it('should handle rgba() with existing partial alpha', () => {
      expect(getColorWithAlpha('rgba(255,0,0,0.25)', 0.75)).toBe('#FF0000BF')
    })

    it('should handle rgba() with spaces', () => {
      expect(getColorWithAlpha('rgba( 255 , 0 , 0 , 1 )', 0.5)).toBe('#FF000080')
    })
  })

  describe('alpha value handling', () => {
    it('should clamp alpha > 1 as 8-bit value', () => {
      expect(getColorWithAlpha('#0000FF', 255)).toBe('#0000FFFF')
    })

    it('should clamp alpha to minimum 0', () => {
      expect(getColorWithAlpha('#00FF00', -0.5)).toBe('#00FF0000')
    })

    it('should treat values > 1 as 8-bit and clamp to max 255', () => {
      expect(getColorWithAlpha('#00FF00', 300)).toBe('#00FF00FF')
    })

    it('should handle alpha 0', () => {
      expect(getColorWithAlpha('#0000FF', 0)).toBe('#0000FF00')
    })

    it('should handle alpha 1', () => {
      expect(getColorWithAlpha('#0000FF', 1)).toBe('#0000FFFF')
    })

    it('should handle fractional alpha values', () => {
      expect(getColorWithAlpha('#FF00FF', 0.25)).toBe('#FF00FF40')
    })

    it('should handle 8-bit alpha values (0-255)', () => {
      expect(getColorWithAlpha('#FFFF00', 64)).toBe('#FFFF0040')
    })
  })

  describe('various colors', () => {
    it('should handle white', () => {
      expect(getColorWithAlpha('#FFFFFF', 0.5)).toBe('#FFFFFF80')
    })

    it('should handle black', () => {
      expect(getColorWithAlpha('#000000', 0.5)).toBe('#00000080')
    })

    it('should handle RGB values with single digits', () => {
      expect(getColorWithAlpha('rgb(1,2,3)', 0.5)).toBe('#01020380')
    })
  })

  describe('error handling', () => {
    it('should return null for invalid hex', () => {
      expect(getColorWithAlpha('#GGGGGG', 0.5)).toBeNull()
    })

    it('should return null for invalid rgb format', () => {
      expect(getColorWithAlpha('rgb(255,0)', 0.5)).toBeNull()
    })

    it('should treat rgba(255,0,0) as rgb format (optional alpha)', () => {
      expect(getColorWithAlpha('rgba(255,0,0)', 0.5)).toBe('#FF000080')
    })

    it('should return null for empty string', () => {
      expect(getColorWithAlpha('', 0.5)).toBeNull()
    })

    it('should return null for random string', () => {
      expect(getColorWithAlpha('notacolor', 0.5)).toBeNull()
    })
  })

  describe('edge cases', () => {
    it('should preserve original color values', () => {
      const result = getColorWithAlpha('#123456', 0.8)
      expect(result).toMatch(/^#123456/)
    })

    it('should handle leading/trailing whitespace', () => {
      expect(getColorWithAlpha('  #FF0000  ', 0.5)).toBe('#FF000080')
    })

    it('should handle lowercase hex', () => {
      expect(getColorWithAlpha('#ff0000', 0.5)).toBe('#FF000080')
    })

    it('should handle mixed case hex', () => {
      expect(getColorWithAlpha('#Ff00Ff', 0.5)).toBe('#FF00FF80')
    })
  })
})
