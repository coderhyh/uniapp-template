export const addRouterInterceptor = () => {
  uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke(e) {
      return true
    },
    success(e) {
      console.log(e)
    }
  })
  uni.addInterceptor('switchTab', {
    // tab-bar页面跳转前进行拦截
    invoke(e) {
      return true
    },
    success(e) {
      console.log(e)
    }
  })
}
