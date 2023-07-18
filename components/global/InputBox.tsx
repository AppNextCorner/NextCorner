import { handlePropertyChange } from "hooks/components/handleChangeProperty";
import { TextInput, StyleSheet } from "react-native";
import IInput from "../../typeDefinitions/interfaces/IComponents/input.interface";

const InputBox = ({ value, setState, property }: IInput) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={(text: string) =>
        handlePropertyChange(setState, property, text)
      }
      placeholder={property}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#f2f0f0",
    padding: "5%",
  },
});
