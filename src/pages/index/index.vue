<template>
  <view class="content">
    index
    <Cpn />
    <u-button type="primary" text="确定"></u-button>
    <u-tag text="标签" plain size="mini" type="warning"></u-tag>
  </view>
</template>

<script setup lang="ts">
showLoading()
setTimeout(() => {
  hideLoading()
}, 1000)
</script>

<style lang="scss" scoped></style>
