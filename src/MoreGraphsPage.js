import { StyleSheet, View, ScrollView, Alert } from "react-native";
import React, { useState, Component } from "react";
import TreeChart from "./TreeChart";
import { Text, ButtonGroup } from "react-native-elements";
import { Icon } from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreGraphsPage = ({ route, navigation }) => {
  const {
    HIData,
    sapFlowData,
    VPDData,
    start,
    end,
    selectedIndex,
  } = route.params;

  return (
    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          {selectedIndex === 0
            ? "Week "
            : selectedIndex === 1
            ? "Month "
            : "Year "}
          Report
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {" "}
          {start} - {end}{" "}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 15,
            }}
          >
            Health Index
          </Text>
          <Icon
            name="info"
            style={{ marginTop: 10, marginLeft: 10 }}
            type="material"
            onPress={() =>
              Alert.alert(
                "How is the Health Index calculated?",
                "By measuring VPD on the same time scale as sap flow, we learn how strong the air pressure is sucking sap up the tree. As a result, we can use sap flow and VPD data to accurately describe and track the health of a tree over time. If VPD is low, sap flow is expected to be low. However, if VPD is high and sap flow is low, tree function could be declining. Declines in sap flow caused by stressors like infections and drought precede all visible signs of tree decay such as canopy deterioration, wood rot, and instability."
              )
            }
            color="rgb(86,140,201)"
          />
        </View>
        <TreeChart data={HIData} zero={false} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 50,
            }}
          >
            Sap Flow (cm/hr)
          </Text>
          <Icon
            name="info"
            style={{ marginTop: 45, marginLeft: 10 }}
            type="material"
            onPress={() =>
              Alert.alert(
                "What is Sap Flow?",
                "Sap flow is the heartbeat of a tree. Throughout a day, sap will travel up through the capillaries for photosynthesis at the tree’s leaves. Sap flow is a direct indicator of a tree’s health—a long-term decrease in sap flow means the tree is not getting the nutrients it needs to survive and flourish."
              )
            }
            color="rgb(86,140,201)"
          />
        </View>
        <TreeChart data={sapFlowData} zero={true} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 50,
            }}
          >
            VPD (kPa)
          </Text>
          <Icon
            name="info"
            style={{ marginTop: 45, marginLeft: 10 }}
            type="material"
            onPress={() =>
              Alert.alert(
                "What is Vapor Pressure Deficit (VPD)?",
                "Vapor Pressure Deficit (VPD) is a pressure difference that creates a suction force that pulls sap from the roots to the leaves. This difference is what drives water movement from the roots to the leaves. VPD is used to measure humidity in the air and determine its impact on tree development. More specifically, it is the pressure difference between the air’s water content and its dew point – the maximum amount the air can carry at its current temperature."
              )
            }
            color="rgb(86,140,201)"
          />
        </View>
        <TreeChart data={VPDData} zero={true} />
      </View>
    </ScrollView>
  );
};

export default MoreGraphsPage;
