import React, { useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LineChart, SafeAreaView, ScrollView } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
  propsForDots: {
    r: "0",
  },
  propsForBackgroundLines: {
    strokeWidth: "0",
  },
};

const TreeChart = ({ data, zero, showVerticalLabels}) => {
  let testdata = JSON.parse(JSON.stringify(data));
  const maxValue = {data: [10], color: () => `rgba(0, 0, 0, 0)` }
  testdata.datasets.push(maxValue)

  return (
    <View style={{ marginBottom: 0 }}>
      <LineChart
        data={testdata}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{ marginBottom: -20 }}
        fromZero={zero}
        withHorizontalLabels={showVerticalLabels}
        xLabelsOffset={10}
        verticalLabelRotation={-45}
      />
    </View>
  );
};

export default TreeChart;
