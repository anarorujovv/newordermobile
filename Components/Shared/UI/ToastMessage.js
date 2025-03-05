import { ToastAndroid } from "react-native"

const ToastMessage = (text) => {
    return ToastAndroid.showWithGravityAndOffset(
        text,
        ToastAndroid.CENTER,
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
        200,
        50,
    )
}

export default ToastMessage;