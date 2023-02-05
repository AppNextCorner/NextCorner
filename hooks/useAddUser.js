
import React from 'react'
import { useAppDispatch } from '../store/hook';
const useAddUser = () => {
    const dispatch = useAppDispatch();

    const makeUser = async() => {
        try {
            await dispatch(createUser());
        }catch(err){
            console.log('user was not created', err);
        }
    }
  
    return {
        makeUser
    }
}
// exporting
export default useAddUser