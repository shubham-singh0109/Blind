# Third i

## Description
Presenting Third i, a cutting-edge cross-platform application that combines audio and visual elements in a seamless manner. With just one click, our software uses cutting-edge technology to convert photographs into vibrant text, allowing you to capture the moment. Behind the scenes, our backend works its magic to extract relevant content from photographs. Transform extracted text into an expressive and inclusive voice with our text-to-speech technology, elevating the user experience with an extra layer of accessibility. The third I is where voices can be heard and images can talk.

## Table of Contents
- [Project Build]
- [Necessary Libraries]
- [Insttallation]
- [Usage]
- [Contribution]

## Project Build
The project Third i is build on recta-native application for converting Image to text and then text to speech using Expo's Speech API. The application is accessing the camera and with the help of that user can click a picture and the functionalities used in the application will revert the information in the form of speech.

Keynote: Before running the project, make sure you have the following installed-
- [Node.js]
- [Expo CLI]

## Necessary Libraries
import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import ImageToText from "./image_to_text";
import * as Speech from 'expo-speech';

import React, { useState,useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import TextToSpeech from './TextToSpeech'

## Installation
Clone the repository.
Navigate to the project directory
Install dependencies with the command 'yarn install'

## Usage
Run the app using 'yarn start'.
Scan the Expo QR in your android or ios devices. 
Click the picture by pressing anywhere on the mobile screen.

## Contribution
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make changes and commit with the proper message while pushing.
4. Push the branch.
5. Craete a pull request.

