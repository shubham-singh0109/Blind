import React, { useState,useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import Tesseract from 'tesseract.js';
import TextToSpeech from './TextToSpeech'

const ImageToText = ({imageUri}) => {
  const[message,setMessage]=useState("")

  useEffect(()=>{
handleImageToText(imageUri)
  },[])
  useEffect(()=>{
    handleImageToText(imageUri)
      },[imageUri])
  const [extractedText, setExtractedText] = useState('');

  const handleImageToText = async (imageUri) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "8CfWn4YZrimQ44Pvv4sScDH03hCBo28Y");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    fetch(`https://api.apilayer.com/image_to_text/url?url=${imageUri}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result && result.all_text){
          setMessage(result.annotations.join(" "))
        }
      })

      .catch(error => console.log('error', error));
  };

  return (
    <View>
        <TextToSpeech message={message}/>
    </View>
  );
};

export default ImageToText;
