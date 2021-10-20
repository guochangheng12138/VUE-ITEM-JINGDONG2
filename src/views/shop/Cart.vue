<template>
  <div>
    <div
      class="mask"
      @click="handleCartShowChange"
      v-if="showCart && total > 0"
    ></div>
    <div class="cart">
      <div class="product" v-if="showCart && total > 0">
        <div class="product_header">
          <div
            class="product_header_all"
            @click="
              () => {
                setCartItemsChecked(shopId);
              }
            "
          >
            <span
              class="product_header_icon iconfont"
              v-html="allChecked ? '&#xe602;' : '&#xe603;'"
            ></span
            >全选
          </div>
          <div class="product_header_clear">
            <span
              class="product_header_clear_btn"
              @click="
                () => {
                  clearCartProducts(shopId);
                }
              "
              >清空购物车</span
            >
          </div>
        </div>
        <template v-for="item in productList" :key="item.id">
          <div class="product_item" v-if="item.count > 0">
            <div
              class="product_item_checked iconfont"
              v-html="item.check ? '&#xe602;' : '&#xe603;'"
              @click="() => changeCartItemChecked(shopId, item.id)"
            ></div>
            <img :src="item.img_url" alt="" class="product_item_img" />
            <div class="product_item_detail">
              <h4 class="product_item_title">{{ item.name }}</h4>
              <p class="product_item_price">
                <span class="product_item_yen">&yen;</span>{{ item.price }}
                <span class="product_item_origin"
                  >&yen;{{ item.oldPrice }}</span
                >
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
              {{ item.count || 0 }}
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
        </template>
      </div>

      <div class="check">
        <div class="check_icon">
          <img
            src="http://webapi.hanmaweilai.com/public/static/images/basket.png"
            class="check_icon_img"
            @click="handleCartShowChange"
          />

          <div class="check_icon_tag">{{ total }}</div>
        </div>
        <div class="check_info">
          总计：<span class="check_info_price">&yen;{{ price }}</span>
        </div>
        <div class="check_btn" @click="handleProductsSubmit(shopId)">
          去结算
        </div>
        <!-- <router-link
          class="check_btn"
          :to="{
            path: `/orderlistconfirm/${shopId}`,
            query: { plan: `${shopTitle}` },
          }"
        >
          去结算
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

// import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { useCommonCartEffect } from "./CommonCartEffect";
import request from "../../utils/request";

// const useCartEffect = () => {
const useCartEffect = (shopId) => {
  // const router = useRouter();

  const store = useStore();
  // const route = useRoute();
  // const shopId = route.params.id;
  const cartList = store.state.cartList;

  const total = computed(() => {
    // const productList = cartList[shopId];
    // const productList = cartList[shopId].pId;
    const productList2 = cartList[shopId];
    let count = 0;
    if (productList2) {
      for (let i in productList2.pId) {
        const product = productList2.pId[i];
        count += product.count;
      }
    }
    return count;
  });
  const price = computed(() => {
    // const productList = cartList[shopId];
    // const productList = cartList[shopId].pId;
    const productList2 = cartList[shopId];

    let count = 0;
    if (productList2) {
      for (let i in productList2.pId) {
        const product = productList2.pId[i];
        // count += product.count * product.price;
        if (product.check) {
          count += product.count * product.price;
        }
      }
    }

    return count.toFixed(2);
  });

  const productList = computed(() => {
    // const productList = cartList[shopId] || [];
    const productList = cartList[shopId].pId || [];
    return productList;
  });
  const { changeCartItemInfo } = useCommonCartEffect();

  // 点击选中反选
  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };

  // 清空购物车
  const clearCartProducts = (shopId) => {
    store.commit("clearCartProducts", { shopId });
  };

  // 点击全选
  const allChecked = computed(() => {
    // const productList = cartList[shopId];
    const productList = cartList[shopId].pId;
    let result = true;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          result = false;
        }
      }
    }
    return result;
  });
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };

  // return { total, price };
  return {
    total,
    price,
    // shopId,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,

    clearCartProducts,

    allChecked,
    setCartItemsChecked,
    // shopTitle,
  };
};

// 结算提交订单并跳转逻辑
const useProductsConfirmSubmitEffect = () => {
  const router = useRouter();
  const store = useStore();

  const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
  const DefaultAddressId = JSON.parse(localStorage.getItem("DefaultAddressId"));

  const handleProductsSubmit = async (shopId) => {
    if (localStorage.isDefaultAddress) {
      const cartList = store.state.cartList;
      const shopName = cartList[shopId].title;

      const productlist = cartList[shopId].pId;
      const products = []; // 订单提交商品列表
      for (let i in productlist) {
        const productIT = productlist[i];
        // 订单商品列表
        if (productIT.count !== 0) {
          products.push({
            id: parseInt(productIT.id, 10),
            num: productIT.count,
          });
        }
      }

      try {
        const result = await request.post("/api/v1/create/", {
          id: userinfo.id,
          addressId: DefaultAddressId,
          shopId: shopId,
          shopName: shopName,
          products: JSON.stringify(products),
        });
        if (result.msg == "ok") {
          // 清空购物车
          store.commit("clearCartProducts", { shopId });
          // 跳转附带订单ID
          const orderlistno = result.data.order_no;
          router.push({
            path: `/orderlistconfirm/${orderlistno}`,
          });
        }
      } catch (e) {
        console.log("提交订单失败");
      }
    } else {
      router.push({
        name: "ManagementAddress",
      });
      localStorage.AddressSelect = false;
    }
  };

  return { handleProductsSubmit };
};

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    // const { total, price } = useCartEffect();

    const route = useRoute();
    const shopId = route.params.id;

    const shopTitle = route.query.plan;

    const {
      total,
      price,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,

      clearCartProducts,

      allChecked,
      setCartItemsChecked,
    } = useCartEffect(shopId);

    const { handleProductsSubmit } = useProductsConfirmSubmitEffect();

    const { showCart, handleCartShowChange } = toggleCartEffect();

    // return { total, price };
    return {
      total,
      price,
      shopId,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,

      clearCartProducts,

      allChecked,
      setCartItemsChecked,

      handleProductsSubmit,

      showCart,
      handleCartShowChange,

      shopTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

@import "../../style/mixins.scss";

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  // background: white;

  background: $bgColor;
  // z-index: 2;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  // z-index: 1;
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;

  &_icon {
    position: relative;
    width: 0.84rem;
    &_img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &_tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &_info {
    flex: 1;
    color: $content-fontColor;
    font-size: 0.12rem;
    &_price {
      line-height: 0.49rem;
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &_btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    color: #fff;
    font-size: 0.14rem;
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &_header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 1px solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontColor;
    &_all {
      width: 0.64rem;
      margin-left: 0.18rem;
    }
    &_icon {
      display: inline-block;
      margin-right: 0.1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &_clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &_btn {
        display: inline-block;
      }
    }
  }
  &_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &_checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &_detail {
      overflow: hidden;
    }
    &_img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &_title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &_price {
      margin: 0.06rem 0 0 0;
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
        margin-right: 00.05rem;
      }
      &_plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
a {
  text-decoration: none;
}
</style>