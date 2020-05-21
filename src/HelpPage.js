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

  const SECTIONS = [
    {
      title: 'What is Sap Flow?',
      content: 'Sap flow is the heartbeat of a tree. Throughout a day, sap will travel up through the capillaries for photosynthesis at the tree’s leaves. Sap flow is a direct indicator of a tree’s health—a long-term decrease in sap flow means the tree is not getting the nutrients it needs to survive and flourish.',
    },
    {
      title: 'What is Vapor Pressure Deficit (VPD)?',
      content: 'Vapor Pressure Deficit (VPD) is a pressure difference that creates a suction force that pulls sap from the roots to the leaves. This difference is what drives water movement from the roots to the leaves. VPD is used to measure humidity in the air and determine its impact on tree development. More specifically, it is the pressure difference between the air’s water content and its dew point – the maximum amount the air can carry at its current temperature.',
    },
    {
        title: 'How do Sap Flow and VPD work together?',
        content: 'By measuring VPD on the same time scale as sap flow, we learn how strong the air pressure is sucking sap up the tree. As a result, we can use sap flow and VPD data to accurately describe and track the health of a tree over time. If VPD is low, sap flow is expected to be low. However, if VPD is high and sap flow is low, tree function could be declining. Declines in sap flow caused by stressors like infections and drought precede all visible signs of tree decay such as canopy deterioration, wood rot, and instability.'
     },
  ];
   
  const HelpPage = () => {

    const [activeSections, setActiveSections] = useState([]);
   
    const renderSectionTitle = (section) => {
      return (
        <View style={styles.content}>
          <Text></Text>
        </View>
      );
    };
   
    const renderHeader = section => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
   
    const renderContent = section => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
   
    const updateSections = newActiveSections => {
        setActiveSections(newActiveSections);
    };
   
    
    return (
        <React.Fragment >
            <Accordion
                touchableComponent={TouchableOpacity}
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
            />
        </React.Fragment>
    );
    
  }


export default HelpPage;