import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import InputBox from "components/global/InputBox";
import { handlePropertyChange } from "hooks/components/handleChangeProperty";
import { customizationBoilerplate } from "constants/components/boilerplates";
import { IOptionsLabel } from "../../../typeDefinitions/interfaces/options.interface";
import { Feather } from "@expo/vector-icons";
import { checkForRequiredFields } from "../../../helpers/checkForFields";
const types = ["multiple", "single"];

const CustomizationForm = (props: any) => {
  const {
    editModel,
    setEditModel,
    addToSelector,
    selector,
    editing,
    debouncer,
    setDebouncer,
  } = props;
  const [handleOptionText, setHandleOptionText] = React.useState("");
  const handleDeleteOption = () => {
    // Assuming selector is a state variable representing an array of models

    // Find the index of the editModel in the selector array
    const indexToRemove = selector.findIndex(
      (item: any) => item.name === editModel.name
    );
    console.log("indextoRemoved:", indexToRemove);

    // If editModel is found in the selector array, remove it
    if (indexToRemove !== -1) {
      const updatedSelector = selector.filter(
        (_item: any, index: number) => index !== indexToRemove
      );

      // Now, you can set the updatedSelector state, and it will not contain editModel
      addToSelector(updatedSelector);

      console.log("hello world");
    }
    setDebouncer(true);
  };
  return (
    <View style={styles.addPage}>
      <View style={styles.inputContainer}>
        <View style={styles.header}>
          <Text style={styles.optionText}>
            {editing ? `Editing ${editModel!.name}` : `Create Name`}
          </Text>
          {editing ? (
            <TouchableOpacity
              style={styles.delete}
              onPress={() => handleDeleteOption()}
            >
              <Feather name="trash" size={30} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>

        <InputBox
          value={editModel.name}
          setState={setEditModel}
          property={"name"}
        />
      </View>

      {/* Option type */}
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.optionText}>Option Type</Text>
          <View style={styles.optionTypes}>
            {types.map((type: string, index: number) => (
              <TouchableOpacity
                onPress={() => handlePropertyChange(setEditModel, "type", type)}
                key={index}
                style={[
                  styles.chip,
                  editModel.type === type ? styles.selected : styles.unselected,
                ]}
              >
                <Text
                  style={editModel.type === type ? styles.buttonText : null}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Optional status */}
        <View style={styles.subContainer}>
          <Text style={styles.optionText}>Optional</Text>
          <TouchableOpacity
            style={[styles.chip, styles.optionalButton]}
            onPress={() =>
              handlePropertyChange(
                setEditModel,
                "optional",
                !editModel.optional
              )
            }
          >
            <Text style={styles.optionalButtonText}>
              <AntDesign
                name="star"
                size={24}
                color={editModel.optional ? "#fcd144" : "#f2f0f0"}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.optionText}>{`Add an item to option`}</Text>
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            value={handleOptionText}
            onChangeText={(text: string) => setHandleOptionText(text)}
            placeholder={"Small, Medium, Large, etc..."}
          />
          <TouchableOpacity
            onPress={() => {
              const check = checkForRequiredFields(["label"], {
                label: handleOptionText,
                selected: false,
                optionId: "",
              });

              {
                check === null
                  ? handlePropertyChange(
                      setEditModel,
                      "optionCustomizations",
                      editModel.optionCustomizations.concat({
                        label: handleOptionText,
                        selected: false,
                        optionId: "",
                      })
                    )
                  : Alert.alert(check!);
              }
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "30%" }}>
          <FlatList
            data={editModel.optionCustomizations}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  handlePropertyChange(
                    setEditModel,
                    "optionCustomizations",
                    editModel.optionCustomizations.filter(
                      (_value: IOptionsLabel, optionIndex: number) =>
                        optionIndex !== index
                    )
                  )
                }
                style={[styles.chip]}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Upload Items */}

      <TouchableOpacity
        onPress={() => {
          const check = checkForRequiredFields(
            ["name", "type", "optionCustomizations"],
            editModel
          );

          if (!check) {
            if (editing) {
              const updatedSelector = [...selector];
              const updatedObject = { ...updatedSelector[editModel.index] };
              delete updatedObject.index;
              updatedSelector[editModel.index] = {
                ...updatedObject,
                ...editModel,
              };
              addToSelector(updatedSelector);
              return setEditModel(null);
            }

            addToSelector([...selector, JSON.parse(JSON.stringify(editModel))]);
            setEditModel(customizationBoilerplate); // Reset values
          } else {
            Alert.alert(check as string);
          }
        }}
        style={styles.addItemButton}
      >
        <Text style={styles.addItemButtonText}>
          {editing ? "Editing" : `Add Item`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomizationForm;

const styles = StyleSheet.create({
  delete: {
    padding: "1%",
    paddingHorizontal: "3%",
    borderRadius: 5,
    backgroundColor: "tomato",
    marginLeft: "52.5%",
  },
  header: { flexDirection: "row", alignItems: "center" },
  buttonText: { color: "#fff" },
  input: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#f2f0f0",
    padding: "5%",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#78dbff",
    margin: "3%",
    padding: "5%",
    borderRadius: 5,
  },
  selected: { backgroundColor: "#78dbff" },
  unselected: { backgroundColor: "#fff" },
  inputContainer: { marginHorizontal: "5%" },
  page: { flex: 1, backgroundColor: "#fff" },
  addPage: { backgroundColor: "#fff" },
  addContainer: { flexDirection: "row", alignItems: "center" },
  form: { flex: 2, backgroundColor: "#fff" },
  editText: { fontSize: 20, fontWeight: "bold" },
  optionText: { fontSize: 16, fontWeight: "bold" },
  subContainer: { margin: "5%", alignItems: "center" },
  container: { flexDirection: "row" },
  optionTypes: { flexDirection: "row" },
  chip: {
    backgroundColor: "#fff",
    padding: "3%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    margin: "2%",
    alignItems: "center",
  },
  optionTypeText: { fontSize: 16 },
  optionalText: { fontSize: 16, marginBottom: 10 },
  optionalButton: { paddingHorizontal: "10%" },
  optionalButtonText: {
    fontSize: 16,
  },
  addItemButton: {
    flex: 1,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
  addItemButtonText: { color: "#fff", fontSize: 16 },
});
