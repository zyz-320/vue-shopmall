<template>
  <vue-preview :slides="list" @close="handleClose" class="imgPrev"></vue-preview>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      list: []
    }
  },
  created() {
    this.getThumbs()
  },
  methods: {
    handleClose () {
      console.log('close event')
    },
    getThumbs() { // 获取缩略图
      this.$http
      .get('api/getthumimages/' + this.id)
      .then(result => {
        if(result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽高
          result.body.message.forEach(item => {
            item.h = 400
            item.w = 600
            item.msrc = item.src
          })
          this.list = result.body.message
        }else{
          Toast('获取缩略图信息失败')
        }
      })
    }
  },
  props: ['id']
}
</script>
<style lang="scss">
.imgPrev{
  .my-gallery{
    figure{
      display: inline-block;
      margin: 8px;
    }
    img{
      width: 100px;
      height: auto;
    }
  }
}
</style>