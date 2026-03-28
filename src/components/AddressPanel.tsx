/**
 * AddressPanel
 *
 * Displays up to three address lines if any address fields are present on `item`.
 *
 * Example:
 *   <AddressPanel item={customer} />
 */
import { ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { getAddress3 } from '../utils'
import { Panel } from './Panel'

/**
 * Props for {@link AddressPanel}.
 *
 * @property item - Object with address fields.
 * @property style - Optional container style for the panel.
 */
export type AddressPanelProps<T> = {
  item?: T
  style?: ViewStyle
}

export const AddressPanel = <T extends { address1: string | null; address2: string | null; city: string | null; state: string | null; zip: string | null }>({ item, style }: AddressPanelProps<T>) => {
  const address3 = getAddress3<T>(item)
  const hasAddress = item?.address1 || item?.address2 || address3

  return hasAddress ? (
    <Panel elevation={2} style={style}>
      {item?.address1 && <Text>{item.address1}</Text>}
      {item?.address2 && <Text>{item.address2}</Text>}
      {address3 && <Text>{address3}</Text>}
    </Panel>
  ) : null
}
