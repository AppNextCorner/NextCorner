import fetchBusinesses from "pages/BusinessStack/api/getBusinessess";
import { useAppDispatch } from "../../../store/hook";
import { setBusinesses } from "../../../store/slices/BusinessSlice/businessSessionSlice";
export default function useBusinessInformation() {
  const dispatch = useAppDispatch();

  /**
   * This function updates businessInformation with dispatch
   */
  const updateBusinessInformation = async () => {
    // get the business data
    const newBusinessInfo = await fetchBusinesses();

    // dispatch and set the business data
    dispatch(setBusinesses(newBusinessInfo));
  };

  return { updateBusinessInformation };
}
