
import { View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../store/hook";
import { setUser } from "../../store/userSession";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const signIn = () => {
    if(!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);

            dispatch( setUser({
                name: "HenryBenry",
                age: 16
            }));
        }, 2000)
    }

    

  };
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}
    >
      <Text>Hey i am not signed in</Text>

      <TouchableOpacity
        onPress={signIn}
        style={{ backgroundColor: "red", marginTop: 50 }}
      >
        <Text>{isLoading ? "loading" : "log in"}</Text>
      </TouchableOpacity>
    </View>
  );
}