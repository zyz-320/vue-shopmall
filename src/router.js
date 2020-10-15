import VueRouter from 'vue-router'
// 导入底部 tabbar 对应内容的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
// 导入 news 中的组件
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
// 导入图片分享模块的组件
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
// 导入商品列表模块的组件
import GoodsList from './components/goods/GoodsList.vue'

var router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newsList', component: NewsList },
    { path: '/home/newsInfo/:id', component: NewsInfo },
    { path: '/home/photoList', component: PhotoList },
    { path: '/home/PhotoInfo/:id', component: PhotoInfo },
    { path: '/home/goodsList', component: GoodsList },
  ],
  // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  linkActiveClass: 'mui-active',
})

export default router
