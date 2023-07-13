import { makePutRequest } from "../../config/axios.config";
import { useAppDispatch } from "../../store/hook";
import { setUser } from "../../store/slices/userSessionSlice";

export default function useUpdateRole() {
  const dispatch = useAppDispatch();

  /**
   * This function is used to send a put request to the server to update the role of the user
   * @param desiredRole the desired role, either "user" or "vendor"
   * @param userId The id of the user
   */
  const updateRole = async (desiredRole: string, userId: string) => {
    const url = "/auth/switchRoles"; // the backend endpoint
    const response = await makePutRequest(url, { role: desiredRole, userId }); // the request with desired role and userId
    return response.data;
  };

  /**
   * Changes the role of a user to vendor
   * @param userId the id of the user 
   */
  const changeRoleToVendor = async (userId: string) => {
    try {
      const updatedUser = await updateRole("vendor", userId);  // get the updated user with the new role
      dispatch(setUser(updatedUser.payload)); // dispatch it
    } catch (err) {
      console.log(err);
    }
  };
  return { changeRoleToVendor };
}
