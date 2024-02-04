import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
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
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 130 : 20,
  },
  flipButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
});

export default CameraComponent;
