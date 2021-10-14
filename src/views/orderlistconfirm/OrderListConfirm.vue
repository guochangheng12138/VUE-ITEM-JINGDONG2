<template>
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
        <div class="wrapper_content_productlist_shoptitle">{{ shopTitle }}</div>

        <div
          class="wrapper_content_productlist_item"
          v-for="(item, index) in productItemTotoal"
          :key="index"
        >
          <img
            class="wrapper_content_productlist_item_img"
            :src="item.img_url"
          />
          <div class="wrapper_content_productlist_item_flex">
            <div class="wrapper_content_productlist_item_flex_name22price">
              <div
                class="wrapper_content_productlist_item_flex_name22price_name"
              >
                {{ item.name }}
              </div>
              <div
                class="wrapper_content_productlist_item_flex_name22price_price"
              >
                &yen;{{ item.price }}&nbsp;x&nbsp;{{ item.count }}
              </div>
            </div>
            <div class="wrapper_content_productlist_item_flex_sums">
              &yen;{{ item.total }}
            </div>
          </div>
        </div>

        <!-- <div class="gouwuche_content_zongji">
          <div class="gouwuche_content_zongji_total">
            <div class="gouwuche_content_zongji_total_num">
              共计{{ items.count }}件/
            </div>
            <div class="gouwuche_content_zongji_total_price">
              {{ items.counts }}元
            </div>
          </div>
          <div class="gouwuche_content_zongji_font">去结算</div>
        </div> -->
      </div>
    </div>

    <div class="wrapper_under">
      <div class="wrapper_under_money">实付金额：&yen;{{ price }}</div>
      <div class="wrapper_under_sub" @click="handleProductsSubmit">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
import AddressSelect from "./AddressSelect";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import request from "../../utils/request";

const useProductListEffect = () => {
  const route = useRoute();
  const store = useStore();

  const shopId = route.params.id;
  const cartList = store.state.cartList;

  // 单个商品总价格
  const productItemTotoal = computed(() => {
    const productlist = cartList[shopId].pId;
    if (productlist) {
      const products = []; // 订单商品列表
      for (let i in productlist) {
        const productIT = productlist[i];
        productIT.total = productIT.count * productIT.price;
        // 订单商品列表
        products.push({ id: parseInt(productIT.id, 10), num: productIT.count });
      }
      localStorage.products = JSON.stringify(products);
    }
    return productlist;
  });
  // 全部订单商品总价格
  const price = computed(() => {
    const productlist = cartList[shopId].pId;
    let count = 0;
    if (productlist) {
      for (let i in productlist) {
        const product = productlist[i];
        count += product.count * product.price;
      }
    }
    return count.toFixed(2);
  });

  return { productItemTotoal, price };
};
// 订单提交逻辑
const useProductsConfirmSubmitEffect = () => {
  const route = useRoute();
  const router = useRouter();

  const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
  const DefaultAddressId = JSON.parse(localStorage.getItem("DefaultAddressId"));
  const shopId = Number(route.params.id);
  const shopName = route.query.plan;
  const products = JSON.parse(localStorage.getItem("products"));

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
        router.push({ name: "OrderList" });
      }
    } catch (e) {
      console.log("提交订单失败");
    }
  };

  return { handleProductsSubmit };
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
    const { productItemTotoal, price } = useProductListEffect();
    const { handleProductsSubmit } = useProductsConfirmSubmitEffect();
    return {
      handleBackClick,
      shopTitle,
      productItemTotoal,
      price,

      handleProductsSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  overflow-y: auto;
  background: $search-bgColor;
  padding: 0.01rem;
  height: 5.65rem;
  &_title {
    background: rgb(13, 45, 223);
    height: 1.7rem;
    font-size: 0.2rem;
    display: flex;
    color: white;
    padding-top: 0.2rem;
    &_icon {
      font-size: 0.3rem;
    }
    &_font {
      width: 80%;
      text-align: center;
    }
  }
  &_content {
    &_productlist {
      margin-top: 0.1rem;
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
        &_img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.35rem;
        }
        &_flex {
          display: flex;
          font-size: 0.18rem;
          &_name22price {
            padding-right: 1.2rem;
            width: 20%;
            &_name {
              margin-bottom: 0.1rem;
            }
            &_price {
              color: $hightlight-fontColor;
            }
          }
          &_sums {
            padding-top: 0.28rem;
          }
        }
      }
    }
  }
  &_under {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    font-size: 0.15rem;
    line-height: 0.5rem;
    border-top: solid rgb(200, 220, 236) 0.01rem;
    height: 0.5rem;
    &_money {
      width: 70%;
      padding-left: 0.2rem;
    }
    &_sub {
      width: 30%;
      color: white;
      background: rgb(81, 5, 143);
      text-align: center;
    }
  }
}
</style>