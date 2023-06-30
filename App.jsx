import Route from '@routing/Route'
// install complementary packages to use this package
import { Provider } from 'react-redux'
import { store } from './store/store'
import { STRIPE_API_KEY } from '@env';
import { StripeProvider } from "@stripe/stripe-react-native";
export default function App() {
  return (
   
    <StripeProvider publishableKey={STRIPE_API_KEY}>
      <Provider store={store}>
        <Route />
      </Provider>
    </StripeProvider>
  )
}