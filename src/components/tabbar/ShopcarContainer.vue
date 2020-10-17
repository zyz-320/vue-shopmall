<template>
  <div class="shopcar-container">
    <div class="mui-card" v-for="(item, i) in goodsInfo" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goods-list">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <!-- 通过item.id删除car数据中的相关商品信息，通过i删除此页面goodsInfo中的数据，移除这个商品列表 -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner accounts">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getSelectedPrice.allCount}}</span> 件，总价 <span class="red">￥{{$store.getters.getSelectedPrice.allPrice}}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    {{$store.state.car}}
    <!-- <div v-for="item in $store.state.car" :key="item.id">{{item.id }}---{{ item.selected }}</div> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import numbox from '../subcomponents/ShopCar-numBtn.vue'
export default {
  data() {
    return {
      goodsInfo: [], // 存放购物车中的商品信息
    }
  },
  created() {
    this.getShopcarInfo()
  },
  methods: {
    getShopcarInfo() { // 获取购物车中商品的信息
      let ids = []
      this.$store.state.car.forEach(item => {
        ids.push(item.id)
      });
      if(ids.length <= 0) return
      this.$http
      .get('api/goods/getshopcarlist/' + ids.join(','))
      .then(result => {
        if(result.body.status === 0){
          this.goodsInfo = result.body.message
        }else{
          Toast('获取购物车商品信息失败')
        }
      })
    },
    remove(id, index) {
      // 删除 state 中的商品信息，并删除 goodsInfo 中的商品信息
      // 删除 state 中的信息，必须调用 store 中的 mutations 中的方法进行修改
      this.$store.commit('removeFromCar', id)
      this.goodsInfo.splice(index, 1)
    },
    selectedChange(id, selected) {
      // 修改 state 中的 selected 信息，必须调用 store 中的 mutations 中的方法进行修改
      let selectedObj = { id: id, selected: selected }
      this.$store.commit('updateGoodsSelected', selectedObj)
    },
  },
  components: {
    numbox,
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin: 0 6px;
    }
    .info {
      h1 {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 15px;
      }
      .price {
        color: red;
        font-weight: 700;
      }
      a:focus, a:hover, a:visited {
        text-decoration: none;
        color: #007aff;
      }
    }
  }
  .accounts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    .red {
      color: red;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
