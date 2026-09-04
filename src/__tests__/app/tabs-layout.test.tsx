import { render } from '@testing-library/react-native'

import TabsLayout from '../../app/(tabs)/_layout'

jest.mock('expo-router', () => ({
  Tabs: Object.assign((props: any) => props.children, { Screen: () => null })
}))

describe('TabsLayout', () => {
  it('renders without crashing', async () => {
    await expect(render(<TabsLayout />)).resolves.toBeDefined()
  })
})
