import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import ImageToText from "./image_to_text";
import * as Speech from 'expo-speech';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [feedbackText, setFeedbackText] = useState("");
  const [lastPhoto, setLastPhoto] = useState(null);
  const [showLastPhoto, setShowLastPhoto] = useState(false);
  const [setImage,setURI]=useState("")
  const [count,setCount]=useState(0)
  const cameraRef = useRef(null);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      Speech.speak("Press anywhere",{language:'en'});
    })();
  }, []);

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    setCount((count)=>count+1)
    if (cameraRef.current) {
      if(count%2!==0){
      Speech.stop()
      return
      }
      try {
        
        const photo = await cameraRef.current.takePictureAsync();

        // Save the photo to local storage
        const fileName = `${FileSystem.documentDirectory}photo.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName,
        });

        // Upload the photo
        uploadImage(fileName);



        setTimeout(() => {
          setFeedbackText("");
        }, 3000);
      } catch (e) {
        console.error("Failed to take picture", e);
        setFeedbackText("Failed to Take Photo");
      }
    }
  };

  const uploadImage = async (filePath) => {
    const fileUri = `file://${filePath}`;
    const formData = new FormData();
    formData.append("image", {
      uri: fileUri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=b8cbddd8db33ee8cd07005f8ea480683",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.data && data.data.url) {
        setURI(data.data.url)
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  const showLastPhotoHandler = () => {
    setShowLastPhoto(true);
    setTimeout(() => {
      setShowLastPhoto(false);
    }, 3000);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Text style={styles.flipText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewLastPhotoButton}
            onPress={showLastPhotoHandler}
          >
            <Text style={styles.captureText}>View Last Photo</Text>
          </TouchableOpacity>
        </View> */}
        {/* {feedbackText !== "" && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{feedbackText}</Text>
          </View>
        )} */}
        {/* {showLastPhoto && lastPhoto && (
          <View style={styles.lastPhotoContainer}>
            <Image source={{ uri: lastPhoto }} style={styles.lastPhoto} />
          </View>
        )} */}
        <ImageToText imageUri={setImage} />
      </Camera>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width:'100%',
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 700,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  flipText: {
    color: "white",
    fontSize: 15,
  },
  captureButton: {
    // alignSelf: "flex-end",
    // alignItems: "center",
    // padding: 15,
    // backgroundColor: "rgba(255, 255, 255, 0.7)",
    // borderRadius: 5,
     width:'100%',
     flexDirection: "row",
  },
  viewLastPhotoButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0, 255, 0, 0.7)",
    borderRadius: 5,
  },
  captureText: {
    color: "black",
    fontSize: 15,
  },
  feedbackContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  lastPhotoContainer: {
    position: "absolute",
    top: 20,
    width: "100%",
    alignItems: "center",
  },
  lastPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default CameraComponent;
