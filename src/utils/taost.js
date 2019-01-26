import { ToastAndroid, Platform } from "react-native";

export const showToast = (refs, msg) => {
  if (Platform.OS === "android") 
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  else 
    refs.toast.show(msg);
};
