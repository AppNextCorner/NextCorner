import { Alert } from "react-native";

const userAlertAcceptedOrder = (event: Record<string, any>, _dispatch: any, role: string) => {
  const order = event.payload;
  console.log("accepted handler is running!");
  if (order.accepted === "accepted" && role === "user") {
    Alert.alert("Your order got accepted, awesome");
  } else if (order.accepted === "rejected" && role === "user") {
    Alert.alert("Your order got rejected");
  } 
};

export default userAlertAcceptedOrder;
