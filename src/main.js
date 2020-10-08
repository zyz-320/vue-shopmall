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

// 按需导入 mint-ui 组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
// Vue.component('mybtn', Button)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

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
})
console.log('OK')
