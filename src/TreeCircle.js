import React from "react";
import { StyleSheet, Text, View } from "react-native";
import treesData from "./TreesData.json";

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10,
        backgroundColor: 'red'
     },
  });  

const TreeCircle = ({treeData}) => {    
  return (
    <View style={styles.container}>
        <View style={styles.circle}>
            <Text>I AM NOT A TREEE</Text>
        </View>
    </View>
  );
}

export default TreeCircle

