<template>
  <div class="wrapper">
    <img
      src="http://webapi.hanmaweilai.com/public/static/images/user.png"
      alt=""
      class="wrapper_input"
    />
    <div class="wrapper_input">
      <!-- <input
        type="text"
        class="wrapper_input_content"
        placeholder="请输入手机号"
        v-model="data.username"
      /> -->

      <input
        type="text"
        class="wrapper_input_content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper_input">
      <!-- <input
        type="password"
        class="wrapper_input_content"
        placeholder="请输入密码"
        v-model="data.password"
      /> -->

      <input
        type="password"
        class="wrapper_input_content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper_input">
      <!-- <input
        type="password"
        class="wrapper_input_content"
        placeholder="确认密码"
        v-model="data.repassword"
      /> -->

      <input
        type="password"
        class="wrapper_input_content"
        placeholder="确认密码"
        v-model="repassword"
      />
    </div>
    <div class="wrapper_register-button" @click="handleRegister">注册</div>
    <div class="wrapper_register-link" @click="handleLoginClick">
      已有账号去登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import Toast, { useToastEffect } from "../../components/Toast";
import { toRefs } from "vue";

import { useRouter } from "vue-router";

import { reactive } from "vue";
import request from "@/utils/request";

// 处理注册逻辑
const useRegisterEffect = (showToast) => {
  const data = reactive({
    username: "",
    password: "",
    repassword: "",
  });
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const result = await request.post("/api/v1/register", {
        username: data.username,
        password: data.password,
        repassword: data.repassword,
      });
      if (result.msg == "ok") {
        router.push({ name: "Login" });
      } else {
        showToast(result.msg);
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password, repassword } = toRefs(data);
  return { username, password, repassword, handleRegister };
};
// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, repassword, handleRegister } =
      useRegisterEffect(showToast);
    const { handleLoginClick } = useLoginEffect();
    return {
      username,
      password,
      repassword,
      show,
      toastMessage,
      handleRegister,
      handleLoginClick,
    };
  },
};

// export default {
//   name: "Register",
//   setup() {
//     const data = reactive({
//       username: "",
//       password: "",
//       repassword: "",
//     });

//     const router = useRouter();

//     const handleRegister = async () => {
//       try {
//         const result = await request.post("/api/v1/register", {
//           username: data.username,
//           password: data.password,
//           repassword: data.repassword,
//         });
//         if (result.msg == "ok") {
//           router.push({ name: "Login" });
//         } else {
//           alert(result.msg);
//         }
//       } catch (e) {
//         alert("请求失败");
//       }
//     };

//     const handleLoginClick = () => {
//       router.push({ name: "Login" });
//     };
//     return { handleRegister, handleLoginClick, data };
//   },
// };
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &_input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-radius: 6px;
    &_content {
      margin-top: 0.12rem;
      line-height: 0.22rem;

      // line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &_register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &_register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>