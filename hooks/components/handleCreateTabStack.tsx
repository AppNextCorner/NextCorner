import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_100Thin_Italic,
} from "@expo-google-fonts/poppins";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { defaultTabStyles } from "constants/components/styles/tabBarStyles";
import React from "react";
import handleTabChange from "./handleTabChange";

export default function handleCreateTabStack(props: any) {
  const { tabList, initialRoute } = props;
  const [fontsLoaded] = useFonts({
    Poppins_100Thin_Italic,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  const Tab = createBottomTabNavigator();

  const screenOptions = ({
    route,
  }: {
    route: any;
  }): BottomTabNavigationOptions => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        let rn = route.name;
        const styles = {
          color,
          size,
        };
        const tab: any = {
          tab: rn,
          styles,
          focused,
        };
        return handleTabChange(tab);
      },
      headerShown: false,
      tabBarActiveTintColor: "#78DBFF",
      tabBarInactiveTintColor: "grey",
      tabBarShowLabel: true,
      tabBarStyle: defaultTabStyles.tabBarStyle,
    };
  };

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={screenOptions}
    >
      {tabList.map((screen: any) => (
        <Tab.Screen
          key={screen.name} // Add a unique key prop
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
}
