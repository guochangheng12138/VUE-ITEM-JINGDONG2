<template>
  <div class="wrapper">
    <div class="wrapper_title">我的订单</div>
    <div
      v-for="items in productListall"
      :key="items.id"
      v-show="items.count != 0"
      class="gouwuche_content"
    >
      <div class="gouwuche_content_font">
        <div class="gouwuche_content_font_shoptitle">{{ items.title }}</div>
        <div class="gouwuche_content_font_pay">未支付</div>
      </div>
      <div class="gouwuche_content_item">
        <div class="gouwuche_content_item_bl">
          <div
            class="gouwuche_content_item_bl_li"
            v-for="item in items.pId"
            :key="item.id"
          >
            <img
              :src="item.img_url"
              alt=""
              class="gouwuche_content_item_bl_li_img"
            />
          </div>
        </div>
        <div class="gouwuche_content_item_cp">
          <div class="gouwuche_content_item_cp_price">
            &yen;{{ items.counts }}
          </div>
          <div class="gouwuche_content_item_cp_num">共{{ items.count }}件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import Docker from "../home/Docker.vue";

import { computed } from "vue";
import { useStore } from "vuex";
import request from "../../utils/request";

// 本地购物车请求逻辑
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

  return {
    productListall,
  };
};

// 用户在线订单请求逻辑
// const userOrderList = ref({});
const userOrderList = {};
const usegetOrderListEffect = () => {
  const getOrderList = async () => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
    const result = await request.get("/api/v1/orders/" + userinfo.id);
    if (result.msg == "ok") {
      userOrderList.value = result.data;

      console.log(result.data[1]);
      console.log(userOrderList.value[1]);

      console.log(userOrderList);
      console.log(result.data);
      // console.log(typeof result.data);
      // console.log(result.data[1].products);
      // console.log(typeof userOrderList);
      // localStorage.setItem("useraddress", JSON.stringify(result.data));
    } else {
      // localStorage.setItem("useraddress", {});
      console.log("订单不存在");
    }
  };
  return { getOrderList };
};

export default {
  name: "OrderList",
  components: { Docker },

  setup() {
    const { productListall } = useCartEffect();
    const { getOrderList } = usegetOrderListEffect();
    getOrderList();
    return {
      productListall,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
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
  background: white;
  width: 90%;
  margin: 0.15rem auto 0.15rem;
  border-radius: 0.1rem;
  &_font {
    display: flex;
    padding-top: 0.2rem;
    margin-bottom: 0.1rem;
    font-size: 0.2rem;
    &_shoptitle {
      width: 80%;
      margin-left: 0.1rem;
    }
    &_pay {
      width: 20%;
      color: $content-bgColor;
      font-size: 0.17rem;
    }
  }
  &_item {
    display: flex;
    &_bl {
      display: flex;
      width: 80%;
      margin-left: 0.1rem;

      &_li {
        &_img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1rem;
        }
      }
    }
    &_cp {
      width: 20%;
      margin-bottom: 0.2rem;
      &_price {
        color: $hightlight-fontColor;
        margin-left: 0.1rem;
        margin-bottom: 0.05rem;
        font-size: 0.2rem;
      }
      &_num {
        margin-left: 0.1rem;
      }
    }
  }
}
</style>