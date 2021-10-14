<template>
  <div class="wrapper">
    <img
      src="http://webapi.hanmaweilai.com/public/static/images/user.png"
      class="wrapper_img"
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
    <div class="wrapper_login-button" @click="handleLogin">登录</div>
    <div class="wrapper_login-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <!-- <Toast v-if="data.showToast" :message="data.toastMessage" /> -->
  <!-- <Toast v-if="toastData.showToast" :message="toastData.toastMessage" /> -->
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { toRefs } from "vue";

import Toast, { useToastEffect } from "../../components/Toast.vue";

// import useToastEffect from "@/utils/useToastEffect";

// import Toast from "../../components/Toast.vue";

import request from "@/utils/request";

// import axios from "axios";
import { reactive } from "vue";

import { useRouter } from "vue-router";

// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handleLogin = async () => {
    try {
      const result = await request.post("/api/v1/login", {
        username: data.username,
        password: data.password,
      });
      if (result.msg == "ok") {
        localStorage.userinfo = JSON.stringify(result.data);
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast(result.msg);
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};
// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = useRegisterEffect();
    return {
      show,
      handleLogin,
      handleRegisterClick,
      toastMessage,
      username,
      password,
    };
  },
};

// export default {
//   name: "Login",

//   components: { Toast },
//   setup() {
//     const { show, toastMessage, showToast } = useToastEffect();

// const { toastData, showToast } = useToastEffect();

// const data = reactive({
//   username: "",
//   password: "",

// showToast: false,
// toastMessage: "",
// });

// const showToast = (message) => {
//   data.showToast = true;
//   data.toastMessage = message;
//   setTimeout(() => {
//     (data.showToast = false), (data.toastMessage = "");
//   }, 2000);
// };

// const router = useRouter();
// const handleLogin = async () => {
//   try {
//     const result = await request.post("/api/v1/login", {
//       username: data.username,
//       password: data.password,
//     });
//     if (result.msg == "ok") {
//       localStorage.userinfo = JSON.stringify(result.data);
//       localStorage.isLogin = true;
//       router.push({ name: "Home" });
//     } else {
// alert(result.msg);

// showToast(result.msg);
//   }
// } catch (e) {
// alert("登陆失败");

//   showToast("请求失败");
// }

// const handleLogin = () => {
//   axios
//     .post("http://webapi.hanmaweilai.com/api/v1/login", {
//       username: data.username,
//       password: data.password,
//     })
//     .then((res) => {
//       console.log(res);
//       let result = res.data;
//       if (result.msg == "ok") {
//         localStorage.userinfo = JSON.stringify(result.data);
//         localStorage.isLogin = true;
//         router.push({ name: "Home" });
//       }
//     })
//     .catch(() => {
//       alert("登陆失败");
//     });

// localStorage.isLogin = true;
// router.push({ name: "Home" });
//     };

//     const handleRegisterClick = () => {
//       router.push({ name: "Register" });
//     };
//     // return { handleLogin, handleRegisterClick, data };
//     // return { handleLogin, handleRegisterClick, data, toastData };
//     return { show, handleLogin, handleRegisterClick, data, toastMessage };
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
  &_login-button {
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
  &_login-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>