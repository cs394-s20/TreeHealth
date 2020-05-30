import {
    StyleSheet,
    View,
    ScrollView,
  } from "react-native";
  import React, { useState, Component } from "react";
  import TreeChart from "./TreeChart";
  import { Text, ButtonGroup } from "react-native-elements";
  import { Icon } from 'react-native-elements'
  import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from "react-native-gesture-handler";

  const styles = StyleSheet.create({
    header: {
     margin:10,
     marginBottom: 5
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,

    },
    content: {
        margin:10
    },
  });
   
  const MoreGraphsPage = ({route, navigation}) => {

    const { HIData, sapFlowData, VPDData, start, end, selectedIndex } = route.params;

    return (
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 30, marginBottom: 10, marginTop: 30 }}>
            {selectedIndex === 0? "Weekly " : 
            selectedIndex === 1 ? "Monthly " : 
            "Yearly "} 
            Report 
          </Text>
          <Text style={{marginBottom: 10}}> {start} - {end} </Text>
          <Text style={{ fontWeight: "bold", marginTop: 20}}>
            Health Index 
          </Text>
          <TreeChart data={HIData} zero={false} />
          <Text style={{ fontWeight: "bold", marginTop: 10}}>
            Sap Flow (cm/hr)
          </Text>
          <TreeChart data={sapFlowData} zero={true}/>
          <Text style={{ fontWeight: "bold", marginTop: 10}}> 
            VPD (kPa)</Text>
          <TreeChart data={VPDData} zero={true}/>
        </View>
      </ScrollView>
  );
    
}


export default MoreGraphsPage;