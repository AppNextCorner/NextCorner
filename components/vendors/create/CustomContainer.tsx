import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {} from "@expo/vector-icons";
import { IOptions } from "../../../typeDefinitions/interfaces/options.interface";

interface IProps {
  customizations: IOptions[];
  setEditModel: React.Dispatch<React.SetStateAction<null | IOptions>>;
}

const CustomContainer = (props: IProps) => {
  const { customizations, setEditModel } = props;
  const editHandler = (item: IOptions, index: number) => {
    setEditModel(item);
    setEditModel((prevState: any) => {
      // Match the callback return with its return type being any or null
      return { ...prevState, index };
    });
  };

  return (
    <View style={styles.page}>
      <View>
        <Text>Customize</Text>
      </View>
      <FlatList
        style={{ backgroundColor: "red" }}
        data={customizations}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => editHandler(item, index)}
            style={styles.optionCard}
          >
            <Text style={styles.optionTitle}>{item.name}</Text>
            <View style={styles.optionsContainer}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {item.optionCustomizations.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[styles.optionButton]}
                    disabled={true}
                  >
                    <Text style={[styles.optionButtonText]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    margin: "5%",
    borderColor: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    padding: "2%",
  },

  optionContainer: {
    marginHorizontal: 20,
  },
  optionCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    borderColor: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: 2,
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
});
