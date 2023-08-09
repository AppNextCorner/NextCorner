import { Platform } from "react-native";

/*
iosOffset - iOS offset pixels
iosOffset - Android offset pixels
@return {number} - The pixels offset
*/
export const keyboardVerticalOffset = (iosOffset: number, androidOffset: number) => {
  return Platform.OS === "ios" ? iosOffset : androidOffset;
};
