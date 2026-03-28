import { getComplementaryColor } from '../getComplementaryColor'

describe('getComplementaryColor', () => {
  it('should be defined', () => {
    expect(getComplementaryColor).toBeDefined()
  })

  describe('hex format', () => {
    it('should return complementary color for 6-digit hex with #', () => {
      expect(getComplementaryColor('#ff5733')).toBe('#00a8cc')
      expect(getComplementaryColor('#000000')).toBe('#ffffff')
      expect(getComplementaryColor('#ffffff')).toBe('#000000')
    })

    it('should return complementary color for 6-digit hex without #', () => {
      expect(getComplementaryColor('ff5733')).toBe('#00a8cc')
      expect(getComplementaryColor('000000')).toBe('#ffffff')
      expect(getComplementaryColor('ffffff')).toBe('#000000')
    })

    it('should return complementary color for 3-digit hex', () => {
      expect(getComplementaryColor('#f53')).toBe('#00aacc')
      expect(getComplementaryColor('#000')).toBe('#ffffff')
      expect(getComplementaryColor('#fff')).toBe('#000000')
    })

    it('should return complementary color for 8-digit hex (ignore alpha)', () => {
      expect(getComplementaryColor('#ff5733ff')).toBe('#00a8cc')
      expect(getComplementaryColor('#ff573380')).toBe('#00a8cc')
    })
  })

  describe('rgb/rgba format', () => {
    it('should return complementary color for rgb()', () => {
      expect(getComplementaryColor('rgb(255, 87, 51)')).toBe('#00a8cc')
      expect(getComplementaryColor('rgb(0, 0, 0)')).toBe('#ffffff')
      expect(getComplementaryColor('rgb(255, 255, 255)')).toBe('#000000')
    })

    it('should return complementary color for rgba() (ignore alpha)', () => {
      expect(getComplementaryColor('rgba(255, 87, 51, 1)')).toBe('#00a8cc')
      expect(getComplementaryColor('rgba(255, 87, 51, 0.5)')).toBe('#00a8cc')
    })
  })

  describe('edge cases', () => {
    it('should handle middle gray correctly', () => {
      expect(getComplementaryColor('#808080')).toBe('#7f7f7f')
      expect(getComplementaryColor('rgb(128, 128, 128)')).toBe('#7f7f7f')
    })

    it('should return original value for invalid input', () => {
      expect(getComplementaryColor('invalid')).toBe('invalid')
      expect(getComplementaryColor('')).toBe('')
      expect(getComplementaryColor('notacolor')).toBe('notacolor')
    })
  })

  describe('complementary property', () => {
    it('should produce inverse RGB values', () => {
      // Red -> Cyan
      expect(getComplementaryColor('#ff0000')).toBe('#00ffff')
      // Green -> Magenta
      expect(getComplementaryColor('#00ff00')).toBe('#ff00ff')
      // Blue -> Yellow
      expect(getComplementaryColor('#0000ff')).toBe('#ffff00')
    })

    it('should be reversible (complementary of complementary is original)', () => {
      const original = '#6496c8'
      const complement = getComplementaryColor(original)
      const doubleComplement = getComplementaryColor(complement)
      expect(doubleComplement).toBe(original)
    })
  })
})
