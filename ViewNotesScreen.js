import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Sample data for saved notes (replace with your actual data)
const notesWithKeys = [
  {
    id: "none",
    title: "3333",
    description: "2222",
    category: "1111",
    datetime: "0000",
  },
];

export function ViewNotesScreen(navigation, route) {
  const [notes, setNotes] = useState([]);
  async function getMo() {
    const mobile = await AsyncStorage.getItem("mobile");
    const viewData = {
      mobile: mobile,
    };
    fetch("http://192.168.1.7/MyNotes/viewNote.php", {
      method: "POST",
      body: JSON.stringify(viewData),
    })
      .then((response) => {
        return response.json();
      })
      .then((sampleNotes) => {
        // Generate unique keys based on index
        const notesWithKeys = sampleNotes.map((item, index) => ({
          ...item,
          id: index.toString(),
        }));
        setNotes(notesWithKeys);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  useEffect(() => {
    getMo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.title}>Title : {item.title}</Text>
      <Text style={styles.description}>Description: {item.des}</Text>
      <Text style={styles.timestamp}>Category : {item.name}</Text>
      <Text style={styles.timestamp}>Date & Time : {item.date_time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0ffff",
  },
  noteItem: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 8,
    color: "#888",
  },
});
