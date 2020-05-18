/*This is an Example of Grid View in React Native*/
import { Component, Fragment } from "react";
import {
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
import treesData from "./csv_converstion_script/treesJSON.json";
import TreeGrid from "./src/TreeGrid";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TreeChart from "./src/TreeChart";
import { Text, ButtonGroup } from "react-native-elements";


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


const constructData = (treeData, datatype, viewtype) => {
  let labels = [];
  let datasets = [];

  // Week View
  if (viewtype === 0) {
    for (
      let i = treeData["data"].length - 8;
      i < treeData["data"].length;
      i++
    ) {
      labels.push(treeData["data"][i]["date"]);
      datasets.push(treeData["data"][i][datatype]);
    }
  }

  // Month View
  if (viewtype === 1) {
    for (
      let i = treeData["data"].length - 30;
      i < treeData["data"].length;
      i++
    ) {
      datasets.push(treeData["data"][i][datatype]);
      if (i % 2 === 0) {
        labels.push(treeData["data"][i]["date"]);
      }
    }
  }

  // Year View
  if (viewtype === 2) {
    for (
      let i = treeData["data"].length - 8;
      i < treeData["data"].length;
      i++
    ) {
      labels.push(treeData["data"][i]["date"]);
      datasets.push(treeData["data"][i][datatype]);
    }
  }

  let graphData = {};
  graphData["labels"] = labels;
  graphData["datasets"] = [{ data: datasets }];

  return graphData;
};

function DetailsScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { treedata } = route.params;

  const sapFlowData = constructData(treedata, "scaledSapFlow", selectedIndex);
  const VPDData = constructData(treedata, "scaledVPD", selectedIndex);

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
              treedata.health ? styles.healthy_circle : styles.unhealthy_circle
            }
          >
            <Text style={styles.title}> Health Index (HI) </Text>
            <Text style={styles.name}> {(treedata.data[treedata.data.length - 1].H_index).toFixed(2)} </Text>
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
            SAP FLOW:{" "}
            {treedata.data[treedata.data.length - 1].sapFlow.toFixed(2)}
          </Text>
          <Text style={{ textAlign: "right" }}>
            VPD: {treedata.data[treedata.data.length - 1].VPD}
          </Text>
        </View>
        <Toggle
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text> Sap Flow (cm/hr) </Text>
          <TreeChart data={sapFlowData} />
          <Text> VPD (kPa)</Text>
          <TreeChart data={VPDData} />
        </View>
      </React.Fragment>
    </ScrollView>
  );
}

const Toggle = ({ selectedIndex, setSelectedIndex }) => {
  const component1 = () => <Text>Week</Text>;
  const component2 = () => <Text>Month</Text>;
  const component3 = () => <Text>Year</Text>;
  const buttons = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
  ];
  return (
    <ButtonGroup
      onPress={setSelectedIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{ height: 50 }}
    />
  );
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
  },
});

export default App;
