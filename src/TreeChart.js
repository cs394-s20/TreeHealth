import React, {useState} from 'react';
import {
  Text, 
  Button, 
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LineChart,SafeAreaView, ScrollView} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(0, 0,0, ${opacity})`
}

const TreeChart = ({data}) => {
	return (
		<View>
		  <LineChart
			  data={data}
			  width={screenWidth}
			  height={220}
			  chartConfig={chartConfig}
        bezier
        verticalLabelRotation={90}
			/>
		</View>
	)
}

export default TreeChart