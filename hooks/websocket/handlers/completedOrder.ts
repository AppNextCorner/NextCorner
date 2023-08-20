import { Alert } from "react-native";
import { setCompleted } from "../../../store/slices/addToOrders";

const completedOrder = (
  event: Record<string, any>,
  dispatcher: (param: any) => any,
  _role: string
) => {
  const payload = event.payload;
  Alert.alert(
    `Your Order from ${payload.order.storeInfo.storeName} is complete!`
  );
  dispatcher(setCompleted(payload.order));
};

export default completedOrder;
