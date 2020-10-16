<template>
  <div class="goodsInfo-container">
    <!-- 加入购物车时的小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <!-- 数字输入按钮 -->
          <p style="color: #000;">购买数量：<numBtn @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numBtn></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}} 件</p>
          <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文详情</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import swiper from '../subcomponents/Swiper.vue'
// 导入数字按钮组件
import numBtn from '../subcomponents/GoogsInfo-numBtn.vue'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由中的 id 参数挂载到数据上，方便调用
      lunbotu: [], // 轮播图数据
      goodsInfo: {}, // 商品参数信息
      ballFlag: false, // 控制小球显示和隐藏
      selectedCount: 1. // 保存选择商品的数量
    }
  },
  created() {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  methods: {
    getLunbotu() {
      this.$http
      .get('api/getthumimages/' + this.id)
      .then(result => {
        if(result.body.status === 0){
          // 先循环轮播图数组的每一项，为每一项添加一个 img 属性，因为轮播图组件中只认识 item.img 属性
          result.body.message.forEach(item => {
            item.img = item.src
          })
          this.lunbotu = result.body.message
        }else{
          Toast('获取轮播图数据失败')
        }
      })
    },
    getGoodsInfo() { // 获取商品参数信息
      this.$http
      .get('api/goods/getinfo/' + this.id)
      .then(result => {
        if(result.body.status === 0) {
          this.goodsInfo = result.body.message[0]
        }else{
          Toast('获取商品参数信息失败')
        }
      })
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文详情页面
      this.$router.push({ name:'goodsDesc', params: { id } })
    },
    goComment(id) {
      // 点击使用编程式导航跳转到 商品评论页面
      this.$router.push({ name:'goodsComment', params: { id } })
    },
    addToShopCar() { // 添加到购物车小球动画
      this.ballFlag = !this.ballFlag
    },
    // 动画钩子函数
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
      el.offsetWidth
      // 获取小球元素的相对于视口的位置
      let ballPos = this.$refs.ball.getBoundingClientRect()
      // 操作 DOM 获取购物车徽标的位置
      let badgePos = document.getElementById('badge').getBoundingClientRect()
      // 横向位移距离
      let xDistance = badgePos.left - ballPos.left
      // 纵向位移距离
      let yDistance = badgePos.top - ballPos.top
      el.style.transform = `translate(${xDistance}px, ${yDistance}px)`
      el.style.transition = "all .5s cubic-bezier(.4, -0.3, 1, .68)"
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把选中的数量传递给父组件时，把选中的值保存到 data 上
      this.selectedCount = count
      console.log("父组件拿到的数量值为： " + this.selectedCount)
    }
  },
  components: {
    swiper,
    numBtn,
  },
}
</script>
<style lang="scss" scoped>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 390px;
    left: 147px;
    z-index: 99;
  }
  .price {
    color: #000;
    .now_price {
      color: red;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  
}
</style>