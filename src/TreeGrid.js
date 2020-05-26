import { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import TreeCircle from "./TreeCircle";

const TreeGrid = ({ treesData, navigation }) => {
  const [items, setItems] = useState(Object.values(treesData.trees));

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "center" }}
      data={items}
      renderItem={({ item }) => (
        <TreeCircle treeData={item} navigation={navigation}></TreeCircle>
      )}
      //Setting the number of column
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default TreeGrid;
