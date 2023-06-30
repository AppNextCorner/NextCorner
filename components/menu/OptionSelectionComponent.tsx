import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextStyle,
  ViewStyle,
} from "react-native";
import { FontAwesome} from "@expo/vector-icons";

interface Option {
  label: string;
}

interface Item {
  name: string;
  type: string;
  optionCustomizations: Option[];
}

interface OptionSelectionComponentProps {
  data: Item[];
  header: () => JSX.Element; 
  onSelect: (updatedOptions: SetStateAction<any[]>, data: Item[]) => void;
  stateRender: boolean;
  render: Dispatch<SetStateAction<boolean>>; 
}

export default function OptionSelectionComponent(
  props: OptionSelectionComponentProps
) {
  const { data, header, onSelect } = props;
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const handlePress = (item: Item, option: Option) => {
    let updatedOptions: SetStateAction<any[]> = [];
    console.log("type: ", item.type);
    if (item.type === "single") {
      // Single selection, update the selected option
      if (selectedOptions.includes(option)) {
        updatedOptions = [];
      } else {
        updatedOptions = [option];
      }
    } else if (item.type === "multiple") {
      // Multiple selection, toggle the selected option
      if (selectedOptions.includes(option)) {
        updatedOptions = selectedOptions.filter((item) => item !== option);
      } else {
        updatedOptions = [...selectedOptions, option];
      }
    }
    console.log(updatedOptions);
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions, data);
  };

  const styles: {
    optionContainer: ViewStyle;
    optionCard: ViewStyle;
    optionTitle: TextStyle;
    optionsContainer: ViewStyle;
    optionButton: ViewStyle;
    optionButtonSelected: ViewStyle;
    selectIcon: TextStyle;
    optionButtonText: TextStyle;
    optionButtonTextSelected: TextStyle;
  } = {
    optionContainer: {
      marginHorizontal: 20,
    },
    optionCard: {
      backgroundColor: "#fff",
      padding: 10,
      marginBottom: 10,
      marginHorizontal: 20,
      borderRightWidth: 3,
      borderLeftWidth: 3,
      borderColor: "#f2f0f0",
    },
    optionTitle: {
      fontSize: 15,
      fontWeight: "bold",
    },
    optionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 5,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#78DBFF",
      marginRight: 10,
    },
    optionButtonSelected: {
      backgroundColor: "#78DBFF",
    },
    selectIcon: {
      marginRight: 5,
    },
    optionButtonText: {
      fontWeight: "600",
      fontSize: 10,
      color: "#78DBFF",
    },
    optionButtonTextSelected: {
      color: "#fff",
    },
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={header}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>{item.name}</Text>
            <View style={styles.optionsContainer}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {item.optionCustomizations.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOptions.includes(option) &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() => handlePress(item, option)}
                  >
                    <FontAwesome
                      style={styles.selectIcon}
                      name={
                        selectedOptions.includes(option)
                          ? "check-square"
                          : "square-o"
                      }
                      size={24}
                      color={
                        selectedOptions.includes(option) ? "#fff" : "#78DBFF"
                      }
                    />
                    <Text
                      style={[
                        styles.optionButtonText,
                        selectedOptions.includes(option) &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      />
    </View>
  );
}
