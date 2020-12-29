<template>
  <div>
    <ul class="mui-table-view">
      <li v-for="item in newsList"
          :key="item.id"
          class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left"
               :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      newsList: [] // 新闻列表数据
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http.get('api/getnewslist').then((result) => {
        // console.log(result.body)
        if (result.data.status === 0) {
          // 如果获取数据成功，将数据保存到 newsList 数据中，并返回一个 true
          this.newsList = result.data.message
          // Toast('加载轮播图成功！')
          return true
        } else {
          // 如果获取数据失败，则出现一个弹窗并返回一个 false
          Toast('加载新闻列表数据失败！')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #226aff;
    }
  }
}
</style>
