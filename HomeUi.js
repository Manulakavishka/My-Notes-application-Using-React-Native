import React, { useState, useEffect } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeUi({ navigation, route }) {
  const ui = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>Create Note</Text>
      <Button title="Go to Create Note" onPress={goToCreateNote} />

      <Text style={styles.text1}>View Note</Text>
      <Button title="Go to View Note" onPress={goToViewNote} />
      {/* <Text style={styles.text1}>Sign Out</Text>
      <Button title="Sign Out" onPress={signOut} /> */}

      {/* <ProfileUi /> */}
    </SafeAreaView>
  );
  return ui;

  async function goToCreateNote() {
    const obj = {
      mobile: await AsyncStorage.getItem("mobile"),
    };
    navigation.navigate("CreateNoteScreen", obj);
  }
  async function goToViewNote() {
    const obj = {
      mobile2: await AsyncStorage.getItem("mobile"),
    };
    navigation.navigate("ViewNotesScreen", obj);
  }

  // async function signOut() {
  //   try {
  //     await AsyncStorage.removeItem("mobile");
  //     // Additional cleanup or API calls as needed
  //     Alert.alert("Info", "signing out");
  //     const obj = {
  //       statu: "0",
  //     };
  //     navigation.navigate("SignInScreen", obj);
  //   } catch (e) {
  //     console.error("Error signing out:", e);
  //     Alert.alert("Error", "Error signing out");
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
