import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "util/firebase.util";
// firebase configuration / initialize
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
