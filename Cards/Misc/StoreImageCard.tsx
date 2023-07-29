import { View, Image, StyleSheet, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";

interface Props {
  store: vendorStructure;
}

export default function StoreWithImage(props: Props) {
  const { store } = props;
  const checkCreateProp = (prop: boolean | undefined) => {
    if (prop) {
      return { uri: `${store.image}` };
    } else {
      return { uri: `${store.image}` };
    }
  };

  const checkIfImageExists = (img: string, prop: boolean | undefined) => {
    if (img) {
      return checkCreateProp(prop);
    } else {
      return {
        uri: "https://media.istockphoto.com/id/1365555722/vector/street-food-icon.jpg?s=612x612&w=0&k=20&c=AGtos738uAWi4GfVMOQQqvY1c0rB9HpVtfCO4Rf7-WI=",
      };
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.vendorImageContainer}>
        <Image
          style={store.image ? styles.vendorImage : styles.noVendorImage}
          source={checkIfImageExists(store.image, true)}
        />
      </View>

      <View style={styles.foodTexts}>
        <MaterialIcons name="store" size={24} color="#606160" />
        <Text style={styles.businesText}>{store.name}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <AntDesign name="star" size={12} color="#ffc247" />
        <Text style={styles.ratingText}>{store.rating}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: "3%",
  },
    ratingText: {
    color: "#9a9c9a",
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
  },
  businesText: {
    fontSize: 12,
    color: "#606160",
    fontWeight: '600',
    flex: 1,
  },
  vendorImage: {
    flex: 1,
    width: "100%",
    objectFit: "cover",
  },
    vendorImageContainer: {
    flex: 5,
    width: "100%",
  },
    noVendorImage: {
    flex: 1,
    width: 175,
    height: 250,
    margin: "2%",
    //alignSelf: "center",
    // objectFit: "scale-down",
  },
    card: {
    width: "100%",
    height: 250,
    flex: 1,
    alignSelf: "center",
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "#97989F",
  },
  foodTexts: {
    flexDirection: "row",
    marginLeft: 20,

    // NOTE: MARGIN left and right are bugging with percentage
    // marginLeft: "2%",
    // marginVertical: "1%",
    alignItems: "center",
  },
})

// const styles = StyleSheet.create({









//   foodCategoryStyle: {
//     flex: 1,
//     flexDirection: "row",
//     alignContent: "center",
//     borderColor: "#f2f0f0",
//     borderStyle: "solid",
//     borderWidth: 3,
//     borderRadius: 10,
//     overflow: "hidden",
//     marginRight: 10,
//     marginLeft: 10,
//     marginBottom: 15,
//     paddingBottom: 7,
//   },
// });
