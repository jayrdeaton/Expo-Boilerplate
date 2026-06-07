import { Appbar } from '@rific/auto-paper'
import { Button } from '@rific/haptic-press'
import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Card, Divider, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

type PackageEntry = {
  name: string
  label: string
  icon: string
  description: string
  route: string
}

const INSTALLED: PackageEntry[] = [
  {
    name: 'auto-paper',
    label: '@rific/auto-paper',
    icon: 'palette-outline',
    description: 'Adaptive Material 3 theming from a seed color',
    route: '/demos/auto-paper'
  },
  {
    name: 'haptic-press',
    label: '@rific/haptic-press',
    icon: 'gesture-tap',
    description: 'Haptic feedback wrappers for Paper components',
    route: '/demos/haptic-press'
  },
  {
    name: 'toaster',
    label: '@rific/toaster',
    icon: 'bell-outline',
    description: 'Stacking animated toast notifications with history',
    route: '/demos/toaster'
  },
  {
    name: 'updater',
    label: '@rific/updater',
    icon: 'refresh',
    description: 'Silent OTA update hook for Expo apps',
    route: '/demos/updater'
  }
]

const OPTIONAL: PackageEntry[] = [
  {
    name: 'focus-chain',
    label: '@rific/focus-chain',
    icon: 'link-variant',
    description: 'Auto-advancing focus chain for form inputs',
    route: '/packages/focus-chain'
  },
  {
    name: 'heatmap',
    label: '@rific/heatmap',
    icon: 'calendar-month-outline',
    description: 'GitHub-style activity heatmap with SVG rendering',
    route: '/packages/heatmap'
  },
  {
    name: 'resizable-input',
    label: '@rific/resizable-input',
    icon: 'resize',
    description: 'Auto-growing, drag-resizable text input',
    route: '/packages/resizable-input'
  },
  {
    name: 'scanner',
    label: '@rific/scanner',
    icon: 'barcode-scan',
    description: 'Full-screen barcode scanner with animated overlays',
    route: '/packages/scanner'
  },
  {
    name: 'timer',
    label: '@rific/timer',
    icon: 'timer-outline',
    description: 'Animated SVG progress ring timer',
    route: '/packages/timer'
  }
]

type PackageCardProps = { pkg: PackageEntry; mode: 'elevated' | 'outlined'; cta: string }

const PackageCard = ({ pkg, mode, cta }: PackageCardProps) => {
  const router = useRouter()
  return (
    <Card mode={mode} style={styles.card} onPress={() => router.push(pkg.route as any)}>
      <Card.Title title={pkg.label} titleVariant='labelLarge' subtitle={pkg.description} left={(props) => <Avatar.Icon {...props} icon={pkg.icon} size={40} />} />
      <Card.Actions>
        <Button compact onPress={() => router.push(pkg.route as any)}>
          {cta}
        </Button>
      </Card.Actions>
    </Card>
  )
}

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title='Expo Starter' />
      </Appbar.Header>
      <SafeAreaView style={styles.fill} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='bodyLarge' style={[styles.intro, { color: theme.colors.onSurfaceVariant }]}>
            A lean, production-ready template with file-based routing, Redux, adaptive theming, and a curated set of @rific packages pre-wired.
          </Text>

          <Text variant='titleMedium' style={styles.sectionTitle}>
            Included Packages
          </Text>
          {INSTALLED.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} mode='elevated' cta='View Demo' />
          ))}

          <Divider style={styles.divider} />

          <View style={styles.optionalHeader}>
            <Text variant='titleMedium'>Optional Packages</Text>
            <Text variant='bodySmall' style={[styles.optionalSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Not installed by default — add as needed.
            </Text>
          </View>
          {OPTIONAL.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} mode='outlined' cta='Learn More' />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  container: { padding: 16, paddingBottom: 32 },
  divider: { marginVertical: 24 },
  fill: { flex: 1 },
  intro: { marginBottom: 24 },
  optionalHeader: { marginBottom: 12 },
  optionalSubtitle: { marginTop: 4 },
  sectionTitle: { marginBottom: 12 }
})

export default HomeScreen
