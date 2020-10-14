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
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 按需导入 mint-ui 组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
// Vue.component('mybtn', Button)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入日期格式化插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern)
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
})
console.log('OK')
