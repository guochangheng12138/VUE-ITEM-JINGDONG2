import { reactive } from "vue";

const useToastEffect = () => {
    const toastData = reactive({
        showToast: false,
        toastMessage: "",
    });
    const showToast = (message) => {
        toastData.showToast = true;
        toastData.toastMessage = message;
        setTimeout(() => {
            (toastData.showToast = false), (toastData.toastMessage = "");
        }, 2000);
        // console.log(message)
    }
    return { toastData, showToast }
}
export default useToastEffect;
