<template>
  <div class="photolist-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoInfo.add_time | dateFormat}}</span>
      <span>点击{{photoInfo.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <mpt-box :id="id"></mpt-box>
    <!-- 图片内容区域 -->
    <div class="content"
         v-html="photoInfo.content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
// 导入评论子组件
import Comment from '../subcomponents/Comment.vue'
// 导入缩略图子组件
import MiniPhoto from '../subcomponents/MiniPhoto.vue'

import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      id: this.$route.params.id, // 将url地址中传递过来的id挂载到 id 中
      photoInfo: {}, // 图片详情信息
      list: [], // 缩略图的数组
    }
  },
  created() {
    this.getPhotoInfo()
  },
  methods: {
    getPhotoInfo() {
      this.$http
        .get('api/getimageInfo/' + this.id)
        .then(result => {
          if (result.data.status === 0) {
            this.photoInfo = result.data.message[0]
          } else {
            Toast('获取新闻详情失败')
          }
        })
    },
  },
  components: {
    'cmt-box': Comment,
    'mpt-box': MiniPhoto,
  },
}
</script>
<style lang="scss" scoped>
.photolist-container {
  padding: 5px;
  h3 {
    font-size: 15px;
    color: #26afff;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  hr {
    background-color: #ccc;
    margin: 8px 0;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>