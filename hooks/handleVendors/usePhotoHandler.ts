import * as ImagePicker from "expo-image-picker";
import useBusinessInformation from "hooks/api/business/useBusinessInformation";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

class Upload {

  // Methods for handlers
  private createImageObj = (endpoint: string, uri: string) => {
    return {
      name: `${new Date().getTime()}_${endpoint}.png`,
      uri: uri,
      type: "image/png", // Use the appropriate MIME type for your image file
    };
  };
  private createFormData = (imageObj: any, payload: any) => {
    const formData = new FormData();
    formData.append("image",  Platform.OS === "ios" ? JSON.parse(JSON.stringify(imageObj)) : imageObj);
    formData.append("payload",  Platform.OS === "ios" ? JSON.stringify(payload): payload);
    return formData;
  };
  
  // List of methods for sending data
  uploadHandler = {
    vendor: async (
      uri: string,
      payload: any,
      request: (reqUrl: string, payload: any) => any
    ) => {
      const endpoint = "/business/createStore";
      const imageObj = this.createImageObj(endpoint, uri);
      if (!imageObj.uri) {
        return Alert.alert("Missing Image");
      }

      const formData = this.createFormData(imageObj,payload.payload);
      console.log(formData);
      await request(endpoint, formData);
    },
    item: async (
      uri: string,
      payload: any,
      request: (reqUrl: string, payload: any) => any
    ) => {
      const endpoint = "/business/updateMenu";
      const imageObj = this.createImageObj(endpoint, uri);
      if (!imageObj.uri) {
        return Alert.alert("Missing Image");
      }

      const formData = this.createFormData(imageObj, payload.payload);
      console.log(formData);
      await request(endpoint, formData);
      // 
      // we can make two classes, one for Android and another for IOS
    },
  };
}
const usePhotoHandler = () => {
  const { updateBusinessInformation } = useBusinessInformation();
  const navigation = useNavigation();

  const openImageLibrary = async (): Promise<string | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        return response.assets[0].uri;
      }
    }
    return null;
  };

  /**
   * Show me 
   * Method to upload a form to the server 
   * @param uri The image being sent
   * @param uploadElement The type of upload element
   * @param request Type of request being sent
   * @param payload The data being sent
   */
  const upload = async (
    uri: string,
    uploadElement: string,
    request: (reqUrl: string, payload: any) => any,
    payload: any,
    uid: string
  ) => {
    try {
      //

      const handler = new Upload();
      if (uploadElement === "vendor") {
        handler.uploadHandler.vendor(uri, payload, request); // these are the methods
      } else if (uploadElement === "item") {
        handler.uploadHandler.item(uri, payload, request);
      }
      navigation.goBack();
      // Re-render the vendors with the new one added
      await updateBusinessInformation(uid);
    } catch (err: any) {
      Alert.alert(err.response.data.payload);
      console.log(err.response.data.payload);
    }
  };
  return {
    openImageLibrary,
    upload,
  };
};

export default usePhotoHandler;
