import { Text } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useGetUserData from "hooks/handleUsers/useGetUserData";
import Vendor from "pages/BusinessStack/components/Vendor";
import { user, vendors } from "constants/components/tabs";
import handleCreateTabStack from "hooks/components/handleCreateTabStack";
import HomePage from "pages/HomePage";
import { screens, vendorScreens } from "constants/components/logged";
import { loggedOutScreens } from "constants/components/loggedOut";
const Stack = createNativeStackNavigator();

const VendorComponent = () => {
  const vendorStack = handleCreateTabStack({
    tabList: vendors,
    initialRoute: "Vendors",
  });

  return vendorStack || <Vendor />;
};
const HomeStackComponent = () => {
  const homeStack = handleCreateTabStack({
    tabList: user,
    initialRoute: "Home",
  });

  return homeStack || <HomePage />;
};

export default function Route() {
  const { isDone, isLoggedIn } = useGetUserData();
  console.log("isDone: ", isDone);
  console.log("isloggedin: ", isLoggedIn);
  if (isDone === true && isLoggedIn) {
    return (
      <>
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* User pages */}

            {/* Tabs */}

            <Stack.Screen name="HomeStack" component={HomeStackComponent} />

            {screens.map((screen, index) => {
              const Component = (props: any) => <screen.component {...props} />;
              return (
                <Stack.Screen
                  key={index}
                  name={screen.name}
                  component={Component}
                />
              );
            })}

            {/* Vendor Pages */}
            <Stack.Screen name="Vendor" component={VendorComponent} />

            {/* Forms */}
            {vendorScreens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  } else if (isDone === true && !isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {loggedOutScreens.map((screen, index) => (
            <Stack.Screen
              key={index}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>fetching user...</Text>;
  }
}
