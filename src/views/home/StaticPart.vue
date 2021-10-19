<template>
  <!-- 顶部定位及消息通知 -->
  <div class="position">
    <span class="iconfont position_icon">&#xe61b;</span>
    山东省济南市自贸区鲁商凤凰广场汉码未来
    <span class="iconfont position_notice">&#xe614;</span>
  </div>
  <!-- 搜索及banner -->
  <div class="search">
    <span class="iconfont">&#xe633;</span>
    <span>山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner_img"
      src="http://webapi.hanmaweilai.com/public/static/images/banner.jpg"
      alt=""
    />
  </div>
  <!-- 55555555555555555555555555555555555555555555555555555555555555555555 -->
  <!-- nav -->
  <div class="icons">
    <div class="icons_item" v-for="item in iconList" :key="item.desc">
      <img
        :src="`http://webapi.hanmaweilai.com/public/static/images/${item.imgName}.png`"
        class="icons_item_img"
      />
      <p class="icons_item_desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconList = [
      { imgName: "超市", desc: "超市便利" },
      { imgName: "菜市场", desc: "菜市场" },
      { imgName: "水果店", desc: "水果店" },
      { imgName: "鲜花", desc: "鲜花绿植" },
      { imgName: "医药健康", desc: "医药健康" },
      { imgName: "家居", desc: "家居时尚" },
      { imgName: "蛋糕", desc: "烘焙蛋糕" },
      { imgName: "签到", desc: "签到" },
      { imgName: "大牌免运", desc: "大牌免运" },
      { imgName: "红包", desc: "红包套餐" },
    ];
    return { iconList };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.position {
  @include ellipsis;
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .positon_icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .positon_notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
  color: $content-fontColor;
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &_text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &_img {
    width: 100%;
  }
}
// nav
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &_item {
    width: 20%;
    &_img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &_desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontColor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>
