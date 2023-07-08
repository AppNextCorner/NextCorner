import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {time, schedule} from "../../typeDefinitions/interfaces/IVendor/time";
import SelectDropdown from "react-native-select-dropdown";
import { totalTime } from "constants/vendorTime";

interface IProps {
  times: time[];
  chooseTime: (property: string, text: string) => void;
}

interface SelectorProps {
  property: string;
  setTime: React.Dispatch<React.SetStateAction<any>>;
  date: time;
}

const TimeSelector = (props: SelectorProps) => {
  const { date, property, setTime } = props;
  
  return (
    <View style={styles.selectorContainer}>
      <SelectDropdown
        data={totalTime}
        onSelect={(selected, index: number) => {
            
          setTime((prevStructure: schedule) => ({
            ...prevStructure,
            [property]: selected,
          }));
        }}
        buttonTextAfterSelection={(selectedItem: any, index: number) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item: any, index: any) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
};

const SelectingTime = (props: IProps) => {
  const { times, chooseTime } = props;
  const [time, setTime] = useState<time[]>(times);
  console.log(time)
  return (
    <View style={styles.container}>
      <FlatList
        data={time}
        renderItem={({ item }) => (
          <View>
            <Text>{item.day}</Text>
            <TimeSelector property={"open"} setTime={setTime} date={item} />
            <TimeSelector property={"closed"} setTime={setTime} date={item} />
          </View>
        )}
      />
    </View>
  );
};

export default SelectingTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectorContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
