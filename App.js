/*This is an Example of Grid View in React Native*/
import { Component } from 'react';
//import rect in our project
import {
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

//import all the components we will need

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <View style={styles.MainContainer}>
      <TreeGrid treesData={treesData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});



export default App