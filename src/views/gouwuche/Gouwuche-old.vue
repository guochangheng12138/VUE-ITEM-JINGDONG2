<template>
  <div class="wrapper">
    <div>我的全部购物车：{{ qsum.num }}</div>

    <div v-for="item5s in productList" :key="item5s.id">
      <div class="gouwuche_content_shoptitle">{{ item5s.title }}</div>
      <div
        class="gouwuche_content_item"
        v-for="item in item5s.pId"
        :key="item.id"
        v-show="item.count != 0"
      >
        <img :src="item.img_url" alt="" class="gouwuche_content_item_img" />
        <div class="gouwuche_content_item_name">{{ item.name }}</div>
        <div class="gouwuche_content_item_price">{{ item.price }}</div>
        <div class="gouwuche_content_item_total">{{ item.count }}</div>
        <div class="gouwuche_content_item_sums">
          {{ item.totalprice }}
        </div>
      </div>
      <div>{{ total.number }}</div>
      <div>{{ total.number }}</div>
      <div>去结算</div>
      <div>---------------------------------------------</div>
    </div>
    <!-- <div class="gouwuche_jiesuan">
      <div class="gouwuche_jiesuan_price">{{ price.counts }}</div>
      <div class="gouwuche_jiesuan_total">{{ total.count }}</div>
      <div>去结算</div>
    </div> -->
  </div>
  <Docker />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Docker from "../home/Docker.vue";

const useCartEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;

  const productList = computed(() => {
    const productList = cartList;
    return productList;
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
    return { num };
  });

  // 全部订单商品总数量
  const total = computed(() => {
    const productLists = cartList;
    let count = 0;
    if (productLists) {
      for (let i in productLists) {
        const productList = productLists[i].pId;
        let number = 0;
        for (let j in productList) {
          const product = productList[j];
          count += product.count;
          number += product.count;
        }
        return { number };
      }
    }
    return { count };
  });

  // 全部订单商品总价格
  const price = computed(() => {
    const productLists = cartList;
    let counts = 0;
    if (productLists) {
      for (let i in productLists) {
        const productList = productLists[i].pId;
        for (let j in productList) {
          const product = productList[j];
          counts += product.count * product.price;
        }
      }
    }
    return { counts };
  });

  return {
    productList,
    qsum,
    total,
    price,
  };
};

export default {
  name: "Gouwuche",
  components: { Docker },

  setup() {
    const { productList, qsum, total, price } = useCartEffect();
    console.log(productList);
    return {
      productList,
      qsum,
      total,
      price,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
}
.gouwuche_content_item {
  border: solid;
}
.gouwuche_content_item_img {
  width: 0.2rem;
  height: 0.2rem;
}
.gouwuche_content_shoptitle {
  font-size: 0.2rem;
}
</style>