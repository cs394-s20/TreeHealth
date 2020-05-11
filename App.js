/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import TreeCircle from './src/TreeCircle';
//import all the components we will need

const App = () => {
  const [items, setItems] = useState([1,3,3,3,3,7,5,5,1243,2,42,34,32,412,42,134,123,42,4,2134124,213,432,4,34,3,4,3,4,34,34,3,412,3,4,34,3,4,34,4,3,42,42134,]);

  return (
    <View style={styles.MainContainer}>
      <FlatList
        columnWrapperStyle={{justifyContent:'center'}}
        data={items}
        renderItem={({ item }) => (
          <TreeCircle></TreeCircle>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
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