let loadingCount = 0

export const showLoading = (title = '加载中') => {
  uni.showLoading({
    title
  })
  loadingCount = loadingCount + 1
}

export const hideLoading = () => {
  loadingCount = loadingCount - 1
  if (loadingCount === 0) {
    uni.hideLoading()
  }
}
