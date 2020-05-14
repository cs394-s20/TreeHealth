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
import TreeCircle from './TreeCircle';
import treesData from './TreesData.json';

//import all the components we will need

const TreeGrid = ({treesData}) => {
  console.log(treesData)
  console.log(Object.values(treesData))
  const [items, setItems] = useState(Object.values(treesData.trees));


  return (
      <FlatList
        columnWrapperStyle={{justifyContent:'center'}}
        data={items}
        renderItem={({ item }) => (
          <TreeCircle treeData={ item }></TreeCircle>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
  );
}

export default TreeGrid