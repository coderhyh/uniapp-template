import { createPersistedState } from 'pinia-plugin-persistedstate'

import { decryptData, encryptData } from '~/utils'

const store = createPinia()

const isDev = import.meta.env.DEV
store.use(
  createPersistedState({
    storage: {
      getItem: (key: string) => {
        const data = uni.getStorageSync(key)
        return isDev ? data : decryptData(data)
      },
      setItem: (key: string, value: string) => uni.setStorageSync(key, isDev ? value : encryptData(value))
    }
  })
)

export default store
