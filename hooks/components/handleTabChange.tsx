import React from "react";
import { user } from "constants/components/tabs";

interface route {
  tab: string;
  styles: any;
  focused?: boolean;
}

const handleTabChange: any = (props: route) => {
  const { tab, styles, focused } = props;
  const tabLocation = user.map((tab) => tab.name).indexOf(tab);
  const TabIcon: any = user[tabLocation].icon;
  console.log('tab icon', TabIcon)
  return (
    <TabIcon
      name={
        focused
          ? user[tabLocation].focusedName
          : focused
          ? user[tabLocation].focusedName
          : user[tabLocation].unfocused
      }
      size={styles.size}
      color={styles.color}
    />
  );
};

export default handleTabChange;
