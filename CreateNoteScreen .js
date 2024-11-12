import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CreateNoteScreen({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function handleCreateNote() {
    const mobile = await AsyncStorage.getItem("mobile");
    if (title == "") {
      Alert.alert("warning", "Please Fill Title");
    } else if (description == "") {
      Alert.alert("warning", "Please Fill Description");
    } else if (category == "" || category == null) {
      Alert.alert("warning", "Please Select Category");
    } else {
      const createNoteData = {
        title: title,
        description: description,
        category: category,
        mobile: mobile,
      };
      fetch("http://192.168.1.7/MyNotes/createNote.php", {
        method: "POST",
        body: JSON.stringify(createNoteData),
      })
        .then((response) => {
          return response.json();
        })
        .then((noteData) => {
          if (noteData.status == "success") {
            Alert.alert("success", "Success");
          } else {
            Alert.alert("warning", noteData.status);
          }
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
    }
  }
  useEffect(() => {
    fetch("http://192.168.1.7/MyNotes/catagoryload.php")
      .then((response) => response.json())
      .then((data) => {
        // Update the items state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>{category}</Text> */}
      <Input placeholder="Title" onChangeText={setTitle} />
      <Input
        placeholder="Description"
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={setCategory}
        placeholder="Select an Category"
        style={{ backgroundColor: "#e0ffff" }}
        containerStyle={{ width: 320, marginBottom: 20 }}
      />
      <StatusBar hidden={true} />
      <Button
        title="Create Note"
        style={styles.btn}
        onPress={handleCreateNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5fffa",
  },
  btn: {
    backgroundColor: "#00bfff",
    color: "#00bfff",
  },
});
