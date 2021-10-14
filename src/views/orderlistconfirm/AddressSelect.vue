<template>
  <div class="wrappers">
    <div class="wrappers_title">收货地址</div>
    <div class="wrappers_content">
      <div class="wrappers_content_address">
        鲁商凤凰广场北区汉码未来1号楼601
      </div>
      <div class="wrappers_content_namemobile">小汉（先生） 18546987415</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressSelect",
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrappers {
  width: 90%;
  border-radius: 0.1rem;
  margin-left: 0.15rem;
  margin-top: -0.6rem;
  background-color: white;
  &_title {
    font-size: 0.2rem;
    padding-top: 0.1rem;
    padding-left: 0.1rem;
    padding-bottom: 0.1rem;
  }
  &_content {
    font-size: 0.15rem;
    padding-left: 0.1rem;
    padding-bottom: 00.1rem;
    &_address {
      margin-bottom: 0.1rem;
    }
    &_namemobile {
      margin-bottom: 0.1rem;
    }
  }
}
</style>