import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeech({message}) {
  const speak = (message) => {
if(message&&message.length){
    const thingToSay = message;
    Speech.speak(thingToSay,{language:'en'});
}
  };
  useEffect(()=>{
    speak(message)
  },[message])

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
