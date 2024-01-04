import type { ToRef } from 'vue'

import mainStore from '~/store/src/main'

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : K extends `$${infer P}` ? P : ToRef<T[K]>
}
type PartialRef<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Function ? T[K] : K extends `$${infer P}` ? P : ToRef<T[K]['value'] | undefined>
}

const storeExports = {
  main: mainStore
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as (
    T extends any ? (x: AutoToRefs<ReturnType<(typeof storeExports)[T]>>) => void : never
  ) extends (x: infer R) => void
    ? IsUnion<T> extends true
      ? R extends Record<string, any>
        ? PartialRef<R>
        : never
      : R
    : never
}
