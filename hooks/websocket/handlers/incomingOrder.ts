import { addIncomingOrder } from "../../../store/slices/WebsocketSlices/IncomingOrderSlice";

/**
 * Places the incoming order inside the vendor list
 * @param event - Our data containing the type of event and payload of event
 * @param dispatcher - Using react redux dispatch for global update
 */
const incomingOrder = (
  event: Record<string, any>,
  dispatcher: (param: any) => any,
  extra: Record<string, any> | undefined
) => {
  const order = event.payload;

console.log("incoming order handler running!", order)
  //if (order.accepted === "pending" && extra!.role === "vendor" ) {
    dispatcher(addIncomingOrder([order]));
  //}
};

export default incomingOrder;
