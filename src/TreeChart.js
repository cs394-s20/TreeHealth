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
} from "react-native";
import { LineChart, SafeAreaView, ScrollView } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
  propsForDots: {
    r: "0",
  },
  propsForBackgroundLines:{
    strokeWidth:"0",
  }
};

const TreeChart = ({ data }) => {
  return (
    <View style={{ marginBottom: 0 }}>
      <LineChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{ marginBottom: -20}}
      />
    </View>
  );
};

export default TreeChart;
