import * as ImagePicker from "expo-image-picker";
import useBusinessInformation from "hooks/api/business/useBusinessInformation";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const usePhotoHandler = () => {
  const { updateBusinessInformation } = useBusinessInformation();
  const navigation = useNavigation();

  // Class representing an Upload utility with methods for handling image uploads and data sending.
  class Upload {
    // Methods for handlers

    // Private method to update vendors with the new one added, using the provided UID (user ID).
    private update = async (uid: string) => {
      await updateBusinessInformation(uid);
    };

    // Private method to create an image object with the provided endpoint and URI.
    private createImageObj = (endpoint: string, uri: string) => {
      return {
        name: `${new Date().getTime()}_${endpoint}.png`,
        uri: uri,
        type: "image/png", // Use the appropriate MIME type for your image file
      };
    };

    // Private method to create a FormData object with the provided image object and payload.
    private createFormData = (imageObj: any, payload: any) => {
      const formData = new FormData();
      formData.append("image", imageObj);
      formData.append("payload", JSON.stringify(payload));
      return formData;
    };

    // List of methods for sending data

    // Handler method for uploading vendor data.
    // It takes URI (image URI), payload (data to be sent), request (function to make the API request), and uid (user ID) as parameters.
    uploadHandler = {
      vendor: async (
        uri: string,
        payload: any,
        request: (reqUrl: string, payload: any) => any,
        uid: string
      ) => {
        const endpoint = "/business/createStore";
        const imageObj = this.createImageObj(endpoint, uri);
        if (!imageObj.uri) {
          return Alert.alert("Missing Image");
        }
        const formData = this.createFormData(imageObj, payload.payload);
        console.log(formData);
        await request(endpoint, formData);
        await this.update(uid);
      },

      // Handler method for uploading item data.
      // It takes URI (image URI), payload (data to be sent), request (function to make the API request), and uid (user ID) as parameters.
      item: async (
        uri: string,
        payload: any,
        request: (reqUrl: string, payload: any) => any,
        uid: string
      ) => {
        const endpoint = "/business/updateMenu";
        const imageObj = this.createImageObj(endpoint, uri);
        if (!imageObj.uri) {
          return Alert.alert("Missing Image");
        }
        const formData = this.createFormData(imageObj, payload.payload);
        console.log(formData);
        await request(endpoint, formData);
        await this.update(uid);
      },
    };
  }

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
      const handler = new Upload();
      if (uploadElement === "vendor") {
        await handler.uploadHandler.vendor(uri, payload, request, uid);
      } else if (uploadElement === "item") {
        await handler.uploadHandler.item(uri, payload, request, uid);
      }

      navigation.goBack();
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
