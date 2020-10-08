<template>
  <div class="homeContainer">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 六宫格（改自mui） -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu1.png" />
          <div class="mui-media-body">新闻资讯</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-email"
            ><span class="mui-badge">5</span></span
          >
          <div class="mui-media-body">图片分享</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">视频专区</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
// 导入 Toast 弹窗组件
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      lunbotuList: [], // 保存轮播图数组
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    // 获取轮播图图片信息
    getLunbotu() {
      this.$http
        .get('http://www.liulongbin.top:3005/api/getlunbo')
        .then((result) => {
          // console.log(result.body)
          if (result.body.status === 0) {
            // 如果获取数据成功，将数据保存到 lunbotuList 数据中，并返回一个 true
            this.lunbotuList = result.body.message
            // Toast('加载轮播图成功！')
            return true
          } else {
            // 如果获取数据失败，则出现一个弹窗并返回一个 false
            Toast('加载轮播图失败！')
            return false
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: pink;
    }
    &:nth-child(2) {
      background-color: skyblue;
    }
    &:nth-child(3) {
      background-color: palevioletred;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 取消六宫格的背景颜色
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
// 取消六宫格中每个li的边框
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>
