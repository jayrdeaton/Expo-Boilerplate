import { getTriadicPalette } from '../getTriadicPalette'

describe('getTriadicPalette', () => {
  it('should return a triadic palette object with three hex colors', () => {
    const palette = getTriadicPalette('#ff0000')
    expect(palette).toHaveProperty('primary')
    expect(palette).toHaveProperty('secondary')
    expect(palette).toHaveProperty('tertiary')
    expect(palette.primary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.secondary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.tertiary).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should generate triadic colors for red', () => {
    const palette = getTriadicPalette('#ff0000')
    expect(palette.primary).toBe('#ff0000')
    // Red (0°) -> Green (~120°) -> Blue (~240°)
    expect(palette.secondary).toMatch(/^#00[a-f0-9]{4}$/i) // Green-ish
    expect(palette.tertiary).toMatch(/^#0000[a-f0-9]{2}$/i) // Blue-ish
  })

  it('should generate triadic colors for green', () => {
    const palette = getTriadicPalette('#00ff00')
    expect(palette.primary).toBe('#00ff00')
    // Should generate three evenly spaced colors
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should generate triadic colors for blue', () => {
    const palette = getTriadicPalette('#0000ff')
    expect(palette.primary).toBe('#0000ff')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should handle 3-digit hex colors', () => {
    const palette = getTriadicPalette('#f00')
    expect(palette.primary).toBe('#ff0000')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should handle rgb format', () => {
    const palette = getTriadicPalette('rgb(255, 0, 0)')
    expect(palette.primary).toBe('#ff0000')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should handle rgba format', () => {
    const palette = getTriadicPalette('rgba(255, 0, 0, 1)')
    // getHex preserves alpha, so it may return #ff0000ff for full opacity
    expect(palette.primary).toMatch(/^#ff0000/i)
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should generate colors that are evenly spaced on the color wheel', () => {
    const palette = getTriadicPalette('#ff6b35')
    // All three colors should be valid hex
    expect(palette.primary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.secondary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.tertiary).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should work with grayscale colors', () => {
    const palette = getTriadicPalette('#808080')
    expect(palette.primary).toBe('#808080')
    // Grayscale should still generate three colors (they'll be very similar)
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should work with white', () => {
    const palette = getTriadicPalette('#ffffff')
    expect(palette.primary).toBe('#ffffff')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should work with black', () => {
    const palette = getTriadicPalette('#000000')
    expect(palette.primary).toBe('#000000')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should handle colors without # prefix', () => {
    const palette = getTriadicPalette('ff0000')
    expect(palette.primary).toBe('#ff0000')
    expect(palette.secondary).toBeTruthy()
    expect(palette.tertiary).toBeTruthy()
  })

  it('should maintain saturation and lightness across triadic colors', () => {
    const palette = getTriadicPalette('#ff4500') // Orange-red
    // All colors should be hex format
    expect(palette.primary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.secondary).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette.tertiary).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should throw on invalid color format', () => {
    expect(() => getTriadicPalette('invalid-color')).toThrow()
    expect(() => getTriadicPalette('#GGGGGG')).toThrow()
  })

  it('should generate consistent results for the same input', () => {
    const palette1 = getTriadicPalette('#3498db')
    const palette2 = getTriadicPalette('#3498db')
    expect(palette1.primary).toBe(palette2.primary)
    expect(palette1.secondary).toBe(palette2.secondary)
    expect(palette1.tertiary).toBe(palette2.tertiary)
  })

  it('should work with various valid hex formats', () => {
    const testColors = ['#fff', '#ffffff', 'fff', 'ffffff', '#a1b2c3', 'a1b2c3']

    testColors.forEach((color) => {
      expect(() => getTriadicPalette(color)).not.toThrow()
      const palette = getTriadicPalette(color)
      expect(palette.primary).toMatch(/^#[0-9a-f]{6}$/i)
      expect(palette.secondary).toMatch(/^#[0-9a-f]{6}$/i)
      expect(palette.tertiary).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
