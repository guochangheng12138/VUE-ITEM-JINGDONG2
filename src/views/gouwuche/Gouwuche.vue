<template>
  <div class="wrapper">
    <div class="wrapper_title">我的全部购物车：({{ qsum }})</div>

    <!-- <div
      v-for="items in productListall"
      :key="items.id"
      v-show="items.count != 0"
      class="gouwuche_content"
    > -->
    <div
      v-for="(items, index) in productListall"
      :key="index"
      v-show="items.count != 0"
      class="gouwuche_content"
    >
      <div class="gouwuche_content_shoptitle">{{ items.title }}</div>

      <div
        class="gouwuche_content_item"
        v-for="item in items.pId"
        :key="item.id"
        v-show="item.count != 0"
      >
        <img :src="item.img_url" alt="" class="gouwuche_content_item_img" />
        <div class="gouwuche_content_item_flex">
          <div class="gouwuche_content_item_flex_name22price">
            <div class="gouwuche_content_item_flex_name22price_name">
              {{ item.name }}
            </div>
            <div class="gouwuche_content_item_flex_name22price_price">
              &yen;{{ item.price }} x {{ item.count }}
            </div>
          </div>
        </div>
        <div class="gouwuche_content_item_sums">&yen;{{ item.total }}</div>
      </div>
      <div class="gouwuche_content_zongji">
        <div class="gouwuche_content_zongji_total">
          <div class="gouwuche_content_zongji_total_num">
            共计{{ items.count }}件/
          </div>
          <div class="gouwuche_content_zongji_total_price">
            {{ items.counts }}元
          </div>
        </div>
        <!-- <router-link
          class="gouwuche_content_zongji_font"
          :to="{
            path: `/orderlistconfirm/${index}`,
            query: { plan: `${items.title}` },
          }"
        >
          去结算
        </router-link> -->
        <div
          class="gouwuche_content_zongji_font"
          @click="handleProductsSubmit(index, items.title)"
        >
          去结算
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import request from "../../utils/request";

import Docker from "../home/Docker.vue";

const useCartEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;

  // 全部订单商品总价格
  const productListall = computed(() => {
    const productLists = cartList;

    if (productLists) {
      for (let i in productLists) {
        let count = 0;
        let counts = 0;
        const productList = productLists[i].pId;
        for (let j in productList) {
          const product = productList[j];
          counts += product.count * product.price;
          count += product.count;
          product.total = product.count * product.price;
        }
        productLists[i].count = count;
        productLists[i].counts = counts;
      }
    }

    return productLists;
  });

  // 购物车订单数量
  const qsum = computed(() => {
    const productLists = cartList;
    let num = 0;

    if (productLists) {
      for (let i in productLists) {
        const productList = productLists[i];
        for (let j in productList.pId) {
          const product = productList.pId[j];
          if (product.count != 0) {
            num += 1;
          }
          break;
        }
      }
    }

    return num;
    // 购物车订单数量,写法2-------------
    // return {num};
    // 此处返回带{}的num,渲染层数据使用{{qsum.num}},返回多个数据必须用打点
  });

  return {
    productListall,
    qsum,
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
          console.log(result);
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

export default {
  name: "Gouwuche",
  components: { Docker },

  setup() {
    const { productListall, qsum } = useCartEffect();
    const { handleProductsSubmit } = useProductsConfirmSubmitEffect();
    return {
      productListall,
      qsum,
      handleProductsSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  overflow-y: auto;
  background: $search-bgColor;
  padding: 0.02rem;
  &_title {
    width: 100%;
    font-size: 0.22rem;
    text-align: center;
    padding-top: 0.15rem;
    padding-bottom: 0.22rem;
    background: $bgColor;
  }
}
.gouwuche_content {
  margin-top: 0.1rem;
  font-size: 0.15rem;
  background: $bgColor;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  padding-bottom: 0.1rem;
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
      padding-right: 0.35rem;
    }
    &_flex {
      display: flex;
      font-size: 0.18rem;
      padding-bottom: 0.2rem;
      flex-grow: 1;
      &_name22price {
        &_name {
          margin-bottom: 0.1rem;
        }
        &_price {
          color: $hightlight-fontColor;
        }
      }
    }
    &_sums {
      padding-top: 0.28rem;
      width: 0.5rem;
    }
  }
  &_zongji {
    border: solid blue 0.01rem;
    font-size: 0.18rem;
    display: flex;
    &_total {
      display: flex;
      flex: 1;
      padding-left: 0.6rem;
      color: rgb(96, 96, 223);
    }
    &_font {
      margin-left: 0.38rem;
      width: 25%;
      color: white;
      background: rgb(96, 96, 223);
      text-align: center;
    }
  }
}
a {
  text-decoration: none;
}
</style>