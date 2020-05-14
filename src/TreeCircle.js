import React from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
      // backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    unhealthy_circle: {
      width: 150,
      height: 150,
      borderRadius: 75,
      margin: 10,
      backgroundColor: 'red',
      justifyContent: 'center', 
     },
     healthy_circle: {
      width: 150,
      height: 150,
      borderRadius: 75,
      margin: 10,
      backgroundColor: 'green',
      justifyContent: 'center', 
     },
     name: {
      textAlign: "center",
      fontSize: 25
     }, 
      title: {
      textAlign: "center",
      fontSize: 10
     }
  });  

const TreeCircle = ({treeData,navigation}) => {    
  return (
    <View style={styles.container} >
        <TouchableOpacity 
          style={treeData.HI > 5 ? styles.healthy_circle : styles.unhealthy_circle} 
          onPress={() => navigation.navigate('TreeSummary',{
            treedata: treeData,
          })}>
          <Text style={styles.title}> Health Index (HI) </Text>
          <Text style={styles.name}> {treeData.HI} </Text>
        </TouchableOpacity>
        <Text style={styles.name} onPress={() => navigation.navigate('Details')}>{treeData.name}</Text>
    </View>
  );
}

export default TreeCircle

