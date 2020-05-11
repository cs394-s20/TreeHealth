
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import TreeCircle from "./src/TreeCircle";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      <Text>Open up App.js to start working on your app!!!</Text>
      <Text>Open up App.js to start working on your app!!!</Text>
      <FlatList
        data={[5,4,3,34,243,23,423]}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <Text>I am {item}</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList 
        horizontal={false}
        numColumn={3}
        style={{flexWrap:'wrap', width:300}}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ item }) => (
          <TreeCircle
          />
        )}
        keyExtractor={item => item} 
         >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
