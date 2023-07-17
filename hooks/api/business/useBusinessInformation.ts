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
    dispatch(setUserBusiness(userBusinesses));
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
      updateUserStores(uid);
    }
  };
  return { updateBusinessInformation, updateUserStores };
}
