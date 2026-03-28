import { useMemo, useRef } from 'react'
import { TextInput } from 'react-native'

type ChainLink = {
  ref: (el: TextInput | null) => void
  focus: () => void
}

/**
 * Manages a linear chain of focusable text inputs without individual refs.
 * Each link exposes `ref` (callback ref to attach) and `focus()` to jump to that field.
 *
 * Example:
 *   const chain = useFocusChain(3)
 *   <TextInput ref={chain[0].ref} returnKeyType='next' onSubmitEditing={chain[1].focus} />
 *   <TextInput ref={chain[1].ref} returnKeyType='next' onSubmitEditing={chain[2].focus} />
 *   <TextInput ref={chain[2].ref} returnKeyType='done' />
 */
export function useFocusChain(count: number): ChainLink[] {
  const refs = useRef<(TextInput | null)[]>(Array(count).fill(null))
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        ref: (el: TextInput | null) => {
          refs.current[i] = el
        },
        focus: () => refs.current[i]?.focus()
      })),
    [count]
  )
}
