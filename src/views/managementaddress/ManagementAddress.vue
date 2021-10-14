<template>
  <div class="wrapper">
    <div class="wrapper_title">
      <div class="wrapper_title_back iconfont" @click="handleBackClick">
        &#xe612;
      </div>
      <div class="wrapper_title_font">管理收货地址</div>
      <div class="wrapper_title_build" @click="handleAddressBuildClick">
        新建
      </div>
    </div>
    <div class="wrapper_my">我的收货地址</div>
    <div
      class="wrapper_content"
      v-for="(item, index) in userAddressList"
      :key="index"
      @click="handleAddressEditeClick(index, `${item.id}`)"
    >
      <div class="wrapper_content_mes">
        <div class="wrapper_content_mes_nt">
          <div class="wrapper_content_mes_nt_name">{{ item.real_name }}</div>
          <div class="wrapper_content_mes_nt_tel">
            {{ item.mobile }}
          </div>
        </div>
        <div class="wrapper_content_mes_address">
          {{ item.city }}{{ item.area }}{{ item.house }}
        </div>
      </div>
      <div class="wrapper_content_go">
        <!-- ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ -->
        <!-- @click.stop与<div 含点击事件连用>,@click.prevent与<router-link to>连用 -->
        <!-- ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ -->
        <div
          class="wrapper_content_go_delete iconfont"
          @click.stop="handleAddressDeleteClick(`${item.id}`)"
        >
          &#xe8c1;
        </div>
        <div class="wrapper_content_go_in">></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import request from "../../utils/request";

// 新建地址按钮跳转
const useAddressBuildEffect = () => {
  const router = useRouter();
  const handleAddressBuildClick = () => {
    router.push({ name: "BuildAddress" });
  };
  return { handleAddressBuildClick };
};
// 返回按钮
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    if (localStorage.AddressSelect == "false") {
      router.back();
    } else {
      router.push({ name: "Person" });
    }
  };
  return { handleBackClick };
};
// 用户地址请求与删除与编辑逻辑
const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};

const useAddressListEffect = () => {
  const router = useRouter();
  // 用户地址请求与逻辑
  const userAddressList = ref([]);
  const getAddressList = async () => {
    const result = await request.get("/api/v1/address/" + userinfo.id);
    if (result.msg == "ok") {
      // res修改值必须加value;
      userAddressList.value = result.data;
      localStorage.setItem("useraddress", JSON.stringify(result.data));
    } else {
      localStorage.setItem("useraddress", {});
      console.log("地址不存在");
    }
  };
  // 用户地址删除逻辑
  const handleAddressDeleteClick = async (id) => {
    try {
      const result = await request.post("/api/v1/delAddress/" + userinfo.id, {
        id: id,
      });
      if (result.msg == "ok") {
        location.reload();
      }
    } catch (e) {
      console.log(e);
      console.log("删除地址失败");
    }
  };
  // 用户地址编辑或设置默认地址逻辑
  const handleAddressEditeClick = async (index, indexId) => {
    if (localStorage.AddressSelect == "true") {
      router.push({
        path: `/editingaddress/${index}`,
        query: { plan: indexId },
      });
    } else {
      try {
        const result = await request.post(
          "/api/v1/updateAddress/" + userinfo.id,
          {
            id: indexId,
            is_default: 1,
          }
        );
        if (result.msg == "ok") {
          localStorage.isDefaultAddress = true;
          localStorage.DefaultAddressId = indexId;
          router.back();
        }
      } catch (e) {
        console.log(e);
        console.log("提交默认地址失败");
      }
    }
  };

  return {
    userAddressList,
    getAddressList,
    handleAddressDeleteClick,
    handleAddressEditeClick,
  };
};

export default {
  name: "ManagementAddress",
  setup() {
    const { handleAddressBuildClick } = useAddressBuildEffect();
    const { handleBackClick } = useBackRouterEffect();
    const {
      userAddressList,
      getAddressList,
      handleAddressDeleteClick,
      handleAddressEditeClick,
    } = useAddressListEffect();

    getAddressList();

    return {
      handleAddressBuildClick,
      handleBackClick,
      userAddressList,
      handleAddressDeleteClick,
      handleAddressEditeClick,
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
  &_my {
    font-size: 0.15rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    margin-left: 0.1rem;
  }
  &_content {
    background: white;
    border-radius: 0.1rem;
    width: 90%;
    margin: 0.1rem auto;
    display: flex;
    font-size: 0.17rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    &_mes {
      width: 85%;
      &_nt {
        padding-left: 0.1rem;
        display: flex;
        margin-bottom: 0.1rem;
        &_name {
          padding-right: 0.1rem;
        }
      }
      &_address {
        padding-left: 0.1rem;
      }
    }
    &_go {
      width: 15%;
      &_delete {
        font-size: 0.2rem;
        margin-top: -0.1rem;
        padding-left: 0.2rem;
        height: 0.32rem;
      }
      &_in {
        padding-left: 0.3rem;
      }
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
}
</style>