/**
 * TextPanel
 *
 * Small panel that shows a caption and a block of text.
 *
 * Example:
 *   <TextPanel caption="SKU" text={sku} />
 */
import { ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { Panel } from './Panel'

/**
 * Props for {@link TextPanel}.
 *
 * @property caption - Small caption displayed above text.
 * @property style - Optional style for the panel.
 * @property text - Main text content.
 */
export type TextPanelProps = {
  caption: string
  style?: ViewStyle
  text: string
}

export const TextPanel = ({ caption, style, text }: TextPanelProps) => (
  <Panel elevation={4} style={style}>
    <Text variant='bodySmall'>{caption}</Text>
    <Text>{text}</Text>
  </Panel>
)
