import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [feedbackText, setFeedbackText] = useState("");
  const [lastPhoto, setLastPhoto] = useState(null);
  const [showLastPhoto, setShowLastPhoto] = useState(false);
  const [checkError, setError] = useState("Ta");

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Use Blob instead of File if File is not supported
    const blob = new Blob([u8arr], { type: mime });

    // Create a File object if File is supported
    // Note: The third parameter is optional and is used for setting the file's properties
    const file = new File([blob], filename, { type: mime });

    return file;
  }

  function uploadImage(file) {
    file = dataURLtoFile("data:image/jpg;base64", file);
    setError(file);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      fetch(
        "https://api.imgbb.com/1/upload?key=b8cbddd8db33ee8cd07005f8ea480683",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data && data.data.url) {
            alert("Image uploaded successfully!\nURL: " + data.data.url);
          } else {
            alert("Failed to upload ayush. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
        });
    } else {
      alert("Please select an image to upload.");
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setFeedbackText("Taking Photo...");
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo);

        // Save the photo to local storage
        const fileName = `${FileSystem.documentDirectory}photo.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName,
        });
        console.log("Photo saved to:", fileName);
        // Add it to db

        uploadImage(fileName);

        setLastPhoto(fileName);
        setFeedbackText("Photo Taken!");
        setTimeout(() => {
          setFeedbackText("");
        }, 3000);
      } catch (e) {
        console.error("Failed to take picture", e);
        setFeedbackText("Failed to Take Photo");
      }
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
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Text style={styles.flipText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureText}>{checkError}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewLastPhotoButton}
            onPress={showLastPhotoHandler}
          >
            <Text style={styles.captureText}>View Last Photo</Text>
          </TouchableOpacity>
        </View>
        {feedbackText !== "" && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{feedbackText}</Text>
          </View>
        )}
        {showLastPhoto && lastPhoto && (
          <View style={styles.lastPhotoContainer}>
            <Image source={{ uri: lastPhoto }} style={styles.lastPhoto} />
          </View>
        )}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
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
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
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
