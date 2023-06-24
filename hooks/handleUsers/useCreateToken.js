import {auth} from '../../hooks/handleUsers/useFirebase'
export const createToken = async () => {
    let user = auth.currentUser;
    console.log("user current user:", user);
  
    if (user) {
      const token = await user.getIdToken();
      const payloadHeader = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      return payloadHeader;
    }
  
    return null;
  };