import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./RegistrationScreen";
import { SignInScreen } from "./SignInScreen ";
import { CreateNoteScreen } from "./CreateNoteScreen ";
import { ViewNotesScreen } from "./ViewNotesScreen";
import { HomeUi } from "./HomeUi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import React, { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();
function App({}) {
  var ui = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignInScreen " component={SignInScreen} />

        <Stack.Screen name="Home" component={HomeUi} />

        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} />
        <Stack.Screen name="ViewNotesScreen" component={ViewNotesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return ui;
}

export default App;
