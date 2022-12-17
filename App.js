import Route from "./routing/Route"

// install complementary packages to use this package
import { Provider } from "react-redux"
import { store } from "./store/store";

export default function App() {

  
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  )
}
