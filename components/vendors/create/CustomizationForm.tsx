import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import InputBox from "components/global/InputBox";
import { handlePropertyChange } from "hooks/components/handleChangeProperty";
import { customizationBoilerplate } from "constants/components/boilerplates";
const types = ["multiple", "single"];

const CustomizationForm = (props: any) => {
  const { editModel, setEditModel, addToSelector, selector, editing } = props;
  return (
    <View style={styles.add}>
      <Text>
        {editing ? `Editing ${editModel!.name}` : `Add an item to option`}
      </Text>
      <View style={styles.inputContainer}>
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
                style={styles.chip}
              >
                <Text style={styles.optionTypeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Optional status */}
        <View style={styles.subContainer}>
          <Text style={styles.optionText}>Optional</Text>
          <TouchableOpacity
            style={styles.chip}
            // onPress={() => setEdit({ ...editModel, optional: !editModel.optional })}
          >
            <Text style={styles.optionalButtonText}>*</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Items */}

      <TouchableOpacity
        onPress={() => {
          //if (!checkObjectProperties(editModel)) return;

          if (editing) {
            console.log('editModel: ', editModel);
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
  inputContainer: { marginHorizontal: "5%" },
  page: { flex: 1, backgroundColor: "#fff" },
  add: { backgroundColor: "#fff" },
  form: { flex: 2, backgroundColor: "#fff" },
  editText: { fontSize: 20, fontWeight: "bold" },
  optionText: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  subContainer: { margin: "5%", alignItems: "center" },
  container: { flexDirection: "row" },
  optionTypes: { flexDirection: "row" },
  chip: {
    backgroundColor: "#fff",
    padding: "2%",
    paddingHorizontal: "3%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    margin: "2%",
    alignItems: "center",
  },
  optionTypeText: { fontSize: 16 },
  optionalText: { fontSize: 16, marginBottom: 10 },
  optionalButton: { backgroundColor: "#f2f2f2" },
  optionalButtonText: { fontSize: 16 },
  addItemButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
  addItemButtonText: { color: "#fff", fontSize: 16 },
});
