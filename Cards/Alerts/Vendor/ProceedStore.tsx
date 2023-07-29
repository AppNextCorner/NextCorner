import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ModalLayout from "./ModalLayout";

const ProceedStore = () => {
    
  const [visible, setVisible] = React.useState(true);

  return (
    <View>
      <ModalLayout visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}></View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          Transaction Successful
        </Text>
      </ModalLayout>
    </View>
  );
};

export default ProceedStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
