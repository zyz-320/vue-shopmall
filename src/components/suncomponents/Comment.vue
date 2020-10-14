<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多不超过120字" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第 {{i+1}} 楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore()">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pageIndex: 1, // 设置展示第一页数据
      comments: []
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() { // 获取评论信息
      this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
      .then(result => {
        if(result.body.status === 0) {
          // console.log(result.body.message)
          // 每次调用这个方法就用旧数据拼接上获取到的下一页的新数据
          this.comments = this.comments.concat(result.body.message)
        }else{
          Toast('获取评论数据失败')
        }
      })
    },
    getMore() { // 获取更多评论信息
      this.pageIndex++
      this.getComments()
    },
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  hr {
    margin: 6px 0;
    background-color: #999;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 8px 0;
    .cmt-item{
      font-size: 14px;
      .cmt-title {
        line-height: 35px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }

}

</style>
