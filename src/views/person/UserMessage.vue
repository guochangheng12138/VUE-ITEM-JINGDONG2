<template>
  <div class="wrapper">
    <div class="wrapper_title">
      <div class="wrapper_title_back iconfont" @click="handleBackClick">
        &#xe612;
      </div>
      <div class="wrapper_title_font">编辑基本信息</div>
      <div class="wrapper_title_build" @click="handleUserSaveClick">保存</div>
    </div>
    <div class="wrapper_content">
      <div class="wrapper_content_items">
        <div class="wrapper_content_items_info">昵称:</div>
        <input
          class="wrapper_content_items_item"
          type="text"
          placeholder="hanmaweilai"
          v-model="nickname"
        />
      </div>
      <div class="wrapper_content_items">
        <div class="wrapper_content_items_info">电话:</div>
        <input
          class="wrapper_content_items_item"
          type="text"
          placeholder="18854632587"
          v-model="mobile"
        />
      </div>
      <div class="wrapper_content_items">
        <div class="wrapper_content_items_info">密码:</div>
        <input
          class="wrapper_content_items_item"
          type="text"
          placeholder="........"
          v-model="password"
        />
      </div>
      <div class="wrapper_content_items">
        <div class="wrapper_content_items_info">确认密码:</div>
        <input
          class="wrapper_content_items_item"
          type="text"
          placeholder="........."
          v-model="repassword"
        />
      </div>
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { toRefs } from "vue";

import request from "../../utils/request";

// 保存编辑后的用户信息
const useUserSaveEffect = (showToast) => {
  const data = reactive({
    nickname: "",
    mobile: "",
    password: "",
    repassword: "",
  });

  const router = useRouter();
  const handleUserSaveClick = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
      if (
        password.value.length > 0 &&
        password.value.length > 0 &&
        nickname.value.length > 0
      ) {
        if (password.value == repassword.value) {
          const result = await request.post("/api/v1/saveUser/" + userinfo.id, {
            username: userinfo.username,
            nickname: data.nickname,
            mobile: data.mobile,
            password: data.password,
          });
          if (result.msg == "ok") {
            localStorage.userinfo = JSON.stringify(result.data);
            router.push({ name: "Person" });
          } else {
            showToast(result.msg);
          }
        } else {
          showToast("密码不一致");
        }
      } else {
        showToast("姓名、电话或密码不能为空");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };

  const { nickname, mobile, password, repassword } = toRefs(data);

  return { nickname, mobile, password, repassword, handleUserSaveClick };
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
  name: "UserMessage",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();

    const { nickname, mobile, password, repassword, handleUserSaveClick } =
      useUserSaveEffect(showToast);

    const { handleBackClick } = useBackRouterEffect();

    return {
      nickname,
      mobile,
      password,
      repassword,
      handleUserSaveClick,
      handleBackClick,
      show,
      toastMessage,
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
    &_items {
      background: $bgColor;
      display: flex;
      width: 95%;
      margin-bottom: 0.1rem;
      margin-left: 0.05rem;
      height: 0.4rem;
      &_info {
        font-size: 0.15rem;
        line-height: 0.4rem;
      }
      &_item {
        margin-left: 0.1rem;
        border: none;
        outline: none;
        width: 75%;
      }
    }
  }
}
</style>