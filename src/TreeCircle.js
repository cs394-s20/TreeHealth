import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import IconBadge from 'react-native-icon-badge';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  unhealthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "rgb(234,170,156)",
    justifyContent: "center",
  },
  warning_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "rgba(239,223,180,255)",
    justifyContent: "center",
  },
  healthy_circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "rgb(188,213,184)",
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
});

const TreeCircle = ({ treeData, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          (treeData.health == 0) ? styles.healthy_circle : (treeData.health == 1 ? styles.warning_circle : styles.unhealthy_circle)
        }
        onPress={() =>
          navigation.navigate("TreeSummary", {
            treedata: treeData,
          })
        }
      >

      <View>
        <React.Fragment>
        <Image  style={{ width: 50, height: 50 }} source={require('./healthy_tree.png')} /> 
        <Avatar 
          icon={treeData.health === 0 ? {name:'check-circle',
          type:'material-icons',color:'green'} :
          treeData.health === 1 ? {name:'warning',
          type:'material-icons', color:'rgb(255,204,51)'} :
          {name:'error',
          type:'material-icons',
          color:'rgb(228,66,4)'}
          }
          rounded
          size='large'
          containerStyle={{ position: 'absolute', top: -70, right: 5}}
        />
        <View>
        <IconBadge 
          // MainElement={
          //   <View style={{backgroundColor:'#489EFE',
          //     width:50,
          //     height:50,
          //     margin:6
          //   }}/>
          // }
          BadgeElement={

            //<Icon name='tree' type='entypo' size="60"></Icon>
            treeData.health === 0 ? <Image  style={{ width: 50, height: 50 }} source={require('./healthy_tree.png')} /> :
            (treeData.health === 1 ?  <Image  style={{ width: 50, height: 50 }} source={require('./declining_tree.png')} /> :
                                      <Image  style={{ width: 50, height: 50 }} source={require('./dead_tree.png')} /> )

          }
          IconBadgeStyle={
            {width:60,
            height:70,
            backgroundColor: treeData.health === 0 ? "rgb(188,213,184)" : treeData.health === 1 ? "rgba(239,223,180,255)" : "rgb(234,170,156)",
            marginRight:45,
            marginTop:-20}
          }
          // Hidden={this.state.BadgeCount==0}
        />
        </View>
      </View>
      </TouchableOpacity>
      <Text style={styles.name}>
        {treeData.name}
      </Text>
      </React.Fragment>
    </View>
    {/*<View style={styles.container}>
      <TouchableOpacity
        style={
          (treeData.health == 0) ? styles.healthy_circle : (treeData.health == 1 ? styles.warning_circle : styles.unhealthy_circle)
        }
        onPress={() =>
          navigation.navigate("TreeSummary", {
            treedata: treeData,
          })
        }
      >
      <View>
        <Avatar 
          icon={treeData.health === 0 ? {name:'check-circle',
          type:'material-icons',color:'green'} :
          treeData.health === 1 ? {name:'warning',
          type:'material-icons', color:'rgb(255,204,51)'} :
          {name:'error',
          type:'material-icons',
          color:'rgb(228,66,4)'}
          }
          rounded
          size='large'
          containerStyle={{ position: 'absolute', top: -70, right: 5}}
        />
        <View>
        <IconBadge 
          // MainElement={
          //   <View style={{backgroundColor:'#489EFE',
          //     width:50,
          //     height:50,
          //     margin:6
          //   }}/>
          // }
          BadgeElement={

            //<Icon name='tree' type='entypo' size="60"></Icon>
            treeData.health === 0 ? <Image  style={{ width: 50, height: 50 }} source={require('./healthy_tree.png')} /> :
            (treeData.health === 1 ?  <Image  style={{ width: 50, height: 50 }} source={require('./declining_tree.png')} /> :
                                      <Image  style={{ width: 50, height: 50 }} source={require('./dead_tree.png')} /> )

          }
          IconBadgeStyle={
            {width:60,
            height:70,
            backgroundColor: treeData.health === 0 ? "rgb(188,213,184)" : treeData.health === 1 ? "rgba(239,223,180,255)" : "rgb(234,170,156)",
            marginRight:45,
            marginTop:-20}
          }
          // Hidden={this.state.BadgeCount==0}
        />
        </View>
      </View>
      </TouchableOpacity>
      <Text style={styles.name}>
        {treeData.name}
      </Text>
    </View>*/}
  );
};

export default TreeCircle;
