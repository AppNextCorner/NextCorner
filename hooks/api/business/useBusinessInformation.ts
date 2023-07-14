import fetchBusinesses, {fetchVendorBusiness} from "pages/BusinessStack/api/getBusinessess";
import { useAppDispatch } from "../../../store/hook";
import { setBusinesses, setUserBusiness } from "../../../store/slices/BusinessSlice/businessSessionSlice";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { getUser } from "../../../store/slices/userSessionSlice";

export default function useBusinessInformation() {
  const dispatch = useAppDispatch();


  const updateUserStores = async (uid: string) => {
    const userBusinesses: vendorStructure[] = await fetchVendorBusiness(uid);
    dispatch(setUserBusiness(userBusinesses))
  };


  /**
   * This function updates businessInformation with dispatch
   */
  const updateBusinessInformation = async (uid?: string): Promise<any> => {
    // get the business data
    const newBusinessInfo = await fetchBusinesses();


    // dispatch and set the business data
    dispatch(setBusinesses(newBusinessInfo));
    if(uid) {updateUserStores(uid)};
  };

  const updateVendorMenu = async(newVendor: vendorStructure) => {
    

  }

  

  return { updateBusinessInformation, updateUserStores};
}
