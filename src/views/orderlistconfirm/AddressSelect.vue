<template>
  <div class="wrappers" @click="SelectDefaultAddress">
    <div class="wrappers_title">收货地址</div>
    <div class="wrappers_content">
      <div class="wrappers_content_address">
        {{ defaultAddress.city }}{{ defaultAddress.area
        }}{{ defaultAddress.house }}
      </div>
      <div class="wrappers_content_namemobile">
        {{ defaultAddress.real_name }} {{ defaultAddress.mobile }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import request from "../../utils/request";

const userAddressSekectEffect = () => {
  const router = useRouter();

  const defaultAddress = ref([]);

  const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
  // 获取默认地址逻辑
  const getDefaultAddress = async () => {
    if (
      localStorage.isDefaultAddress == "true" ||
      !localStorage.isDefaultAddress
    ) {
      try {
        const result = await request.get(
          "/api/v1/defaultaddress/" + userinfo.id
        );
        if (result.msg == "ok") {
          // res修改值必须加value;
          defaultAddress.value = result.data;
        }
      } catch (e) {
        console.log(e);
        console.log("默认地址不存在");
      }
    } else {
      defaultAddress.value = [];
    }
  };
  // 点击进入默认地址选择界面逻辑
  const SelectDefaultAddress = () => {
    router.push({ name: "ManagementAddress" });
    // 设置进入地址管理界面，点击每个地址后的跳转校验参数
    localStorage.AddressSelect = false;
  };

  return { getDefaultAddress, SelectDefaultAddress, defaultAddress };
};

export default {
  name: "AddressSelect",
  setup() {
    const { getDefaultAddress, SelectDefaultAddress, defaultAddress } =
      userAddressSekectEffect();
    getDefaultAddress();
    return { getDefaultAddress, SelectDefaultAddress, defaultAddress };
  },
};
</script>

<style lang="scss" scoped>
.wrappers {
  position: absolute;
  top: 1.4rem;
  width: 90%;
  border-radius: 0.1rem;
  left: 5%;
  background-color: white;
  border: white;
  &_title {
    font-size: 0.2rem;
    padding-top: 0.1rem;
    padding-left: 0.1rem;
    padding-bottom: 0.1rem;
    height: 0.25rem;
  }
  &_content {
    font-size: 0.15rem;
    padding-left: 0.1rem;
    padding-bottom: 00.1rem;
    height: 0.5rem;
    &_address {
      padding-bottom: 0.1rem;
    }
    &_namemobile {
      margin-bottom: 0.1rem;
    }
  }
}
</style>