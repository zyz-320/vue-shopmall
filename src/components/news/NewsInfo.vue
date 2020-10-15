<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{newsInfo.title}}</h1>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
      <span>点击{{newsInfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容部分 -->
    <div class="content" v-html="newsInfo.content">

    </div>
    <!-- 评论子组件区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 导入评论子组件
import Comment from '../subcomponents/Comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id, // 将从路由地址中获取到的 id 值挂载到 data 中，方便随时取用
      newsInfo: {}
    }
  },
  created() {
    this.$nextTick(function(){
        this.getNewsInfo();
    });
  },
  methods: {
    getNewsInfo() {
      this.$http.get('api/getnew/' + this.id).then((result) => {
        // console.log(result.body)
        if (result.body.status === 0) {
            // 如果获取数据成功，将数据保存到 newsInfo 数据中
            this.newsInfo = result.body.message[0]
          } else {
            // 如果获取数据失败，则出现一个弹窗
            Toast('新闻详情信息获取失败')
          }
      })
    },
  },
  components: { // 用来注册子组件的节点
    'comment-box': Comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 5px;
  .title {
    margin: 0;
    padding: 15px 0;
    font-size: 16px;
    color: palevioletred;
    text-align: center;
  }
  .subtitle {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #226aff;
  }
  .content {

  }
  hr {
    margin: 8px 0;
    font-weight: 700;
    background-color: #999;
  }
}
</style>
