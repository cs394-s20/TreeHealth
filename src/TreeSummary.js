import {
    StyleSheet,
    View,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import TreeChart from "./TreeChart";
  import { Text, ButtonGroup } from "react-native-elements";
  import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  unhealthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "red",
    justifyContent: "center",
  },
  warning_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "yellow",
    justifyContent: "center",
  },
  healthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "green",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 10,
  },
  scrollView: {
    backgroundColor: "white",
  },
});

const constructData = (treeData, datatype, viewtype) => {
  let labels = [];
  let datasets = [];
  let startDate = "";
  let endDate = "";

  // Week View
  if (viewtype === 0) {
    for (
      let i = treeData["data"].length - 8;
      i < treeData["data"].length;
      i++
    ) {
      if (i === treeData["data"].length - 8) {
        startDate = treeData["data"][i]["date"];
      }
      if (i === treeData["data"].length - 1) {
        endDate = treeData["data"][i]["date"];
      }
      // labels.push(treeData["data"][i]["date"]);
      datasets.push(treeData["data"][i][datatype]);
      labels.push("");
    }
  }

  // Month View
  if (viewtype === 1) {
    for (
      let i = treeData["data"].length - 30;
      i < treeData["data"].length;
      i++
    ) {
      if (i === treeData["data"].length - 30) {
        startDate = treeData["data"][i]["date"];
      }
      if (i === treeData["data"].length - 1) {
        endDate = treeData["data"][i]["date"];
      }
      datasets.push(treeData["data"][i][datatype]);
      labels.push("");
      // if (i % 2 === 0) {
      //   labels.push(treeData["data"][i]["date"]);
      // }
    }
  }

  // Year View
  if (viewtype === 2) {
    let num_days = treeData["data"].length;
    if (treeData["data"].length >= 365) {
      num_days = 365;
    }
    for (
      let i = treeData["data"].length - num_days;
      i < treeData["data"].length;
      i++
    ) {
      if (i === treeData["data"].length - num_days) {
        startDate = treeData["data"][i]["date"];
      }
      if (i === treeData["data"].length - 1) {
        endDate = treeData["data"][i]["date"];
      }
      // labels.push(treeData["data"][i]["date"]);
      labels.push("");
      datasets.push(treeData["data"][i][datatype]);
    }
  }

  let graphData = {};
  graphData["labels"] = labels;

  let datasets2 = [];
  for (let i = 0; i < datasets.length; i++) {
    datasets2.push(i);
  }
  graphData["datasets"] = [{ data: datasets }];

  return [graphData, startDate, endDate];
};

const Toggle = ({ selectedIndex, setSelectedIndex }) => {
  const component1 = () => <Text>Week</Text>;
  const component2 = () => <Text>Month</Text>;
  const component3 = () => <Text>Year</Text>;
  const buttons = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
  ];
  return (
    <ButtonGroup
      onPress={setSelectedIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{ height: 50 }}
    />
  );
};

function DetailsScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { treedata } = route.params;

  const [sapFlowData, SAPstartDate, SAPendDate] = constructData(
    treedata,
    "scaledSapFlow",
    selectedIndex
  );
  const [VPDData, VPDstartDate, VPDendDate] = constructData(
    treedata,
    "scaledVPD",
    selectedIndex
  );

  return (
    <ScrollView style={styles.scrollView}>
      <React.Fragment>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text h3>{treedata.name}</Text>
          <View
            style={
              treedata.health == 0
                ? styles.healthy_circle
                : treedata.health == 1
                ? styles.warning_circle
                : styles.unhealthy_circle
            }
          >
            {/*<Text style={styles.title}> Health Index (HI) </Text>
            <Text style={styles.name}> {(treedata.data[treedata.data.length - 1].H_index).toFixed(2)} </Text> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ textAlign: "left", marginRight: 10 }}>
            SAP FLOW:{" "}
            {treedata.data[treedata.data.length - 1].sapFlow.toFixed(2)}
          </Text>
          <Text style={{ textAlign: "right" }}>
            VPD: {treedata.data[treedata.data.length - 1].VPD}
          </Text>
        </View>
        {treedata.health !== 0?
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
        <Icon
            name='report-problem'
            type='material'
            color='orange'
          />
        <Text>Tree's health is at risk. Contact an arborist.</Text>
        </View>
        :null}
        <Toggle
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{fontWeight: 'bold',marginTop:15}}> Sap Flow (cm/hr) </Text>
          <TreeChart data={sapFlowData} />
          <Text style={{ marginBottom: 40, marginTop: 0 }}>
            {SAPstartDate} - {SAPendDate}
          </Text>
          <Text style={{fontWeight: 'bold'}}> VPD (kPa)</Text>
          <TreeChart data={VPDData} />
          <Text style={{ marginBottom: 40, marginTop: 0 }}>
            {VPDstartDate} - {VPDendDate}
          </Text>
        </View>
      </React.Fragment>
    </ScrollView>
  );
}

export default DetailsScreen;