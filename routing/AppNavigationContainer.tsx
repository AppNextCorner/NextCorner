// AppNavigationContainer.tsx
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

const AppNavigationContainer: React.FC<{ children: React.ReactNode }> = ({ children }: {children: any}) => {
  return <NavigationContainer independent={true}>{children}</NavigationContainer>;
};

export default React.memo(AppNavigationContainer);
