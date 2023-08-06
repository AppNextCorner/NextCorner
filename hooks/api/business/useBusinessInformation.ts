import fetchBusinesses, {
  fetchVendorBusiness,
} from "pages/BusinessStack/api/getBusinessess";
import { useAppDispatch } from "../../../store/hook";
import {
  setBusinesses,
  setUserBusiness,
} from "../../../store/slices/BusinessSlice/businessSessionSlice";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";

export default function useBusinessInformation() {
  const dispatch = useAppDispatch();

  const updateUserStores = async (uid: string) => {
    const userBusinesses: vendorStructure[] = await fetchVendorBusiness(uid);
    console.log("Here is true user store: ", userBusinesses);
    dispatch(setUserBusiness(userBusinesses));
    return userBusinesses;
  };

  /**
   * This function updates businessInformation with dispatch
   */
  const updateBusinessInformation = async (uid?: string): Promise<any> => {
    // get the business data
    const newBusinessInfo = await fetchBusinesses();

    // dispatch both the business and only if the user id is provided will the user store be changed
    dispatch(setBusinesses(newBusinessInfo));
    if (uid) {
      const userStores = await updateUserStores(uid);
      console.log('user stores: ', userStores);
      return userStores[0]
    }
  };
  return { updateBusinessInformation, updateUserStores };
}
