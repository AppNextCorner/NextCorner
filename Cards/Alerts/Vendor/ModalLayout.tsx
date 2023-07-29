import { View, StyleSheet, Animated } from "react-native";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import COLORS from "../../../util/COLORS";
import Modal from 'react-native-modal'
type Props = {
  visible: boolean;
  children: ReactNode;
};

const ModalLayout = ({ children, visible }: Props) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    // <Modal
    //   isVisible={showModal}
    //   backdropOpacity={0.5}
    //   hasBackdrop={false}
    //   backdropColor="#000"
    //   // onBackdropPress={onDismiss} // Close the modal when tapping on the backdrop
    //   // onBackButtonPress={onDismiss} // Close the modal when pressing the back button on Android
    //   animationIn="zoomIn" // You can choose other animation types as well
    //   animationOut="zoomOut"
    //   useNativeDriver={true} // Set this to true for better performance

    // >
      <View style={styles.container}>
        <Animated.View
          style={[styles.modalCon, { transform: [{ scale: scaleValue }] }]}
        >
          {children}
        </Animated.View>
      </View>
    //</Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: '15%',
    width: '100%',
    zIndex: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },

  modalCon: {
    borderColor: "#d6d6d6",
    borderStyle: "solid",

    borderWidth: 2,

    top: 50,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    width: "80%",
  },
});
export default ModalLayout;
