<template>
  <!-- 底部tbar -->
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{ 'docker_item--active': index === 0 }"
      class="docker_item"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker_title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  setup() {
    const dockerList = [
      { icon: "&#xe606;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe600;", text: "购物车", to: { name: "Gouwuche" } },
      { icon: "&#xec15;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe8a0;", text: "我的", to: { name: "Person" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss">
@import "@/style/variables.scss";

// 底部tbar
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  color: $content-fontColor;
  &_item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    a {
      color: $content-fontColor;
      text-decoration: none;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &_title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>