<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
// 1.导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data() {
    return {
     cates: [], // 所有分类数据
     list: [], // 图片列表数据
    }
  },
  created() {
    this.getAllCatedory()
    this.getPhotoListByCateId(0)
  },
  mounted() { // 当组件中的DOM元素被渲染好并放到页面中后，会执行这个钩子函数； 因为这个时候的DOM元素是最新的
    // 2.初始化 mui 的区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getAllCatedory() {
      // 获取所有的图片分类（不包含‘全部’，这个分类，需要手动拼接）
      this.$http
      .get('api/getimgcategory')
      .then(result => {
        if(result.body.status === 0) {
          // 手动拼接出一个完整的分类数组
          result.body.message.unshift({ title: '全部', id: 0 })
          this.cates = result.body.message
          // this.cates.unshift({ title: '全部', id: 0 })
        }else{
          Toast('获取分类信息失败')
        }
      })
    },
    getPhotoListByCateId(cateId) {
      // 获取对应分类的图片信息
      this.$http
      .get('api/getimages/' + cateId)
      .then(result => {
        if(result.body.status === 0){
          this.list = result.body.message
        }else{
          Toast('获取图片信息失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .mui-scroll a:hover, 
  .mui-scroll a:focus {
    text-decoration: none;
  }
  * {
    touch-action: pan-y;  /* 使用全局样式样式去掉滑动顶部滑动栏时产生的警告 */
  }
  .photo-list {
    margin: 0;
    padding: 10px;
    li {
      background-color: #ccc;
      list-style: none;
      text-align: center;
      vertical-align: middle;
      margin: 5px 0;
      box-shadow: -2px 2px 5px #999;
      position: relative;
      img {
        width: 100%;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        max-height: 84px;
        .info-title {
          font-size: 15px;
        }
        .info-body {
          font-size: 13px;
        }
      }
    }
  }

</style>