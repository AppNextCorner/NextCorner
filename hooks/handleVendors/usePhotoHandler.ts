
import * as ImagePicker from "expo-image-picker";
import useBusinessInformation from "hooks/api/business/useBusinessInformation";


const usePhotoHandler = () => {
  const {updateBusinessInformation} = useBusinessInformation();


  const openImageLibrary = async (): Promise<string> => {
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
    return "no image found";
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
    
      const formData = new FormData();
      formData.append("image",JSON.parse(JSON.stringify(imageObj)));
      formData.append("payload",JSON.stringify(payload.payload));

      await request(endpoint, formData);
      // Re-render the vendors with the new one added
      await updateBusinessInformation(uid);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    openImageLibrary,
    upload
  };
};

export default usePhotoHandler;
