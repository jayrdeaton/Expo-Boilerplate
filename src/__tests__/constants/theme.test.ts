import { colors } from '../../constants/theme'

describe('theme constants', () => {
  it('exports a primary color', () => {
    expect(colors.primary).toBeDefined()
  })

  it('primary color is a valid 6-digit hex value', () => {
    expect(colors.primary).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it('primary color is the expected brand green', () => {
    expect(colors.primary).toBe('#4caf50')
  })
})
