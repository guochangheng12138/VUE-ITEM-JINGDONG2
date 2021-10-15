import { createStore } from "vuex";

const setLocalCarList = (state) => {
  const { cartList } = state;
  const carListString = JSON.stringify(cartList);
  localStorage.setItem("carList", carListString)
}
const getLocalCarList = () => {
  return JSON.parse(localStorage.getItem("carList")) || {}
}

export default createStore({

  state: {
    cartList: getLocalCarList(),
    // cartList: {
    //   shopId: {
    // title:"",
    // pId:{productId: {
    //       id: 1,
    //     count: 2
    //     },}
    //     
    //   },
    // },
  },
  mutations: {
    // addItemToCart(state, payload) {
    //   const { shopId, productId, productInfo } = payload;
    //   let shopInfo = state.cartList[shopId];
    //   if (!shopInfo) { shopInfo = {} };
    //   let product = shopInfo[productId];
    //   if (!product) {
    //     product = productInfo;
    //     product.count = 0;
    //   }
    //   product.count += 1;
    //   shopInfo[productId] = product;
    //   state.cartList[shopId] = shopInfo;
    // }
    // changeCartItemInfo(state, payload) {
    //   const { shopId, productId, productInfo, num } = payload;
    //   let shopInfo = state.cartList[shopId];
    //   if (!shopInfo) { shopInfo = {} };
    //   let product = shopInfo[productId];
    //   if (!product) {
    //     product = productInfo;
    //     product.count = 0;
    //   }
    //   product.count += num;

    //   if (payload.num > 0) { product.check = true }
    //   if (payload.num < 0 && product.count < 1) { product.count = 0 }

    //   shopInfo[productId] = product;
    //   state.cartList[shopId] = shopInfo;

    //   setLocalCarList(state)
    // },
    // 点击添加或减少商品数量
    changeCartItemInfo(state, payload) {
      const { shopId, shopTitle, productId, productInfo, num } = payload;
      let shopInfo = state.cartList[shopId];
      if (!shopInfo) { shopInfo = { title: "", pId: {} } };
      let product = shopInfo.pId[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count += num;
      // product.totalprice = product.count * product.price;

      if (payload.num > 0) { product.check = true }
      if (payload.num < 0 && product.count < 1) { product.count = 0 }

      shopInfo.pId[productId] = product;
      shopInfo.title = shopTitle;
      state.cartList[shopId] = shopInfo;

      setLocalCarList(state)
    },
    // 改变选中状态
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      // const product = state.cartList[shopId][productId];
      const product = state.cartList[shopId].pId[productId];
      product.check = !product.check;

      setLocalCarList(state)
    },
    // 清空购物车
    clearCartProducts(state, payload) {
      const { shopId } = payload;
      // state.cartList[shopId] = {};
      state.cartList[shopId].pId = {};

      setLocalCarList(state)
    },
    // 购物车全选功能
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      // const products = state.cartList[shopId];
      const products = state.cartList[shopId].pId;
      if (products) {
        for (let key in products) {
          const product = products[key];
          product.check = true;
        }
      };

      setLocalCarList(state)
    }

  },
  actions: {},
  modules: {},
});
