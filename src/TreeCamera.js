import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import firebase from './firebase';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const { width: winWidth, height: winHeight } = Dimensions.get('window')

const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor : "red",
        borderColor: "transparent",
    },
    galleryContainer: {
        bottom: 100
    },
    galleryImageContainer: {
        width: 75,
        height: 75,
        marginRight: 5,
    },
    galleryImage: {
        width: 75,
        height:  75,
    }
});

const TreeCamera = ({route, navigation}) => {
  const [captures, setCaptures] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  let cameraRef = useRef(null);
  let serialNumber = route.params.serialNumber;
  // console.log('test')
  // console.log(serialNumber)

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(status === "granted");
  };

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    //console.log("haha")
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      let photo = await cameraRef.current.takePictureAsync();
      setCaptures([photo, ...captures]);
      MediaLibrary.saveToLibraryAsync(photo.uri);
      // console.log(photo.url);
      //console.log(photo.uri);
      const blob = await (await fetch(photo.uri)).blob();
      
      var storageRef = firebase.storage().ref();
      var name = new Date().getTime().toString()+'.jpg';
      storageRef.child(name).put(blob, {
        contentType: 'image/jpeg'
      }).then(() => {
        var dbRef = firebase.database().ref();
        const fetchimage = (snapshot) => {
          // dbRef.off("value",fetchimage)
          if(snapshot.val()){
            var allTrees = snapshot.val().trees;
            //console.log(snapshot.val().trees)
            for (var i = 0; i < allTrees.length; i++){
              if (allTrees[i].serialNumber === serialNumber){
                dbRef.child('trees').child(i).child('imagePath').set(name);
                break;
              }
            }
          }
          dbRef.off("value",fetchimage)
        }
        // Attach an asynchronous callback to read the data at our posts reference
        dbRef.on("value", fetchimage,
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    });

      
    }
  };

  const pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    const blob = await (await fetch(photo.uri)).blob();
      
    var storageRef = firebase.storage().ref();
    var name = new Date().getTime().toString()+'.jpg';
    storageRef.child(name).put(blob, {
      contentType: 'image/jpeg'
    });

    var dbRef = firebase.database().ref();
    const fetchimage = (snapshot) => {
      // dbRef.off("value",fetchimage)
      if(snapshot.val()){
        var allTrees = snapshot.val().trees;
        //console.log(snapshot.val().trees)
        for (var i = 0; i < allTrees.length; i++){
          if (allTrees[i].serialNumber === serialNumber){
            dbRef.child('trees').child(i).child('imagePath').set(name);
            break;
          }
        }
      }
      dbRef.off("value",fetchimage)
    }
    // Attach an asynchronous callback to read the data at our posts reference
    dbRef.on("value", fetchimage,
     function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }); 
  };

  const Gallery = ({captures=[]}) => (
    <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}
    >
        {captures.map(({uri}) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{uri}} style={styles.galleryImage}/>
            </View>
        ))}
    </ScrollView>
);

  return hasPermission === null ? (
    <View />
  ) : hasPermission === false ? (
    <Text>No access to camera</Text>
  ) : (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
      {captures.length > 0 && <Gallery captures={captures}/>}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => pickImage()}
          >
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => takePicture()}
          >
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => handleCameraType()}
          >
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default TreeCamera;
