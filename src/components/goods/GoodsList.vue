<template>
  <div class="goods-list">
    <div class="goods-item">
      <img src="https://dsfs.oppo.com/archives/202009/202009291009365f729b5c51ea6.png?x-oss-process=image/format,webp" >
      <h1 class="title">小米手机</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥2199</span>
          <span class="old">￥9999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩六十件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="https://dsfs.oppo.com/archives/202009/202009291009365f729b5c51ea6.png?x-oss-process=image/format,webp" >
      <h1 class="title">小米手机小米手机小米手机小米手机</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥2199</span>
          <span class="old">￥9999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩六十件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="https://dsfs.oppo.com/archives/202009/202009291009365f729b5c51ea6.png?x-oss-process=image/format,webp" >
      <h1 class="title">小米手机</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥2199</span>
          <span class="old">￥9999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩六十件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
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