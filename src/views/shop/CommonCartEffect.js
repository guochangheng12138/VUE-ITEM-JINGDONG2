import { useStore } from "vuex";
import { toRefs } from "vue";

// export const useCommonCartEffect = () => {
//     const store = useStore();
//     const { cartList } = toRefs(store.state);
//     const changeCartItemInfo = (shopId, productId, productInfo, num) => {
//         store.commit("changeCartItemInfo", {
//             shopId,
//             productId,
//             productInfo,
//             num,
//         });
//     }
//     return { cartList, changeCartItemInfo };
// };
export const useCommonCartEffect = () => {
    const store = useStore();
    const { cartList } = toRefs(store.state);
    const changeCartItemInfo = (shopId, shopTitle, productId, productInfo, num) => {
        store.commit("changeCartItemInfo", {
            shopId,
            shopTitle,
            productId,
            productInfo,
            num,

        });
        // console.log(shopId, shopTitle, productId, productInfo, num, total)
    }
    return { cartList, changeCartItemInfo };
};