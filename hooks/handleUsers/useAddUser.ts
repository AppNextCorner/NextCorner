import { useAppDispatch } from "../../store/hook";
import { createUser } from "../../store/slices/userSessionSlice";
import UserAction from "../../typeDefinitions/interfaces/reduxAction.interface";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
/**
 * This hook shall help developers add a user to the firebase account
 *
 */
const useAddUser = () => {
  // User sessions using dispacth hook
  const dispatch = useAppDispatch();
  /**
   * make user will ensure that user submits all fields that include the following:
   *
   * @param firstName - the user that signs up for the first time
   * @param lastName
   * @param email
   * @param password
   * @param phoneNumber
   */
  
  const makeUser = async(
    userData: AppUser
  ) => {
    try {
      const user = await dispatch(createUser(userData)).then((action: UserAction) => {
        const userCreated = action.payload; // Access the payload
        return userCreated;
      }).catch((err) => {
        return err
      }); // wait for user to be created in the backend
      return user
    } catch (err: any) {
    }
  };

  return {
    makeUser,
  };
};
// exporting
export default useAddUser;
