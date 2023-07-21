import React from "react";
interface route {
  tab: string;
  styles: any;
  focused?: boolean;
  tabList: any[]
}

const handleTabChange: any = (props: route) => {
  const { tab, styles, focused, tabList } = props;
  
  const tabLocation = tabList.map((tab) => tab.name).indexOf(tab);
  const TabIcon: any = tabList[tabLocation].icon;
  return (
    <TabIcon
      name={
        focused
          ? tabList[tabLocation].focusedName
          : focused
          ? tabList[tabLocation].focusedName
          : tabList[tabLocation].unfocused
      }
      size={styles.size}
      color={styles.color}
    />
  );
};

export default handleTabChange;
