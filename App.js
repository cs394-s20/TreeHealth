import {
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import treesData from "./csv_converstion_script/treesJSON.json";
import TreeGrid from "./src/TreeGrid";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailsScreen from './src/TreeSummary';

function Dashboard({ navigation }) {
  return (
    <View style={styles.MainContainer}>
      <TreeGrid treesData={treesData} navigation={navigation} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Dashboard navigation={navigation} />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TreeHealth" component={HomeScreen} />
        <Stack.Screen name="TreeSummary" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    height: "100%",
  },
});

export default App;