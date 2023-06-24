import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} from '@env'

export const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId:projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};
console.log("firebase: ",
apiKey,
authDomain,
projectId,
storageBucket,
messagingSenderId,
appId,
measurementId
  )

console.log('firebase config: '. firebaseConfig)