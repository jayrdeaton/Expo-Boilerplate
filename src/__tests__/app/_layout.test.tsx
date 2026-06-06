import React from 'react'
import { render } from '@testing-library/react-native'
import * as SplashScreen from 'expo-splash-screen'

jest.mock('expo-router', () => ({
  Stack: Object.assign(
    (props: any) => props.children,
    { Screen: () => null }
  ),
}))

jest.mock('@rific/updater', () => ({
  useUpdater: jest.fn(),
}))

jest.mock('../../components/Providers', () => ({
  Providers: (props: any) => props.children,
}))

import RootLayout from '../../app/_layout'
import { useUpdater } from '@rific/updater'

const mockUseUpdater = useUpdater as jest.Mock

describe('RootLayout', () => {
  it('calls SplashScreen.preventAutoHideAsync on module load', () => {
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalled()
  })

  it('calls SplashScreen.setOptions with fade animation on module load', () => {
    expect(SplashScreen.setOptions).toHaveBeenCalledWith({ duration: 500, fade: true })
  })

  it('renders without crashing', async () => {
    await expect(render(<RootLayout />)).resolves.toBeDefined()
  })

  it('calls useUpdater on render', async () => {
    await render(<RootLayout />)
    expect(mockUseUpdater).toHaveBeenCalled()
  })
})
