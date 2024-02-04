import React, { useState,useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import Tesseract from 'tesseract.js';


const ImageToText = ({imageUri}) => {

  useEffect(()=>{
handleImageToText(imageUri)
  },[])
  useEffect(()=>{
    handleImageToText(imageUri)
      },[imageUri])
  const [extractedText, setExtractedText] = useState('');

  const handleImageToText = async (imageUri) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "EIlOygyJOw1uIeyz4bGFcKTXQf7Oh93F");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    fetch(`https://api.apilayer.com/image_to_text/url?url=${imageUri}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log("sajbsdakjsbehksabhfwevbfvsejcvJHBD",result))
      .catch(error => console.log('error', error));
  };

  return (
    <View>

        <Text>this componenet has been rendered</Text>

      <Text>{extractedText}</Text>
    </View>
  );
};

export default ImageToText;
