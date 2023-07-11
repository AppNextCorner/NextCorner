import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextStyle,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { IOptions } from "../../typeDefinitions/interfaces/options.interface";

interface Option {
  label: string;
}

interface Item {
  name: string;
  type: string;
  _id: string;
  optionCustomizations: Option[];
}

interface OptionSelectionComponentProps {
  customizations: IOptions[];
  header: () => JSX.Element;
  initialOptions: [] | Option[]; // Handles whether a user has ordered previously
  changePreference: React.Dispatch<React.SetStateAction<any>>;
}

export default function OptionSelectionComponent(
  props: OptionSelectionComponentProps
) {
  let { customizations, header, changePreference, initialOptions } = props;
  // Starting with no options selected
  const [selectedCustoms, setSelectedCustoms] = useState<Item[]>(() => {
    return customizations.map((item) => ({
      ...item,
      optionCustomizations: initialOptions,
    }));
  });

  /**
   * Handles the selection of an option for a specific item.
   *
   * @param item - The selected item.
   * @param option - The selected option for the item.
   * @param index - The index of the item in the list.
   */
  const handlePress = (item: Item, option: Option, index: number) => {
    setSelectedCustoms((prevCustoms) => {
      // Create a copy of the previous customs array
      const updatedCustoms = [...prevCustoms];

      // Create a copy of the selected item
      const selectedItem = { ...updatedCustoms[index] };

      // Create a copy of the selected options array
      const selectedOptions = [...selectedItem.optionCustomizations];

      // Find the index of the selected option in the options array
      const optionIndex = selectedOptions.findIndex(
        (o) => o.label === option.label
      );

      // Perform option selection based on the item type
      if (item.type === "single") {
        // Single selection, update the selected option
        if (optionIndex === -1) {
          selectedOptions.splice(0, selectedOptions.length, option);
        } else {
          selectedOptions.splice(optionIndex, 1);
        }
      } else if (item.type === "multiple") {
        // Multiple selection, toggle the selected option
        if (optionIndex === -1) {
          selectedOptions.push(option);
        } else {
          selectedOptions.splice(optionIndex, 1);
        }
      }

      // Update the option customizations for the selected item
      selectedItem.optionCustomizations = selectedOptions;

      // Update the updated customs array with the modified item
      updatedCustoms[index] = selectedItem;

      // Return the updated customs array
      return updatedCustoms;
    });

    // Update the preference in the parent component
    changePreference((prevState: Iitem) => {
      return {
        ...prevState,
        customizations: selectedCustoms,
      };
    });
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
      flexDirection: "row",
    },
    optionTitle: {
      fontSize: 15,
      fontWeight: "bold",
      flex: 0.5,
    },
    optionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1,
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
        data={customizations}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>{item.name}</Text>
            <View style={styles.optionsContainer}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {item.optionCustomizations.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionButton,
                      selectedCustoms[index]?.optionCustomizations.some(
                        (o) => o.label === option.label
                      ) && styles.optionButtonSelected,
                    ]}
                    onPress={() => handlePress(item, option, index)}
                  >
                    <FontAwesome
                      style={styles.selectIcon}
                      name={
                        selectedCustoms[index]?.optionCustomizations.some(
                          (o) => o.label === option.label
                        )
                          ? "check-square"
                          : "square-o"
                      }
                      size={24}
                      color={
                        selectedCustoms[index]?.optionCustomizations.some(
                          (o) => o.label === option.label
                        )
                          ? "#fff"
                          : "#78DBFF"
                      }
                    />
                    <Text
                      style={[
                        styles.optionButtonText,
                        selectedCustoms[index]?.optionCustomizations.some(
                          (o) => o.label === option.label
                        ) && styles.optionButtonTextSelected,
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
