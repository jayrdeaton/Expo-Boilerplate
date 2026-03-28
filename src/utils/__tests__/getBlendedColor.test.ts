import { getBlendedColor } from '../getBlendedColor'

describe('getBlendedColor', () => {
  it('should be defined', () => {
    expect(getBlendedColor).toBeDefined()
  })

  describe('basic blending', () => {
    it('should blend white foreground with black background at 50% alpha', () => {
      expect(getBlendedColor('#ffffff', '#000000', 0.5)).toBe('#808080')
    })

    it('should blend black foreground with white background at 50% alpha', () => {
      expect(getBlendedColor('#000000', '#ffffff', 0.5)).toBe('#808080')
    })

    it('should return background at 0% alpha', () => {
      expect(getBlendedColor('#ff0000', '#0000ff', 0)).toBe('#0000ff')
    })

    it('should return foreground at 100% alpha', () => {
      expect(getBlendedColor('#ff0000', '#0000ff', 1)).toBe('#ff0000')
    })
  })

  describe('different color formats', () => {
    it('should blend hex colors', () => {
      expect(getBlendedColor('#ff5733', '#3357ff', 0.5)).toBe('#995799')
    })

    it('should blend rgb colors', () => {
      expect(getBlendedColor('#ff5733', 'rgb(51, 87, 255)', 0.5)).toBe('#995799')
    })

    it('should blend rgba colors (ignore alpha channel)', () => {
      expect(getBlendedColor('rgba(255, 87, 51, 1)', 'rgba(51, 87, 255, 0.5)', 0.5)).toBe('#995799')
    })

    it('should blend hex and rgb formats', () => {
      expect(getBlendedColor('#ff5733', 'rgb(51, 87, 255)', 0.5)).toBe('#995799')
    })
  })

  describe('alpha clamping', () => {
    it('should clamp alpha values above 1 to 1', () => {
      expect(getBlendedColor('#ff0000', '#0000ff', 1.5)).toBe('#ff0000')
      expect(getBlendedColor('#ff0000', '#0000ff', 2)).toBe('#ff0000')
    })

    it('should clamp alpha values below 0 to 0', () => {
      expect(getBlendedColor('#ff0000', '#0000ff', -0.5)).toBe('#0000ff')
      expect(getBlendedColor('#ff0000', '#0000ff', -1)).toBe('#0000ff')
    })
  })

  describe('partial alpha values', () => {
    it('should blend at 25% alpha', () => {
      expect(getBlendedColor('#ffffff', '#000000', 0.25)).toBe('#404040')
    })

    it('should blend at 75% alpha', () => {
      expect(getBlendedColor('#ffffff', '#000000', 0.75)).toBe('#bfbfbf')
    })

    it('should blend red with blue at 30% alpha', () => {
      expect(getBlendedColor('#ff0000', '#0000ff', 0.3)).toBe('#4d00b3')
    })
  })

  describe('edge cases', () => {
    it('should return background when foreground is invalid', () => {
      expect(getBlendedColor('invalid', '#0000ff', 0.5)).toBe('#0000ff')
    })

    it('should return background when background is invalid', () => {
      expect(getBlendedColor('#ff0000', 'invalid', 0.5)).toBe('invalid')
    })

    it('should return background when both are invalid', () => {
      expect(getBlendedColor('invalid1', 'invalid2', 0.5)).toBe('invalid2')
    })

    it('should handle identical colors', () => {
      expect(getBlendedColor('#ff5733', '#ff5733', 0.5)).toBe('#ff5733')
    })
  })

  describe('real-world tinting scenarios', () => {
    it('should tint white surface with primary color', () => {
      const white = '#ffffff'
      const primary = '#2196f3'
      expect(getBlendedColor(primary, white, 0.05)).toBe('#f4fafe')
    })

    it('should tint dark surface with primary color', () => {
      const dark = '#121212'
      const primary = '#2196f3'
      expect(getBlendedColor(primary, dark, 0.08)).toBe('#131d24')
    })

    it('should create subtle surface variant', () => {
      const surface = 'rgb(255, 255, 255)'
      const accent = '#9c27b0'
      expect(getBlendedColor(accent, surface, 0.12)).toBe('#f3e5f6')
    })
  })
})
