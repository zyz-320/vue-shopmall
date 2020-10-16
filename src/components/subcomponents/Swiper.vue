<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 谁使用这个轮播图组件，谁就向这个组件传递 lunbotuList 数据 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{'full': isFull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ['lunbotuList', 'isFull'],
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
    .full {
      width: 100%;
    }
  }
}
</style>