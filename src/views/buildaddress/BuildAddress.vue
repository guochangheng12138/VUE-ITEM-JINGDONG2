<template>
  <div class="wrapper">
    <div class="wrapper_title">
      <div class="wrapper_title_back iconfont" @click="handleBackClick">
        &#xe612;
      </div>
      <div class="wrapper_title_font">新建收货地址</div>
      <div class="wrapper_title_build" @click="handleAddressSaveClick">
        保存
      </div>
    </div>
    <div class="wrapper_content">
      <input
        class="wrapper_content_item"
        type="text"
        placeholder="所在城市: 如山东省"
        v-model="city"
      />
      <input
        class="wrapper_content_item"
        type="text"
        placeholder="小区/大厦/学校: 如鲁商凤凰广场北区汉码未来"
        v-model="area"
      />
      <input
        class="wrapper_content_item"
        type="text"
        placeholder="楼号-门牌号: 如1号楼601"
        v-model="house"
      />
      <input
        class="wrapper_content_item"
        type="text"
        placeholder="收货人: 请填写收货人姓名"
        v-model="real_name"
      />
      <input
        class="wrapper_content_item"
        type="text"
        placeholder="联系电话: 请填写收货人电话"
        v-model="mobile"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { toRefs } from "vue";
import request from "../../utils/request";

// 用户地址新建逻辑
const useAddressSaveEffect = () => {
  const router = useRouter();

  const data = reactive({
    city: "",
    area: "",
    house: "",
    real_name: "",
    mobile: "",
  });

  const handleAddressSaveClick = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
      const result = await request.post("/api/v1/addAddress/" + userinfo.id, {
        city: data.city,
        area: data.area,
        house: data.house,
        real_name: data.real_name,
        mobile: data.mobile,
      });
      if (result.msg == "ok") {
        router.push({ name: "ManagementAddress" });
      }
    } catch (e) {
      console.log("请求失败");
    }
  };

  const { city, area, house, real_name, mobile } = toRefs(data);

  return { city, area, house, real_name, mobile, handleAddressSaveClick };
};

// 返回按钮
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push({ name: "ManagementAddress" });
  };
  return { handleBackClick };
};

export default {
  name: "BuildAddress",
  setup() {
    const { city, area, house, real_name, mobile, handleAddressSaveClick } =
      useAddressSaveEffect();
    const { handleBackClick } = useBackRouterEffect();

    return {
      city,
      area,
      house,
      real_name,
      mobile,
      handleAddressSaveClick,
      handleBackClick,
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
  height: 6.5rem;
  &_title {
    width: 100%;
    font-size: 0.22rem;
    text-align: center;
    padding-top: 0.15rem;
    padding-bottom: 0.22rem;
    background: $bgColor;
    display: flex;
    font-size: 0.18rem;
    &_back {
      width: 10%;
      font-size: 0.28rem;
    }
    &_font {
      width: 75%;
    }
    &_build {
      width: 15%;
    }
  }
  &_content {
    margin: 0.15rem auto 0;
    &_item {
      width: 95%;
      margin-bottom: 0.1rem;
      margin-left: 0.05rem;
      height: 0.4rem;
      border: none;
    }
  }
}
</style>