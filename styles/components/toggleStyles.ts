import { StyleSheet } from "react-native";

export const toggleButton = StyleSheet.create({
    toggleButton: {
        alignItems: "center",
        width: 50,
        height: 30,
        marginHorizontal: "5%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        overflow: "hidden", // Ensure the inner circle stays within the toggleButton boundaries
      },
      toggleButtonOn: {
        backgroundColor: "#78dbff",
        borderColor: "#dee0df",
      },
      toggleButtonOff: {
        backgroundColor: "#fff",
        borderColor: "#dee0df",
      },
      toggleButtonCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#fff",
        position: "absolute", // Position the inner circle absolutely within the toggleButton
      },
      toggleButtonCircleOn: {
        backgroundColor: "#fff",
      },
      toggleButtonCircleOff: {
        backgroundColor: "#78dbff",
      },
})