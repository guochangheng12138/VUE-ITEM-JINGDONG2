<template>
  <div class="wrapper">
    <div class="search">
      <div class="search_back iconfont" @click="handleBackClick">&#xe612;</div>
      <div class="search_content">
        <span class="search_content_icon iconfont">&#xe633;</span>
        <input
          type="text"
          class="search_content_input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>

    <ShopInfo :item="item" :hiderBorder="true" v-show="item.imgUrl" />

    <Content />

    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import request from "../../utils/request";

// import { useRouter } from "vue-router";

import ShopInfo from "../../components/ShopInfo.vue";

import Content from "./Content.vue";

import Cart from "./Cart.vue";

const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await request.get(`/api/v1/shop/${route.params.id}`);
    if (result.msg == "ok") {
      // console.log(result);
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);

  return { item, getItemData };
};
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return handleBackClick;
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    // const item = {
    //   id: "1",
    //   title: "沃尔玛",
    //   imgUrl: "http://webapi.hanmaweilai.com/public/static/images/near.png",
    //   sales: 10000,
    //   expressLimit: 0,
    //   expressPrice: 5,
    //   desc: "VIP尊享满89元减4元运费券（每月3张）",
    // };

    // const router = useRouter();
    // const handleBackClick = () => {
    //   router.back();
    // };

    const { item, getItemData } = useShopInfoEffect();
    const handleBackClick = useBackRouterEffect();
    getItemData();

    // return { item };
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &_back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &_content {
    display: flex;
    flex: 1;
    // background: #f5f5f5;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &_icon {
      width: 0.44rem;
      text-align: center;
      //   color: #b7b7b7;
      color: $search-fontColor;
    }
    &_input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: #333;
      &::placeholder {
        color: #333;
      }
    }
  }
}
</style>