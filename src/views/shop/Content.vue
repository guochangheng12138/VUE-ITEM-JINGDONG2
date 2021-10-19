<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category_item: true,
          'category_item--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleCategoryClick(item.tab)"
      >
        {{ item.name }}
      </div>

      <!-- <div class="category_item category_item--active">全部商品</div>
      <div class="category_item">秒杀</div>
      <div class="category_item">新鲜水果</div>
      <div class="category_item">休闲食品</div>
      <div class="category_item">时令蔬菜</div>
      <div class="category_item">肉蛋家禽</div> -->
    </div>
    <div class="product">
      <div class="product_item" v-for="item in contentList" :key="item.id">
        <img class="product_item_img" :src="item.img_url" />
        <div class="product_item_detail">
          <h4 class="product_item_title">{{ item.name }}</h4>
          <p class="product_item_sales">月售{{ item.sales }}件</p>
          <p class="product_item_price">
            <span class="product_item_yen">&yen;</span>{{ item.price }}
            <span class="product_item_origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product_number">
          <span
            class="product_number_minus"
            @click="
              () => {
                changeCartItemInfo(shopId, shopTitle, item.id, item, -1);
              }
            "
            >-</span
          >
          <!-- {{ cartList?.[shopId]?.[item.id]?.count || 0 }} -->
          {{ cartList?.[shopId]?.pId?.[item.id]?.count || 0 }}
          <!-- 0 -->
          <!-- <span
            class="product_number_plus"
            @click="
              () => {
                addItemToCart(shopId, item.id, item);
              }
            "
            >+</span
          > -->
          <span
            class="product_number_plus"
            @click="
              () => {
                changeCartItemInfo(shopId, shopTitle, item.id, item, 1);
              }
            "
            >+</span
          >
        </div>
      </div>

      <!-- <div class="product_item">
        <img
          class="product_item_img"
          src="http://webapi.hanmaweilai.com/public/static/images/near.png"
        />
        <div class="product_item_detail">
          <h4 class="product_item_title">番茄250g/份</h4>
          <p class="product_item_sales">月售10件</p>
          <p class="product_item_price">
            <span class="product_item_yen">&yen;</span>33.6
            <span class="product_item_origin">&yen;66.6</span>
          </p>
        </div>
        <div class="product_number">
          <span class="product_number_minus">-</span>
          <span class="product_number_plus">+</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";

// import { reactive, toRefs } from "vue";

import { useRoute } from "vue-router";
import request from "../../utils/request";
// import { useStore } from "vuex";

import { useCommonCartEffect } from "./CommonCartEffect";

const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" },
  { name: "休闲食品", tab: "food" },
  { name: "时令蔬菜", tab: "greens" },
  { name: "肉蛋家禽", tab: "meat" },
];
// tab切换逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleCategoryClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleCategoryClick };
};
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  // const route = useRoute();
  // const shopId = route.params.id;
  const data = reactive({ contentList: [] });
  const getContentData = async () => {
    const result = await request.get(`/api/v1/product/${shopId}`, {
      tab: currentTab.value,
    });
    if (result.msg == "ok") {
      data.contentList = result.data;
    }
  };
  // 无需指定监听属性，当currentTab.value变更，这个回调都会执行
  watchEffect(() => {
    getContentData();
  });
  const { contentList } = toRefs(data);
  return { contentList };
};

// 购物车相关逻辑
// const useCartEffect = () => {
//   const store = useStore();
//   const { cartList } = toRefs(store.state);

// const addItemToCart = (shopId, productId, productInfo) => {
//   console.log(shopId, productId, productInfo);

//   store.commit("addItemToCart", {
//     shopId,
//     productId,
//     productInfo,
//   });
// };

// const changeCartItemInfo = (shopId, productId, productInfo, num) => {
//   store.commit("changeCartItemInfo", {
//     shopId,
//     productId,
//     productInfo,
//     num,
//   });
// };

// return { cartList, addItemToCart };

//   return { cartList, changeCartItemInfo };
// };

export default {
  name: "Content",
  setup() {
    // const categories = [
    //   { name: "全部商品", tab: "all" },
    //   { name: "秒杀", tab: "seckill" },
    //   { name: "新鲜水果", tab: "fruit" },
    //   { name: "休闲食品", tab: "food" },
    //   { name: "时令蔬菜", tab: "greens" },
    //   { name: "肉蛋家禽", tab: "meat" },
    // ];

    // const data = reactive({
    //   currentTab: categories[0].tab,

    //   contentList: [],
    // });
    // const handleCategoryClick = (tab) => {
    //   data.currentTab = tab;

    //   getContentData(tab);
    // };

    // const route = useRoute();
    // const getContentData = async (tab) => {
    //   const result = await request.get(`/api/v1/product/${route.params.id}`, {
    //     tab: tab,
    //   });
    //   if (result.msg == "ok") {
    //     data.contentList = result.data;
    //   }
    // };
    // getContentData("all");
    // const { currentTab, contentList } = toRefs(data);

    // const { currentTab } = toRefs(data);

    const route = useRoute();
    const shopId = route.params.id;

    const shopTitle = route.query.plan;

    const { currentTab, handleCategoryClick } = useTabEffect();
    const { contentList } = useCurrentListEffect(currentTab, shopId);

    // const { cartList, addItemToCart } = useCartEffect();
    // const { cartList, changeCartItemInfo } = useCartEffect();
    const { cartList, changeCartItemInfo } = useCommonCartEffect();

    return {
      categories,
      currentTab,
      handleCategoryClick,

      contentList,

      cartList,
      shopId,
      // addItemToCart,
      changeCartItemInfo,

      shopTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background: $search-bgColor;
  &_item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 14px;
    color: #333;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &_detail {
      overflow: hidden;
    }
    &_img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &_title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &_sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontColor;
    }
    &_price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &_yen {
      font-size: 0.12rem;
    }
    &_origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product_number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &_minus,
      &_plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &_minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &_plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>