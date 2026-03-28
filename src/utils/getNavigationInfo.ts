import { NavigationState, PartialState, Route } from '@react-navigation/native'

type NavState = NavigationState | PartialState<NavigationState>

export type NavigationInfo = {
  route: Route<string>
  parent?: Route<string>
}

export const getNavigationInfo = (state?: NavState): NavigationInfo | undefined => {
  if (!state?.routes?.length) return undefined

  let current: NavState | undefined = state
  let parentRoute: Route<string> | undefined
  // Walk down nested navigators to find the deepest active route
  while (current?.routes?.length) {
    const index = (current as NavigationState).index ?? current.routes.length - 1
    const route = current.routes[index]
    const nestedState = (route as Route<string> & { state?: NavState }).state

    if (nestedState) {
      parentRoute = route as Route<string>
      current = nestedState
      continue
    }

    return { route: route as Route<string>, parent: parentRoute }
  }

  return undefined
}
