import Route from '@routing/Route'


// install complementary packages to use this package
import { Provider } from 'react-redux'
import { store } from './store/store'
import { STRIPE_API_KEY } from '@env';
import { StripeProvider } from "@stripe/stripe-react-native";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './util/firebase.util';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
// firebase configuration / initialize
export const app = initializeApp(firebaseConfig);
console.log("app: ",app)
export const auth = getAuth(app);
console.log("auth: ", auth);

export default function App() {
  return (
   
    <StripeProvider publishableKey={STRIPE_API_KEY}>
      <Provider store={store}>
        <Route />
      </Provider>
    </StripeProvider>
  )
}
