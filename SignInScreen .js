import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { View, StyleSheet, Alert, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignInScreen({ navigation, route }) {
  // const obj = {
  //   stu: route.params.statu,
  // };

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid Sri Lankan mobile number."
      );
      return;
    }
    const loginDetails = {
      number1: mobileNumber,
      password: password,
    };
    fetch("http://192.168.1.7/MyNotes/signin.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        setText1(user.status);
        if (user.status == "success") {
          Alert.alert("success", "Success");
          async function saveData() {
            try {
              await AsyncStorage.setItem("mobile", user.mobile);
              const x = await AsyncStorage.getItem("mobile");
              // Alert.alert("Name", x);
            } catch (e) {}
          }
          saveData();
          const obj = { mobile: user.mobile, password: user.password };
          navigation.navigate("Home", obj);
        } else {
          Alert.alert("warning", "Invalid Email Or Password");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }
  const [getText1, setText1] = useState("Response");
  const ui = (
    <View style={styles.container}>
      {/* <Text style={styles.text1}> {getText1}</Text> */}
      <Input
        placeholder="Mobile Number"
        leftIcon={<Icon name="mobile" size={24} color="black" />}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <StatusBar hidden={true} />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign In"
        onPress={handleSignIn}
        containerStyle={styles.button}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );

  const validateMobileNumber = (number) => {
    const mobileNumberPattern = /^(07)[0-9]{8}$/;
    return mobileNumberPattern.test(number);
  };

  useEffect(() => {
    async function checkCredentials() {
      const token = await AsyncStorage.getItem("mobile");

      if (token) {
        // <Stack.Screen name="SignInScreen " component={SignInScreen} />;
        navigation.navigate("Home");
      }
    }
    checkCredentials();
  }, []);

  return ui;
  function handleSignUp() {
    navigation.navigate("RegistrationScreen");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f8ff",
  },
  button: {
    flex: 1, // Equal flex to each button for equal spacing
    marginHorizontal: 1, // Adjust the horizontal spacing between buttons
  },
});
