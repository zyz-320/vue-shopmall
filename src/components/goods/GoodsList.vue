<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" >
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩 {{item.stock_quantity}} 件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() { // 是在自己的组件内部挂载一些私有数据的
    return {
      pageindex: 1, // 商品分页页码
      goodsList: [], // 商品列表
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      this.$http
      .get('api/getgoods?pageindex=' + this.pageindex)
      .then(result => {
        if(result.body.status === 0){
          this.goodsList = this.goodsList.concat(result.body.message)
        }else{
          Toast('获取商品信息失败')
        }
      })
    },
    getMore() { // 获取更多商品信息
      this.pageindex++
      this.getGoodsList()
    },
    goDetail(id) { // 根据 id 跳转到商品详情页
      // 1.参数为字符串
      // this.$router.push('/home/goodsInfo/' + id)
      // 2.参数为对象
      // this.$router.push({ path: '/home/goodsInfo/' + id })
      // 3.使用命名的路由，name 属性需要在路由规则中配置
      this.$router.push({ name: 'goodsInfo', params: { id } })
    },
  },
}
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 3px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 263px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      font-weight: 700;
    }
    .info {
      bottom: 0;
      background-color: #eee;
      p {
        margin: 0;
        padding: 3px;
      }
      .price {
        .now {
          color: red;
          font-weight: 700;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
    }
  }
}
</style>