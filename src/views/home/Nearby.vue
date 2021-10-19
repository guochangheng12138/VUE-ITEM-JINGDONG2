<template>
  <!-- 主体内容 -->
  <div class="nearby">
    <h3 class="nearby_title">附近店铺</h3>

    <!-- <router-link
      :to="`/shop/${item.id}`"
      v-for="item in nearbyList"
      :key="item._id"
    > -->
    <router-link
      :to="{ path: `/shop/${item.id}`, query: { plan: `${item.title}` } }"
      v-for="item in nearbyList"
      :key="item._id"
    >
      <ShopInfo :item="item" />
    </router-link>

    <!-- <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" /> -->

    <!-- <div class="nearby_item" v-for="item in nearbyList" :key="item.id">
      <img :src="item.imgUrl" alt="" class="nearby_item_img" />
      <div class="nearby_content">
        <div class="nearby_content_title">{{ item.title }}</div>
        <div class="nearby_content_tags">
          <span
            class="nearby_content_tag"
            v-for="(innerItem, innerIndex) in item.tags"
            :key="innerIndex"
            >{{ innerItem }}</span
          >

          <span class="nearby_content_tag">月售：</span>
          <span class="nearby_content_tag">起送：</span>
          <span class="nearby_content_tag">基础运费：</span>
        </div>
        <p class="nearby_content_highlight">{{ item.desc }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import request from "../../utils/request";

import ShopInfo from "../../components/ShopInfo.vue";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await request.get("/api/v1/hotShops", { state: 1 });
    if (result.msg == "ok") {
      // console.log(result);
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearbyList };
};

export default {
  name: "Nearby",

  components: { ShopInfo },

  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList };

    // const nearbyList = [
    //   {
    //     id: 1,
    //     imgUrl: "http://webapi.hanmaweilai.com/public/static/images/near.png",
    //     title: "沃尔玛",
    //     tags: ["月售1万+", "起送￥0", "基础运费￥5"],
    //     desc: "VIP尊享满89元减4元运费券（每月3张）",
    //   },
    //   {
    //     id: 2,
    //     imgUrl: "http://webapi.hanmaweilai.com/public/static/images/near.png",
    //     title: "沃尔玛",
    //     tags: ["月售1万+", "起送￥0", "基础运费￥5"],
    //     desc: "VIP尊享满89元减4元运费券（每月3张）",
    //   },
    //   {
    //     id: 3,
    //     imgUrl: "http://webapi.hanmaweilai.com/public/static/images/near.png",
    //     title: "沃尔玛",
    //     tags: ["月售1万+", "起送￥0", "基础运费￥5"],
    //     desc: "VIP尊享满89元减4元运费券（每月3张）",
    //   },
    // ];
    // return { nearbyList };
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/variables.scss";

// 主体内容
.nearby {
  &_title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontColor;
  }
  &_item {
    display: flex;
    padding-top: 0.12rem;
    &_img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &_content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 1px solid $content-bgColor;

    &_title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-bgColor;
    }
    &_tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontColor;
    }
    &_tag {
      margin-right: 0.16rem;
    }
    &_hightlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
  a {
    text-decoration: none;
  }
}
</style>