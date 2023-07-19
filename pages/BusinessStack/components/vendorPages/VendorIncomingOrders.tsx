import { View, Text, } from "react-native"
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useRoute } from "@react-navigation/native";
import useFetchOrders from "hooks/api/business/orders/useFetchOrders";

interface RouteParams {
  store?: { store: vendorStructure };
}

const VendorIncomingOrders = () => {
  const route = useRoute();
  const { store }: RouteParams = route.params as RouteParams;
  const { fetchOrdersByName } = useFetchOrders();
  fetchOrdersByName(store?.store.name);

  return (
  <View> 
    <Text>  </Text>
  </View>
  );
};

export default VendorIncomingOrders;
