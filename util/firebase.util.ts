import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "../";

export const firebaseConfig: any = {
  apiKey: process.env.apiKey!.replace(";", ""),
  authDomain: process.env.authDomain!.replace(";", ""),
  projectId: process.env.projectId!.replace(";", ""),
  storageBucket: process.env.storageBucket!.replace(";", ""),
  messagingSenderId: process.env.messagingSenderId!.replace(";", ""),
  appId: process.env.appId!.replace(";", ""),
  measurementId: process.env.measurementId!.replace(";", ""),
};
// console.log(
//   "firebase: ",
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId
// );

console.log("firebase config: ", firebaseConfig);
