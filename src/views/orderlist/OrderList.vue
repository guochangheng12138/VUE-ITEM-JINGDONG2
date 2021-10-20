<template>
  <div class="wrapper">
    <div class="wrapper_title">我的订单({{ num }})</div>
    <div
      v-for="(items, index) in userOrderLists"
      :key="index"
      v-show="items.count != 0"
      class="wrapper_order_gouwuche_content"
    >
      <div class="wrapper_order_gouwuche_content_font">
        <div class="wrapper_order_gouwuche_content_font_shoptitle">
          <div>{{ items.shop_name }}</div>
          <div class="wrapper_order_gouwuche_content_font_shoptitle_num">
            订单号:{{ items.order_no }}
          </div>
        </div>
        <div
          class="wrapper_order_gouwuche_content_font_pay"
          @click="handleOrderlistSubmit(items.order_no)"
        >
          {{ items.order_status }}
        </div>
      </div>
      <div class="wrapper_order_gouwuche_content_item">
        <div class="wrapper_order_gouwuche_content_item_bl">
          <div
            class="wrapper_order_gouwuche_content_item_bl_li"
            v-for="item in items.products"
            :key="item.id"
          >
            <img
              :src="item.img_url"
              alt=""
              class="wrapper_order_gouwuche_content_item_bl_li_img"
            />
          </div>
        </div>
        <div class="wrapper_order_gouwuche_content_item_cp">
          <div class="wrapper_order_gouwuche_content_item_cp_price">
            &yen;{{ items.totalprice }}
          </div>
          <div class="wrapper_order_gouwuche_content_item_cp_num">
            共{{ items.total }}件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import Docker from "../home/Docker.vue";
import { ref } from "vue";
import request from "../../utils/request";
import { useRouter } from "vue-router";
// import { computed } from "vue";
// import { useStore } from "vuex";

// 用户在线订单请求逻辑
const usegetOrderListEffect = () => {
  const userOrderLists = ref({});
  const num = ref(0);

  const getOrderList = async () => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
    const result = await request.get("/api/v1/orders/" + userinfo.id);
    if (result.msg == "ok") {
      userOrderLists.value = result.data;
      for (let i in userOrderLists.value) {
        const st = JSON.parse(userOrderLists.value[i].products);
        userOrderLists.value[i].products = st;
        num.value += 1;
        let total = 0;
        let totalprice = 0;
        for (let j in userOrderLists.value[i].products) {
          const Order = userOrderLists.value[i].products[j];
          total += Order.count;
          totalprice += Order.count * Order.price;
        }
        userOrderLists.value[i].total = total;
        userOrderLists.value[i].totalprice = totalprice;
      }
    } else {
      console.log("订单不存在");
    }
  };

  return { getOrderList, userOrderLists, num };
};
// 未支付跳转逻辑
const userOrderListsSubmitEffect = () => {
  const router = useRouter();
  const handleOrderlistSubmit = (order_no) => {
    router.push({
      path: `/orderlistconfirm/${order_no}`,
    });
    // 设置进入订单确认界面，点击每个订单后的跳转校验参数
  };
  return { handleOrderlistSubmit };
};

export default {
  name: "OrderList",
  components: { Docker },

  setup() {
    const { getOrderList, userOrderLists, num } = usegetOrderListEffect();
    getOrderList();
    const { handleOrderlistSubmit } = userOrderListsSubmitEffect();

    return {
      userOrderLists,
      num,
      handleOrderlistSubmit,
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
  &_order {
    &_gouwuche_content {
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
          display: flex;
          &_num {
            margin-left: 0.2rem;
            font-size: 0.1rem;
            line-height: 0.3rem;
            color: red;
          }
        }
        &_pay {
          text-align: right;
          width: 20%;
          padding-right: 00.1rem;
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
            text-align: right;
            padding-right: 00.1rem;
          }
          &_num {
            padding-right: 00.1rem;
            text-align: right;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>