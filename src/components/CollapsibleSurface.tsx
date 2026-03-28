import { Collapsible } from './Collapsible'
import { CollapsibleHeader } from './CollapsibleHeader'
import { Surface } from './Surface'

export type CollapsibleSurfaceProps = {
  children: React.ReactNode
  icon: string
  onPress: () => void
  title: string
  visible: boolean
}

export const CollapsibleSurface = ({ children, icon, onPress, title, visible }: CollapsibleSurfaceProps) => (
  <Surface>
    <CollapsibleHeader icon={icon} onPress={onPress} title={title} visible={visible} />
    <Collapsible visible={visible}>{children}</Collapsible>
  </Surface>
)
