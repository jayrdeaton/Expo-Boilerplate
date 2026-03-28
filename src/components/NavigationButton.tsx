import { useNavigation } from '@react-navigation/native'
import { memo, useMemo } from 'react'

import { BackButton } from './BackButton'
import { LogoButton } from './LogoButton'

const NavigationButtonInner = () => {
  const navigation = useNavigation()
  const index = useMemo(() => navigation.getState().index, [navigation])
  if (index === 0) return <LogoButton />
  else return <BackButton />
}

export const NavigationButton = memo(NavigationButtonInner)
