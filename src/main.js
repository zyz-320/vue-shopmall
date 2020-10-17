// 入口文件
import Vue from 'vue'
// 使用路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入 app 组件
import app from './app.vue'
// 导入自己的路由配置模块
import router from './router.js'
// 导入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css'
// 导入 MUI 样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 导入并安装 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 全局设置 Vue-resource 的请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 Vue-resource 的 post 请求的表单提交格式 以 application/x-www-form-urlencoded 的 MIME type 提交
Vue.http.options.emulateJSON = true

/* // 按需导入 mint-ui 组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
// Vue.component('mybtn', Button)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)

// 导入日期格式化插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern)
})

// 导入缩略图组件
import VuePreview from 'vue-preview'
// 挂载
Vue.use(VuePreview) 
/* Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
}) */
// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刷新页面之后，都会先执行这个 main.js 文件，这时就先将本地存储中的 car 数据取出来，放在 state 中的 car 上
let car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car, // 将购物车中的商品数据，用一个数组存储起来，存储一些商品的对象: 
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsInfo) {
      // 点击 加入购物车 ，把商品信息对象，保存到 store 中的 car 上
      // 1.如果购物车中已经有这个商品了，那么就只更新商品的数量
      // 2.如果购物车中没有这个商品，那么就将整个商品对象添加到 car 数组中
      let flag = false // false 表示购物车中没有这个商品
      state.car.some(item => {
        if(item.id == goodsInfo.id){
          item.count += goodsInfo.count
          flag = true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsInfo)
      }
      // 每次更新了 car 之后都将数据存储在本地存储 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsCount(state, countObj) { 
      // 每次在购物车页面的数字按钮中修改了商品数量之后，就调用这个方法来更新 store 中的数据
      state.car.some(item => {
        if(item.id == countObj.id){
          item.count = countObj.count
          return true
        }
      })
      // 将更新之后的数据再保存到本地存储之中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      // 根据 id 删除 car 中的对应商品信息
      state.car.some((item, i) => {
        if(item.id == id){
          state.car.splice(i, 1)
          return true
        }
      })
      // 将更新之后的数据再保存到本地存储之中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, slectedObj) {
      // 根据 id 更新 car 中的 selected 数据信息
      state.car.some(item => {
        if(item.id == slectedObj.id){
          item.selected = slectedObj.selected
          return true
        }
      })
      // 将更新之后的数据再保存到本地存储之中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
  },
  getters: { // this.$store.getters.***
    // 相当于计算属性computed， 也相当于过滤器filter
    getAllCount(state) {  // 计算购物车中的商品总量
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {  // 获取购物车页面中的每件商品的数量
      let o ={}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {  // 获取购物车页面中每件商品的 switch 按钮状态
      let s = {}
      state.car.forEach(item => {
        s[item.id] = item.selected
      })
      return s
    },
    getSelectedPrice(state) {
      // 获取选种商品的总数量，以及选中商品的总价
      let a = { allCount: 0, allPrice: 0 }
      state.car.forEach(item => {
        if(item.selected === true) {
          a['allCount'] += item.count
          a['allPrice'] += item.count * item.price
        }
      })
      return a
    },
  },
})

// 显示vue-devtools工具
// Vue.config.devtools = true


var vm = new Vue({
  el: '#app',
  data: {
    msg: '',
  },
  render: (c) => c(app),
  // 挂载路由对象到 vue 实例对象上
  router,
  // 挂载 vuex 实例对象到 vue 实例对象上
  store,
})
console.log('OK')
