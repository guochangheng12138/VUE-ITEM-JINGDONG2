<template>
  <div class="wrapper">
    <div class="wrapper_bg"></div>
    <div class="wrapper_icon iconfont" @click="handleUserClick">&#xe8a0;</div>
    <div class="wrapper_center">
      <div class="wrapper_center_mess">
        <img
          class="wrapper_center_mess_head"
          src="http://webapi.hanmaweilai.com/public/static/images/basket.png"
        />
        <div class="wrapper_center_mess_name">{{ nickname }}</div>
        <div class="wrapper_center_mess_id">ID:{{ id }}+{{ numbers }}</div>
        <div class="wrapper_center_mess_infos">
          <div class="wrapper_center_mess_infos_name">
            <div class="wrapper_center_mess_infos_name_item">红包</div>
            <div class="wrapper_center_mess_infos_name_item">优惠券</div>
            <div class="wrapper_center_mess_infos_name_item">鲜豆</div>
            <div class="wrapper_center_mess_infos_name_item">白条</div>
          </div>
          <div class="wrapper_center_mess_infos_num">
            <div class="wrapper_center_mess_infos_num_item">{{ money }}</div>
            <div class="wrapper_center_mess_infos_num_item">{{ coupons }}</div>
            <div class="wrapper_center_mess_infos_num_item">{{ gold }}</div>
            <div class="wrapper_center_mess_infos_num_item">{{ gold }}</div>
          </div>
        </div>
      </div>
      <div class="wrapper_center_item">
        <div class="wrapper_center_item_my">
          <div
            class="
              wrapper_center_item_my_icon
              iconfont
              wrapper_center_item_my_icon_red
            "
          >
            &#xe63f;
          </div>
          <div class="wrapper_center_item_my_font">我的钱包</div>
          <div class="wrapper_center_item_my_st">></div>
        </div>
        <div class="wrapper_center_item_my" @click="handleAddressClick">
          <div
            class="
              wrapper_center_item_my_icon
              iconfont
              wrapper_center_item_my_icon_pink
            "
          >
            &#xe634;
          </div>
          <div class="wrapper_center_item_my_font">我的地址</div>
          <div class="wrapper_center_item_my_st">></div>
        </div>
        <div class="wrapper_center_item_my">
          <div
            class="
              wrapper_center_item_my_icon
              iconfont
              wrapper_center_item_my_icon_purple
            "
          >
            &#xe71d;
          </div>
          <div class="wrapper_center_item_my_font">我的客服</div>
          <div class="wrapper_center_item_my_st">></div>
        </div>
      </div>
    </div>
  </div>
  <Docker />
</template>

<script>
import Docker from "../home/Docker.vue";

import { useRouter } from "vue-router";

// 个人信息与收货地址跳转
const useAddressEffect = () => {
  const router = useRouter();
  //个人信息
  const handleUserClick = () => {
    router.push({ name: "UserMessage" });
  };
  //地址管理
  const handleAddressClick = () => {
    router.push({ name: "ManagementAddress" });
    // 设置进入地址管理界面，点击每个地址后的跳转校验参数
    localStorage.AddressSelect = true;
  };
  return { handleUserClick, handleAddressClick };
};

export default {
  name: "Person",
  components: { Docker },
  setup() {
    const { handleUserClick, handleAddressClick } = useAddressEffect();

    const userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
    const { nickname, id, numbers, coupons, gold, iou, money } = userinfo;

    return {
      handleUserClick,
      handleAddressClick,
      nickname,
      id,
      numbers,
      coupons,
      gold,
      iou,
      money,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  overflow-y: auto;
  background: $search-bgColor;
  padding: 0.01rem;
  &_bg {
    width: 100%;
    height: 2.3rem;
    background-image: linear-gradient(239deg, #310661 0%, #50c7fb 100%);
    border-bottom-left-radius: 90% 40%;
    border-bottom-right-radius: 90% 40%;
  }
  &_icon {
    position: absolute;
    margin-top: -1.8rem;
    margin-left: 3.2rem;
    color: white;
  }
  &_center {
    width: 90%;
    margin: -0.8rem auto 0;
    &_mess {
      background: #fff;
      border: solid #fff;
      margin-bottom: 0.2rem;
      border-radius: 0.1rem;
      &_head {
        width: 0.9rem;
        height: 0.9rem;
        border: solid rgb(121, 160, 204);
        border-radius: 50%;
        margin-top: -0.5rem;
        margin-left: 50%;
        transform: translateX(-0.45rem);
        z-index: 11;
      }
      &_name {
        width: 70%;
        height: 0.3rem;
        margin: 0rem auto 0.05rem;
        text-align: center;
        font-size: 0.2rem;
      }
      &_id {
        width: 70%;
        height: 0.3rem;
        margin: 0rem auto 0.05rem;
        text-align: center;
        font-size: 0.15rem;
        color: $content-bgColor;
      }
      &_infos {
        border-top: solid $search-fontColor 0.01rem;
        &_name {
          display: flex;
          margin-bottom: 0.1rem;
          font-size: 0.15rem;
          color: $content-bgColor;
          margin-top: 0.1rem;
          &_item {
            width: 25%;
            text-align: center;
          }
        }
        &_num {
          display: flex;
          margin-bottom: 0.15rem;
          font-size: 0.2rem;
          &_item {
            width: 25%;
            text-align: center;
          }
        }
      }
    }
    &_item {
      background: #fff;
      border-radius: 0.1rem;
      padding: 0.1rem;
      font-size: 0.17rem;
      &_my {
        display: flex;
        height: 0.4rem;
        &_icon {
          width: 8%;
          height: 0.28rem;
          border-radius: 50%;
          text-align: center;
          line-height: 00.28rem;
          color: white;
          margin-top: 0.05rem;
          &_red {
            background: red;
          }
          &_pink {
            background: rgb(230, 139, 154);
          }
          &_purple {
            background: purple;
          }
        }
        &_font {
          width: 80%;
          line-height: 0.4rem;
          padding-left: 00.08rem;
        }
        &_st {
          width: 5%;
          line-height: 0.4rem;
          color: $content-bgColor;
        }
      }
    }
  }
}
</style>