import { makePutRequest } from "../../config/axios.config";
import { useAppDispatch } from "../../store/hook";
import { setUser } from "../../store/slices/userSessionSlice";

export default function useUpdateRole() {
  const dispatch = useAppDispatch();
  const updateRole = async (desiredRole: string, userId: string) => {
    const url = "/auth/switchRoles";
    const response = await makePutRequest(url, { role: desiredRole, userId });
    return response.data;
  };

  const changeRoleToVendor = async (userId: string) => {
    try {
      const updatedUser = await updateRole("vendor", userId);
      dispatch(setUser(updatedUser.payload));
    } catch (err) {
      console.log(err);
    }
  };
  return { changeRoleToVendor };
}
