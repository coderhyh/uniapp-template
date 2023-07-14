<template>
  <view class="content">
    index
    <Test />
  </view>
</template>

<script setup lang="ts">
showLoading()
setTimeout(() => {
  hideLoading()
}, 1000)

interface IUserInfo {
  name: string
  age: number
}
// getUserInfo<IUserInfo>()
//   .then((res) => {
//     console.log(11, res)
//   })
//   .catch((err) => {
//     console.log(11, err)
//   })
// getUserInfo.abort?.()
</script>

<style lang="scss" scoped></style>
