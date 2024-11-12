import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";

export function RegistrationScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

  function handleRegistration() {
    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid Sri Lankan mobile number."
      );
      return;
    } else if (
      firstName == "" ||
      lastName == "" ||
      userType == "" ||
      useState == null ||
      password == ""
    ) {
      Alert.alert("Warning", "Please Fill All the Fields.");
    } else {
      const registrationData = {
        number1: mobileNumber, // Replace with user input or actual data
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        password: password,
      };

      // Implement your registration logic here
      fetch("http://192.168.1.7/MyNotes/register.php", {
        method: "POST",
        body: JSON.stringify(registrationData),
      })
        .then((response) => {
          return response.json();
        })
        .then((userRegi) => {
          if (userRegi.status == "success") {
            Alert.alert("success", "Success");
          } else {
            Alert.alert("warning", userRegi.status);
          }
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
    }
  }

  const ui = (
    <View style={styles.container}>
      <Input
        placeholder="Mobile Number"
        leftIcon={<Icon name="mobile" size={24} color="black" />}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <Input
        placeholder="First Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={setFirstName}
      />
      <Input
        placeholder="Last Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={setLastName}
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={setUserType}
        placeholder="Select an User Type"
        style={{ backgroundColor: "#e0ffff" }}
        containerStyle={{ width: 320, marginBottom: 8 }}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
  const validateMobileNumber = (number) => {
    const mobileNumberPattern = /^(07)[0-9]{8}$/;
    return mobileNumberPattern.test(number);
  };
  useEffect(() => {
    fetch("http://192.168.1.7/MyNotes/loadusertypes.php")
      .then((response) => response.json())
      .then((data) => {
        // Update the items state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#e0ffff",
  },
});
