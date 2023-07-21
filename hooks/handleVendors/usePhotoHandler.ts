import * as ImagePicker from "expo-image-picker";
import useBusinessInformation from "hooks/api/business/useBusinessInformation";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
   *
   * @param uri
   * @param endpoint
   * @param request
   * @param payload
   */
  const upload = async (
    uri: string,
    endpoint: string,
    request: (reqUrl: string, payload: any) => any,
    payload: any,
    uid: string
  ) => {
    try {
      const imageObj = {
        name: `${new Date().getTime()}_${endpoint}.png`,
        uri: uri,
        type: "image/png", // Use the appropriate MIME type for your image file
      };
      if (!imageObj.uri) {
        return Alert.alert("Missing Image");
      }

      const formData = new FormData();
      formData.append("image", JSON.parse(JSON.stringify(imageObj)));
      formData.append("payload", JSON.stringify(payload.payload));
      console.log(formData);
      await request(endpoint, formData)
      .then((response: any) => {
        console.log('Response:', response);
      })
      .catch((error: any) => {
        console.error('Error handling the promise rejection:', error.response);
      });;
      navigation.goBack();
      // Re-render the vendors with the new one added
      await updateBusinessInformation(uid);
    } catch (err: any) {
      Alert.alert(err.response.data.payload)
      console.log(err.response.data.payload);
    }
  };
  return {
    openImageLibrary,
    upload,
  };
};

export default usePhotoHandler;
