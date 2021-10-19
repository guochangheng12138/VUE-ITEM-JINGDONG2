<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop_img" />
    <div
      :class="{
        shop_content: true,
        'shop_content--border': hideBorder ? false : true,
      }"
    >
      <div class="nearby_content_title">{{ item.title }}</div>
      <div class="shop_content_tags">
        <span class="shop_content_tag">月售：{{ item.sales }}</span>
        <span class="shop_content_tag">起送：{{ item.expressLimit }}</span>
        <span class="shop_content_tag">基础运费：{{ item.expressPrice }}</span>
      </div>
      <p class="nearby_content_highlight">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.shop {
  display: flex;
  padding-top: 0.12rem;
  &_img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &_content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 1px solid $content-bgColor;
    }
    &_title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontColor;
    }
    &_tags {
      margin-top: 0.08rem;
      line-height: 00.18rem;
      font-size: 0.13rem;
      color: $content-fontColor;
    }
    &_tag {
      margin-right: 0.16rem;
    }
    &_highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>