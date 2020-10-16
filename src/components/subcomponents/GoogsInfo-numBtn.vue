<template>
  <!-- 数字输入按钮 -->
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
      // 每当文本框的数据发生改变，就将文本框中的数据通过事件调用传递给父组件
      let num = this.$refs.numbox.value
      this.$emit('getCount', parseInt(num))
    },
  },
  props: ['max'],
  watch: {
    'max': function() {
      mui('.mui-numbox').numbox().setOption('max', this.max)
    },
  },
}
</script>
<style lang="scss" scoped>

</style>