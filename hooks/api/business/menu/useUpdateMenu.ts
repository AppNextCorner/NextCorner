import { GestureResponderEvent } from "react-native";
import { makePutRequest } from "../../../../config/axios.config";
import useBusinessInformation from "../useBusinessInformation";

interface deleteItemStructure {
    itemId: string | undefined;
    vendorId: string | undefined;
}

export default function useUpdateMenu() {
    const{updateBusinessInformation} = useBusinessInformation();

    const deleteItemRequest = async (event: GestureResponderEvent, payload: deleteItemStructure) => {
        console.log(event)
        const url = "/business/items/deleteItem";
        const response = await makePutRequest(url, payload);
        return response.data;
    };

    const deleteItem = async(event: GestureResponderEvent, payload: deleteItemStructure) => {
        try{
            const data:any = await deleteItemRequest(event, payload);

            // Dispatch to update the current vendor selected
            updateBusinessInformation(data.newVendor.uid);
        }
        catch(err){
            console.log(err);
        }
    }

    return {deleteItem};
}