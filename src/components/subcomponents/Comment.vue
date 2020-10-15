<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多不超过120字" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
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
      comments: [],
      msg: ''
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
    postComment() { // 发表评论
      // 校验评论数据是否为空
      if(this.msg.trim().length === 0) {
        Toast('评论内容不能为空')
        return false
      }
      // 参数1：请求的URL地址
      // 参数2：提交给服务器的参数对象 { content: this.msg }
      // 参数3：提交表单数据的格式 { emulateJSON: true } （进行全局配置后可以省略）
      this.$http
      .post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim() })
      .then(result => {
        if(result.body.status === 0){
          // 1.拼接出一个评论对象
          let cmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          // 2.将这个评论对象 unshift 到 comment 数组数据中
          this.comments.unshift(cmt)
          this.msg = ''
        }else{
          Toast('提交评论信息失败')
        }
      })
    }
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
