import { StyleSheet, View } from "react-native";
import React, { useState, useEffect} from "react";
import firebase from './src/firebase';
// import treesData from "./csv_converstion_script/treesJSON.json";
import TreeGrid from "./src/TreeGrid";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailsScreen from "./src/TreeSummary";
import HelpPage from "./src/HelpPage";
import TreeCamera from "./src/TreeCamera";


const db = firebase.database().ref();

const App = () => {


  const [treeData, setTreeData] = useState({trees:[]});

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) 
        setTreeData(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  function Dashboard({ navigation }) {
    return (
      <View style={styles.MainContainer}>
        <TreeGrid treesData={treeData} navigation={navigation} />
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TreeHealth" component={HomeScreen} />
        <Stack.Screen name="TreeSummary" component={DetailsScreen} />
        <Stack.Screen name="HelpPage" component={HelpPage} />
        <Stack.Screen name="CameraPage" component={TreeCamera} />
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
