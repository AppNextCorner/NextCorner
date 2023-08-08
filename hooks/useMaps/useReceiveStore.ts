import { WSLocation } from "pages/OrdersPage";
import { state } from "../../store/slices/addToOrders";

const handleWebSocketMessage = (event: MessageEvent, storeLocations, setStoreLocations) => {
    const parseEvent = JSON.parse(event.data);
    console.log("parse event", parseEvent);
    const lookForOrder = orders.find(
      (item: state) =>
        item.orders[0].inCart.storeInfo.storeOwner ===
        parseEvent.payload.order_id
    );
    console.log("lookForOrder", lookForOrder);
    if (parseEvent.type === "vendor_location" && lookForOrder) {
      console.log("here is location from vendor_location: ", parseEvent);
      const newLocation: WSLocation = {
        location: {
          latitude: parseEvent.payload.location.latitude,
          longitude: parseEvent.payload.location.longitude,
          latitudeDelta: 0.0106,
          longitudeDelta: 0.0121,
        },
        orderId: parseEvent.payload.order_id,
      };
      console.log("here is new location,", newLocation);
      const findIfStoreExists = storeLocations.find(
        (item: WSLocation) => item.orderId === newLocation.orderId
      );
      const objIndex = storeLocations.findIndex(
        (obj) => obj.orderId == newLocation.orderId
      );

      // Copy
      const copy = [...storeLocations];
      copy[objIndex] = newLocation;

      console.log("find store if exists", findIfStoreExists);
      console.log("store locations: ", storeLocations);
      // Check for the store -> Update the copy and replace the original with the copy -> else add a new location
      findIfStoreExists
        ? setStoreLocations(copy)
        : setStoreLocations((prevState) => prevState.concat([newLocation]));
    }
  };