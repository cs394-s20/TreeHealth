/*This is an Example of Grid View in React Native*/
import { Component, Fragment } from "react";
//import rect in our project
import {
  // Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import TreeCircle from "./src/TreeCircle";
// import treesData from "./src/TreesData.json";
import treesData from "./csv_converstion_script/treesJSON.json";
import TreeGrid from "./src/TreeGrid";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import TreeChart from "./src/TreeChart";
import { Text } from "react-native-elements";

//import all the components we will need

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

function DetailsScreen({ route, navigation }) {
  const { treedata } = route.params;
  console.log(treedata);
  return (
    <ScrollView style={styles.scrollView}>
      <React.Fragment>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text h3>{treedata.name}</Text>
          <View
            style={
              treedata.HI > 5 ? styles.healthy_circle : styles.unhealthy_circle
            }
          >
            <Text style={styles.title}> Health Index (HI) </Text>
            <Text style={styles.name}> {treedata.HI} </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ textAlign: "left", marginRight: 10 }}>
            SAP FLOW: {treedata.SAP}
          </Text>
          <Text style={{ textAlign: "right" }}>VPD: {treedata.VPD}</Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text> Sap Flow (cm/hr) </Text>
          <TreeChart data={sapflow_data} />
          <Text> VPD (kPa)</Text>
          <TreeChart data={vpd_data} />
        </View>
      </React.Fragment>
    </ScrollView>
  );
}

const vpd_data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const sapflow_data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

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
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  unhealthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "red",
    justifyContent: "center",
  },
  healthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "green",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 10,
  },
  scrollView: {
    backgroundColor: "white",
    // marginHorizontal: 10,
  },
});

export default App;
