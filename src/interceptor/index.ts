import { addRouterInterceptor } from './src/router'

const list: Function[] = [addRouterInterceptor]
export default {
  install() {
    list.forEach((fn) => fn())
  }
}
