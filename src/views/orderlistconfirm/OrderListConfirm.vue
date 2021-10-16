<template>
  <div>
    <div>
      <div class="mask" v-if="showPopup"></div>
      <div class="showPopup iconfont" v-if="showPopup">
        <div class="showPopup_gg" @click="handleToastShutdown">&#xe604;</div>
        <div class="showPopup_rr">&#xe62f;</div>
        <div class="showPopup_font">支付成功,等待配送</div>
      </div>
      <div class="wrapper">
        <div class="wrapper_title">
          <div class="wrapper_title_icon iconfont" @click="handleBackClick">
            &#xe612;
          </div>
          <div class="wrapper_title_font">确认订单</div>
        </div>
        <div class="wrapper_content">
          <AddressSelect />

          <div class="wrapper_content_productlist">
            <div class="wrapper_content_productlist_shoptitle">
              {{ shopTitle }}
            </div>

            <div
              class="wrapper_content_productlist_item"
              v-for="(item, index) in productlist.value"
              :key="index"
              v-show="item.count != 0"
            >
              <img
                class="wrapper_content_productlist_item_img"
                :src="item.img_url"
              />
              <div class="wrapper_content_productlist_item_flex">
                <div class="wrapper_content_productlist_item_flex_name22price">
                  <div
                    class="
                      wrapper_content_productlist_item_flex_name22price_name
                    "
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="
                      wrapper_content_productlist_item_flex_name22price_price
                    "
                  >
                    &yen;{{ item.price }}&nbsp;x&nbsp;{{ item.count }}
                  </div>
                </div>
                <div class="wrapper_content_productlist_item_flex_sums">
                  &yen;{{ item.total }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="under">
        <div class="money">实付金额：&yen;{{ count }}</div>
        <div class="sub" @click="handleProductsSubmit">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressSelect from "./AddressSelect";

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import request from "../../utils/request";
import { ref } from "vue";

const useProductListEffect = () => {
  const route = useRoute();
  const shopId = route.params.id;

  const cartList = JSON.parse(localStorage.getItem("carList"));
  const OrderList = JSON.parse(localStorage.getItem("userOrderLists"));

  // 单个商品总价格
  const productlist = {};
  const productItemTotoal = () => {
    if (localStorage.OrderListsubmit !== "true") {
      productlist.value = cartList[shopId].pId;
      if (productlist.value) {
        const products = []; // 订单商品列表
        for (let i in productlist.value) {
          const productIT = productlist.value[i];
          productIT.total = productIT.count * productIT.price;
          // 订单商品列表
          if (productIT.count !== 0) {
            products.push({
              id: parseInt(productIT.id, 10),
              num: productIT.count,
            });
          }
        }
        localStorage.products = JSON.stringify(products);
      }
    } else {
      const index = route.query.index;
      productlist.value = OrderList[index].products;
      if (productlist.value) {
        const products = []; // 订单商品列表
        for (let i in productlist.value) {
          const productIT = productlist.value[i];
          productIT.total = productIT.count * productIT.price;
          // 订单商品列表
          products.push({
            id: parseInt(productIT.id, 10),
            num: productIT.count,
          });
        }
        localStorage.products = JSON.stringify(products);
      }
    }
  };
  // 全部订单商品总价格
  let count = ref(0);
  const price = () => {
    if (localStorage.OrderListsubmit !== "true") {
      productlist.value = cartList[shopId].pId;
      if (productlist.value) {
        for (let i in productlist.value) {
          const product = productlist.value[i];
          count.value += product.count * product.price;
        }
      }
    } else {
      const index = route.query.index;
      productlist.value = OrderList[index].products;
      if (productlist.value) {
        for (let i in productlist.value) {
          const product = productlist.value[i];
          count.value += product.count * product.price;
        }
      }
    }
  };

  return { productItemTotoal, productlist, price, count };
};
// 订单提交逻辑
const useProductsConfirmSubmitEffect = () => {
  const route = useRoute();
  const router = useRouter();

  const store = useStore();

  const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
  const DefaultAddressId = JSON.parse(localStorage.getItem("DefaultAddressId"));
  const shopId = Number(route.params.id);
  const shopName = route.query.plan;
  const products = JSON.parse(localStorage.getItem("products"));

  // 弹窗
  const showPopup = ref(false);

  const handleProductsSubmit = async () => {
    try {
      const result = await request.post("/api/v1/create/", {
        id: userinfo.id,
        addressId: DefaultAddressId,
        shopId: shopId,
        shopName: shopName,
        products: JSON.stringify(products),
      });
      if (result.msg == "ok") {
        showPopup.value = !showPopup.value;
        // 清空购物车
        store.commit("clearCartProducts", { shopId });
      }
    } catch (e) {
      console.log("提交订单失败");
    }
  };

  // 关闭弹窗
  const handleToastShutdown = () => {
    showPopup.value = !showPopup.value;
    router.push({ name: "OrderList" });
  };

  return { handleProductsSubmit, showPopup, handleToastShutdown };
};

// 返回按钮
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  name: "OrderListConfirm",
  components: {
    AddressSelect,
  },
  setup() {
    const route = useRoute();
    const shopTitle = route.query.plan;

    const { handleBackClick } = useBackRouterEffect();
    const { productItemTotoal, price, productlist, count } =
      useProductListEffect();
    productItemTotoal();
    price();
    const { handleProductsSubmit, showPopup, handleToastShutdown } =
      useProductsConfirmSubmitEffect();

    return {
      handleBackClick,
      shopTitle,
      productItemTotoal,
      productlist,
      price,
      count,

      handleProductsSubmit,
      showPopup,
      handleToastShutdown,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 199;
}
.showPopup {
  z-index: 199;
  position: fixed;
  width: 60%;
  height: 1.5rem;
  left: 20%;
  transform: translateX(2.5rem);
  top: 50%;
  transform: translateY(-1rem);
  background: white;
  border-radius: 0.1rem;
  &_gg {
    font-size: 0.3rem;
    text-align: right;
  }
  &_rr {
    font-size: 0.6rem;
    text-align: center;
    height: 50%;
  }
  &_font {
    font-size: 0.2rem;
    text-align: center;
  }
}
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  overflow-y: auto;
  background: $search-bgColor;
  padding: 0.01rem;
  &_title {
    background: rgb(13, 45, 223);
    height: 1.7rem;
    font-size: 0.2rem;
    display: flex;
    color: white;
    padding-top: 0.2rem;
    &_icon {
      position: absolute;
      font-size: 0.3rem;
    }
    &_font {
      width: 100%;
      text-align: center;
    }
  }
  &_content {
    &_productlist {
      margin-top: 0.75rem;
      font-size: 0.15rem;
      background: $bgColor;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      border-radius: 0.1rem;
      &_shoptitle {
        font-size: 0.2rem;
        padding-top: 0.1rem;
        padding-left: 0.1rem;
        padding-bottom: 0.05rem;
      }
      &_item {
        display: flex;
        padding: 0.1rem 0.1rem 0.1rem 0.1rem;
        width: 100％;
        &_img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.35rem;
        }
        &_flex {
          display: flex;
          font-size: 0.18rem;
          flex: 1;
          &_name22price {
            flex: 1;
            padding-right: 1.2rem;
            &_name {
              margin-bottom: 0.1rem;
            }
            &_price {
              color: $hightlight-fontColor;
            }
          }
          &_sums {
            padding-top: 0.28rem;
            text-align: right;
          }
        }
      }
    }
  }
}
.under {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  font-size: 0.15rem;
  line-height: 0.5rem;
  border-top: solid rgb(200, 220, 236) 0.01rem;
  height: 0.5rem;
  background: white;
  z-index: 55;
}
.money {
  width: 70%;
  padding-left: 0.2rem;
}
.sub {
  width: 30%;
  color: white;
  background: rgb(81, 5, 143);
  text-align: center;
  border: solid;
}
</style>