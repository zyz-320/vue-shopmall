<template>
  <!-- 数字输入按钮 -->
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged" ref="numbox" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  mounted() {
    // 初始化数字输入按钮
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged() {
      // 每当文本框的数据发生改变，就将文本框中的数据更新到 store 中的 car 数组的 count 属性上
      // console.log(this.$refs.numbox.value)
      this.$store.commit('updateGoodsCount', { id: this.goodsId, count: parseInt(this.$refs.numbox.value) })
    },
  },
  props: ['initCount', 'goodsId'],
}
</script>
<style lang="scss" scoped>

</style>