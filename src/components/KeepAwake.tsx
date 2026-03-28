import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'

export type KeepAwakeProps = {
  active: boolean
}

export const KeepAwake = ({ active }: KeepAwakeProps) => {
  if (active) {
    activateKeepAwakeAsync()
  } else {
    deactivateKeepAwake()
  }
  return null
}
