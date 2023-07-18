import React from "react";
import handleTabChange from "./handleTabChange";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { defaultTabStyles } from "constants/components/styles/tabBarStyles";

interface TabScreen {
  name: string;
  component: React.ComponentType<any>;
}

interface TabStackProps {
  tabList: TabScreen[];
  initialRoute: string;
}

const handleCreateTabStack: React.FC<TabStackProps> = (props) => {
  const { tabList, initialRoute } = props;

  const screenOptions = ({
    route,
  }: {
    route: { name: string };
  }) => {
    return {
      tabBarIcon: ({ focused, color, size }: any) => {
        const tab = tabList.find((tab) => tab.name === route.name);
        if (tab) {
          return handleTabChange({
            tab: tab.name,
            styles: {
              color,
              size,
            },
            focused,
            tabList,
          });
        }
        return null;
      },
      headerShown: false,
      tabBarActiveTintColor: "#78DBFF",
      tabBarInactiveTintColor: "grey",
      tabBarShowLabel: true,
      tabBarStyle: defaultTabStyles.tabBarStyle, // Uncomment this if needed
    };
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
      {tabList.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default handleCreateTabStack;
