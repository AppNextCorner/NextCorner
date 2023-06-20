import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function OptionSelectionComponent(props) {
  const { data, header, onSelect } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handlePress = (item, option) => {
    let updatedOptions = [];
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
                {item.optionCustomizations.map((option) => (
                  <TouchableOpacity
                    key={option.label}
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

const styles = {
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
