import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from './components/CameraComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
