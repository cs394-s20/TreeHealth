/*This is an Example of Grid View in React Native*/
import { Component } from 'react';
//import rect in our project
import {
  Text, 
  Button, 
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import TreeCircle from './src/TreeCircle';
import treesData from './src/TreesData.json';
import TreeGrid from './src/TreeGrid';
import { createStackNavigator } from "@react-navigation/stack"; 
import { NavigationContainer } from "@react-navigation/native";
import TreeChart from './src/TreeChart'

//import all the components we will need


function Dashboard() {
  return (
    <View style={styles.MainContainer}>
      <TreeGrid treesData={treesData}/>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Dashboard />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Sap Flow (cm/hr) </Text>
      <TreeChart data={sapflow_data}/>
      <Text> VPD (kPa)</Text>
      <TreeChart data={vpd_data}/>
      <Button
        title="Return to Home"
        onPress={() => navigation.navigate('TreeHealth')}
      />
    </View>
  );
}

const vpd_data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

const sapflow_data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TreeHealth" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    height: "100%"
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});



export default App