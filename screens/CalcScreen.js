import React, { useState, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { useDarkMode } from "../components/DarkModeContext";
import TextInputButton from "../components/TextInputButton";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import Bmi from "./Bmi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import AcknowledgementsModal from "../components/Acknowledgements";

function CalcScreen({ navigation }) {
  // Reference dimension : iPhone 14
  // console.log(Dimensions.get("window").width);  390
  // console.log(Dimensions.get("window").height);  844
  const [buttonState, setButtonState] = useState("");
  const [weight, setWeight] = useState(0);
  const { isDarkMode } = useDarkMode();
  const [files, setFileArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const getFilePaths = async () => {
    try {
      const savedValue = await AsyncStorage.getItem("files");
      if (savedValue !== null) {
        const filesArray = JSON.parse(savedValue);
        setFileArray(filesArray);
        console.log("Files retrieved (CalcScreen): ", files);
      }
    } catch (e) {
      console.error("Error retrieving files (CalcScreen): ", e);
    }
  };
  const saveFiles = async (filesArray) => {
    try {
      const jsonValue = JSON.stringify(filesArray);
      await AsyncStorage.setItem("files", jsonValue).then(() =>
        console.log(
          "Successfully saved to AsyncStorage (saveFiles - CalcScreen): ",
          jsonValue
        )
      );
    } catch (e) {
      console.error("Error saving files (saveFiles - CalcScreen): ", e);
    }
  };
  useEffect(() => {
    getFilePaths();
  }, []);
  function genName(type) {
    const d = new Date();
    let uniqueName = type + d.toISOString();
    return uniqueName;
  }

  function roundOff(value, places) {
    const factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
  }

  const drugs = async (weight) => {
    try {
      let PDFOptions = {
        html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s21 {
    background-color: #4285f4;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s52 {
    border-left: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s12 {
    background-color: #ffff00;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s38 {
    background-color: #ff0000;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s42 {
    background-color: #93c47d;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s16 {
    background-color: #ffff00;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s32 {
    background-color: #6aa84f;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s40 {
    background-color: #ff0000;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s20 {
    background-color: #4285f4;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s36 {
    background-color: #ff0000;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s48 {
    background-color: #999999;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s27 {
    background-color: #d9ead3;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s50 {
    background-color: #999999;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s4 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s22 {
    background-color: #4285f4;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s6 {
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s3 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s15 {
    background-color: #ffff00;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s51 {
    border-right: none;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s45 {
    background-color: #999999;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s55 {
    background-color: #9900ff;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s0 {
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s10 {
    background-color: #ffff00;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s26 {
    background-color: #d9ead3;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s11 {
    background-color: #ffff00;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s37 {
    background-color: #ff0000;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s19 {
    background-color: #4285f4;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s2 {
    background-color: #ffffff;
    text-align: right;
    font-weight: bold;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s53 {
    background-color: #9900ff;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s54 {
    background-color: #9900ff;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s39 {
    background-color: #ff0000;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s46 {
    background-color: #999999;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s59 {
    background-color: #9900ff;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s25 {
    background-color: #4285f4;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s30 {
    background-color: #6aa84f;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s44 {
    background-color: #999999;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s56 {
    background-color: #9900ff;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s29 {
    background-color: #6aa84f;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s58 {
    background-color: #9900ff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s14 {
    background-color: #ffff00;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s28 {
    background-color: #6aa84f;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s35 {
    background-color: #ff0000;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s41 {
    background-color: #ff0000;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s34 {
    background-color: #6aa84f;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s17 {
    background-color: #ffffff;
    text-align: right;
    color: #666666;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s7 {
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s18 {
    background-color: #ffffff;
    text-align: right;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s33 {
    background-color: #6aa84f;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s47 {
    background-color: #999999;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s9 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s23 {
    background-color: #4285f4;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s31 {
    background-color: #6aa84f;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s57 {
    background-color: #9900ff;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s43 {
    background-color: #ea9999;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s5 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #6aa84f;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s24 {
    background-color: #4285f4;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s13 {
    background-color: #ffff00;
    text-align: center;
    font-weight: bold;
    color: #1155cc;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s1 {
    background-color: #cfe2f3;
    text-align: right;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 15pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s8 {
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s49 {
    background-color: #999999;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
</style>

<div class="ritz grid-container" dir="ltr">
  <table class="waffle" cellspacing="0" cellpadding="0">
    <tbody>
      <tr style="height: 20px">
        <th id="0R0" style="height: 20px" class="row-headers-background"></th>
        <td class="s0" dir="ltr">Key in weight</td>
        <td class="freezebar-cell"></td>
        <td class="s1" dir="ltr">${roundOff(weight, 2)}</td>
        <td class="s2" dir="ltr">kg</td>
        <td class="s3" dir="ltr"></td>
        <td class="s4" dir="ltr"></td>
        <td class="s5"></td>
        <td class="s6"></td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R1" style="height: 20px" class="row-headers-background"></th>
        <td class="s8"></td>
        <td class="freezebar-cell"></td>
        <td class="s2" dir="ltr">mg/kg per dose</td>
        <td class="s2" dir="ltr">upper limit</td>
        <td class="s3" dir="ltr">dose (mg)</td>
        <td class="s4" dir="ltr">upper limit</td>
        <td class="s5" dir="ltr">volume (ml)</td>
        <td class="s8" dir="ltr">notes/ route</td>
        <td class="s9" dir="ltr">max mg/ dose</td>
        <td class="s8" dir="ltr">notes</td>
        <td class="s8" dir="ltr">mg/ml</td>
        <td></td>
      </tr>
      <tr>
        <th
          style="height: 3px"
          class="freezebar-cell freezebar-horizontal-handle"
        ></th>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R2" style="height: 20px" class="row-headers-background"></th>
        <td class="s10" dir="ltr">Induction</td>
        <td class="freezebar-cell"></td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td class="s12"></td>
        <td class="s13"></td>
        <td class="s14"></td>
        <td class="s15"></td>
        <td class="s16"></td>
        <td class="s15"></td>
        <td class="s15"></td>
        <td class="s15"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R3" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">4</div>
        </th>
        <td class="s6" dir="ltr">Propofol</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">3</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 3, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 3) / 10, 2)}</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R4" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Etomidate</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.3</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.3, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.3) / 2, 2)}</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">2</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R5" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">6</div>
        </th>
        <td class="s6" dir="ltr">Ketamine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">2</td>
        <td class="s17" dir="ltr">3</td>
        <td class="s3">${roundOff(weight * 2, 2)}</td>
        <td class="s4">${roundOff(weight * 3, 2)}</td>
        <td class="s5">${roundOff((weight * 3) / 10, 2)}</td>
        <td class="s6" dir="ltr">IV induction</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td class="s6" dir="ltr">(diluted to 10ml)</td>
      </tr>
      <tr style="height: 20px">
        <th id="0R6" style="height: 20px" class="row-headers-background"></th>
        <td class="s6"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">5</td>
        <td class="s17" dir="ltr">10</td>
        <td class="s3">${roundOff(weight * 5, 2)}</td>
        <td class="s4">${roundOff(weight * 10, 2)}</td>
        <td class="s5">${roundOff((weight * 5) / 10, 2)}</td>
        <td class="s6" dir="ltr">IM induction</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R7" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">4</td>
        <td class="s17" dir="ltr">12</td>
        <td class="s3">${roundOff(weight * 4, 2)}</td>
        <td class="s4">${roundOff(weight * 12, 2)}</td>
        <td class="s5">${roundOff((weight * 4) / 10, 2)}</td>
        <td class="s6" dir="ltr">Analgesia</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R8" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Midazolam</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr">1</td>
        <td class="s3">${roundOff(weight * 0.5, 2)}</td>
        <td class="s4">${roundOff(weight * 1, 2)}</td>
        <td class="s5"></td>
        <td class="s6" dir="ltr">PO</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R9" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr"></td>
        <td class="s17" dir="ltr">0.3</td>
        <td class="s3">${roundOff(weight * 0.3, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.3) / 5, 2)}</td>
        <td class="s6" dir="ltr">Intranasal</td>
        <td class="s7"></td>
        <td></td>
        <td class="s6" dir="ltr"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R10" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr">0.2</td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4">${roundOff(weight * 0.2, 2)}</td>
        <td class="s5">${roundOff((weight * 0.1) / 10, 2)}</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">1</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R11" style="height: 20px" class="row-headers-background"></th>
        <td class="s19" dir="ltr">Opioids</td>
        <td class="freezebar-cell"></td>
        <td class="s20" dir="ltr"></td>
        <td class="s20" dir="ltr"></td>
        <td class="s21"></td>
        <td class="s22"></td>
        <td class="s23"></td>
        <td class="s24"></td>
        <td class="s25"></td>
        <td class="s24"></td>
        <td class="s24"></td>
        <td class="s24"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R12" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">
          Fentanyl <span style="font-weight: bold">(mcg)</span>
        </td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">1</td>
        <td></td>
        <td class="s26">${roundOff(weight, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff(weight / 50, 2)} mL</td>
        <td class="s6" dir="ltr">IV neat</td>
        <td class="s7"></td>
        <td class="s6 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 97px; left: -1px">
            analgesic: consider 50% dose reduction for age &lt;6 mo
          </div>
        </td>
        <td class="s18" dir="ltr">50</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R13" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr"></td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff(weight / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV diluted to 10ml</td>
        <td class="s7" dir="ltr"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td class="s6" dir="ltr"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R14" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Morphine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff(weight * 0.1, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr"></td>
        <td></td>
        <td class="s18" dir="ltr">1</td>
        <td class="s6" dir="ltr">(diluted to 10ml)</td>
      </tr>
      <tr style="height: 20px">
        <th id="0R15" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">16</div>
        </th>
        <td class="s6" dir="ltr">Oxycodone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.2</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.2, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff(weight * 0.2, 2)} mL</td>
        <td class="s6" dir="ltr">PO</td>
        <td class="s7" dir="ltr"></td>
        <td></td>
        <td class="s18" dir="ltr">1</td>
        <td class="s6" dir="ltr">(diluted to 10ml)</td>
      </tr>
      <tr style="height: 20px">
        <th id="0R16" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Remifentanil</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.01</td>
        <td class="s17" dir="ltr">1</td>
        <td class="s26">${roundOff(weight * 0.01, 2)} mcg</td>
        <td class="s27">${roundOff(weight, 2)} mcg</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">mcg/kg/min</td>
        <td class="s7" dir="ltr"></td>
        <td></td>
        <td class="s6" dir="ltr"></td>
        <td class="s6" dir="ltr"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R17" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Naloxone (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.5, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6" dir="ltr">0.5-1mcg/kg</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R18" style="height: 20px" class="row-headers-background"></th>
        <td class="s28" dir="ltr">Analgesics</td>
        <td class="freezebar-cell"></td>
        <td class="s29"></td>
        <td class="s29"></td>
        <td class="s30"></td>
        <td class="s31"></td>
        <td class="s32"></td>
        <td class="s33"></td>
        <td class="s34"></td>
        <td class="s33"></td>
        <td class="s33"></td>
        <td class="s33"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R19" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Paracetamol</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">${roundOff(weight * 7.5, 2)}</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">7.5</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 7.5) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV/PO</td>
        <td class="s7" dir="ltr">40mg/kg/ day</td>
        <td class="s6" dir="ltr">&lt;1 mo</td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R20" style="height: 20px" class="row-headers-background"></th>
        <td class="s6"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">10</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 10, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff(weight * 1, 2)} mL</td>
        <td class="s6" dir="ltr">IV/PO</td>
        <td class="s7" dir="ltr">40mg/kg/ day</td>
        <td class="s6" dir="ltr">1 - 6 mo</td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R21" style="height: 20px" class="row-headers-background"></th>
        <td class="s6"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">15</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 15, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 15) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV/PO</td>
        <td class="s7" dir="ltr">4g/ day</td>
        <td class="s6" dir="ltr">&gt;6 mo</td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R22" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ibuprofen</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">10</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 10, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 10) / 4, 2)} mL</td>
        <td class="s6" dir="ltr">IV/PO</td>
        <td class="s7" dir="ltr">400</td>
        <td class="s6 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 97px; left: -1px">
            &gt;6 mo. dilution min. 3mg/ml
          </div>
        </td>
        <td class="s18" dir="ltr">4</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R23" style="height: 20px" class="row-headers-background"></th>
        <td class="s35" dir="ltr">NMBs/ Reversal agents</td>
        <td class="freezebar-cell"></td>
        <td class="s36" dir="ltr"></td>
        <td class="s36" dir="ltr"></td>
        <td class="s37"></td>
        <td class="s38"></td>
        <td class="s39"></td>
        <td class="s40"></td>
        <td class="s41"></td>
        <td class="s40"></td>
        <td class="s40"></td>
        <td class="s40"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R24" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Atracurium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">%{roundOff(weight *0.5,2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.5) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R25" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Mivacurium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.15</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.15, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.15) / 2, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">2</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R26" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Cisatracurium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.1) / 2, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">2</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R27" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Vecuronium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff(weight * 0.1, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 97px; left: -1px">
            reconstitute as 1 mg/ml
          </div>
        </td>
        <td class="s18" dir="ltr">1</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R28" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Rocuronium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.6</td>
        <td class="s17" dir="ltr">1.2</td>
        <td class="s3">${roundOff(weight * 0.6, 2)}</td>
        <td class="s4">${roundOff(weight * 1.2, 2)}</td>
        <td class="s5">${roundOff((weight * 0.6) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R29" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Suxamethonium</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">2</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 2, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 2) / 50, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">50</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R30" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">4</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 4, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 4) / 50, 2)} mL</td>
        <td class="s6" dir="ltr">IM</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">50</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R31" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">32</div>
        </th>
        <td class="s42" dir="ltr">Neostigmine (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">50</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 50, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 50) / 2500, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">2500</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R32" style="height: 20px" class="row-headers-background"></th>
        <td class="s43" dir="ltr">Atropine (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">20</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 20, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 20) / 600, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">600</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R33" style="height: 20px" class="row-headers-background"></th>
        <td class="s43" dir="ltr">Glycopyrrolate (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">10</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 10, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 10) / 200, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">200</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R34" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Sugammadex</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">2</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 2, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 2) / 20, 2)} mL</td>
        <td class="s6" dir="ltr">mod block (T2)</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">100</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R35" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">4</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 4, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 4) / 100, 2)} mL</td>
        <td class="s6" dir="ltr">deep block</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">100</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R36" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">16</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 16, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 16) / 100, 2)} mL</td>
        <td class="s6" dir="ltr">emergent reversal</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">100</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R37" style="height: 20px" class="row-headers-background"></th>
        <td class="s44" dir="ltr">Others</td>
        <td class="freezebar-cell"></td>
        <td class="s45" dir="ltr"></td>
        <td class="s45" dir="ltr"></td>
        <td class="s46"></td>
        <td class="s47"></td>
        <td class="s48"></td>
        <td class="s49"></td>
        <td class="s50"></td>
        <td class="s49"></td>
        <td class="s49"></td>
        <td class="s49"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R38" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Dexamethasone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.15</td>
        <td class="s17" dir="ltr">0.25</td>
        <td class="s3">${roundOff(weight * 0.15, 2)}</td>
        <td class="s4">${roundOff(weight * 0.25, 2)}</td>
        <td class="s5">${roundOff((weight * 0.15) / 4, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">4</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R39" style="height: 20px" class="row-headers-background">\</th>
        <td class="s6" dir="ltr">Hydrocortisone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">1</td>
        <td class="s17" dir="ltr">2</td>
        <td class="s3">${roundOff(weight * 1, 2)}</td>
        <td class="s4">${roundOff(weight * 2, 2)}</td>
        <td class="s5">${roundOff(weight * 1, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s6" dir="ltr"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R40" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Methyl Prednisone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">1</td>
        <td class="s17"></td>
        <td class="s3">${roundOff(weight * 1, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff(weight * 1, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s6" dir="ltr"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R41" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ranitidine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17"></td>
        <td class="s3">${roundOff(weight * 0.5, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.5) / 25, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">25</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R42" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Pantoprazole/Omeprazole</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">1</td>
        <td class="s17"></td>
        <td class="s3">${roundOff(weight * 1, 2)}</td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6" dir="ltr">&gt; 1 yr</td>
        <td class="s6" dir="ltr"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R43" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ondansetron</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.15</td>
        <td class="s17"></td>
        <td class="s3">${roundOff(weight * 0.15, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.15) / 2, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">2</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R44" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Metoclopramide</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17"></td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4"></td>
        <td class="s5">${roundOff((weight * 0.1) / 5, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6" dir="ltr">&gt; 2 yr</td>
        <td class="s18" dir="ltr">5</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R45" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">MgSO4</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">25</td>
        <td class="s17" dir="ltr">50</td>
        <td class="s3">${roundOff(weight * 25, 2)}</td>
        <td class="s4">${roundOff(weight * 50, 2)}</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R46" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ca gluconate</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">30</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 30, 2)}</td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">3g/ dose</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R47" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ca chloride</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">5</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 5, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6" dir="ltr">5-10mg/kg</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R48" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Frusemide</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr">2</td>
        <td class="s3">${roundOff(weight * 0.5, 2)}</td>
        <td class="s4">${roundOff(weight * 2, 2)}</td>
        <td class="s5">${roundOff((weight * 0.5) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R49" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Mannitol</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">250</td>
        <td class="s17" dir="ltr">1000</td>
        <td class="s3">${roundOff(weight * 250, 2)}</td>
        <td class="s4">${roundOff(weight * 1000, 2)}</td>
        <td class="s5" dir="ltr">${roundOff((weight * 250) / 200, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s6" dir="ltr"></td>
        <td class="s18" dir="ltr">200</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R50" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Levetiracetam</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">20</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 20, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td class="s51 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 198px; left: -1px">
            loading: 2-5mg/kg/min
          </div>
        </td>
        <td class="s52"></td>
        <td class="s52"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R51" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Phenytoin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">20</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 20, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 20) / 50, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">50</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R52" style="height: 20px" class="row-headers-background"></th>
        <td class="s53" dir="ltr">BP/ resus</td>
        <td class="freezebar-cell"></td>
        <td class="s54" dir="ltr"></td>
        <td class="s54" dir="ltr"></td>
        <td class="s55"></td>
        <td class="s56"></td>
        <td class="s57"></td>
        <td class="s58"></td>
        <td class="s59"></td>
        <td class="s58"></td>
        <td class="s58"></td>
        <td class="s58"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R53" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Phenylephrine (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr">1</td>
        <td class="s26">${roundOff(weight * 0.5, 2)} mcg</td>
        <td class="s27">${roundOff(weight * 1, 2)} mcg</td>
        <td class="s5" dir="ltr">${roundOff((weight * 0.5) / 100, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">100</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R54" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ephedrine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr">0.2</td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4">${roundOff(weight * 0.2, 2)}</td>
        <td class="s5" dir="ltr">${roundOff((weight * 0.1) / 3, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">3</td>
        <td class="s6" dir="ltr">(10ml syringe)</td>
      </tr>
      <tr style="height: 20px">
        <th id="0R55" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Atropine (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">20</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 20, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 20) / 600, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">600</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R56" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Adenosine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr">0.2</td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4">${roundOff(weight * 0.2, 2)}</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R57" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Esmolol</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.5, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 0.5) / 10, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">10</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R58" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Labetalol</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.1</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.1, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr">${roundOff((weight * 0.1) / 5, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">5</td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R59" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Adenosine</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.2</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 0.2, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">12</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R60" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Amiodarone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">5</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 5, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">150mg</td>
        <td class="s6" dir="ltr">loading</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R61" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">5</td>
        <td class="s17" dir="ltr">10</td>
        <td class="s26" dir="ltr">${roundOff(weight * 5, 2)} mcg/kg/min</td>
        <td class="s27" dir="ltr">${roundOff(weight * 10, 2)} mcg/kg/min</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr"></td>
        <td class="s6" dir="ltr">infusion</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R62" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">63</div>
        </th>
        <td class="s6" dir="ltr">Adrenaline (mcg)</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">0.5</td>
        <td class="s17" dir="ltr">1</td>
        <td class="s26">${roundOff(weight * 0.5, 2)} mcg</td>
        <td class="s27">${roundOff(weight * 1, 2)} mcg</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">vasopressor</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R63" style="height: 20px" class="row-headers-background"></th>
        <td class="s6"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">10</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 10, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV bolus</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R64" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">65</div>
        </th>
        <td class="s6"></td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">100</td>
        <td class="s17" dir="ltr"></td>
        <td class="s26">${roundOff(weight * 100, 2)} mcg</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">ETT</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R65" style="height: 20px" class="row-headers-background"></th>
        <td class="s44" dir="ltr">ABx</td>
        <td class="freezebar-cell"></td>
        <td class="s45" dir="ltr"></td>
        <td class="s45" dir="ltr"></td>
        <td class="s46"></td>
        <td class="s47"></td>
        <td class="s48"></td>
        <td class="s49"></td>
        <td class="s50"></td>
        <td class="s49"></td>
        <td class="s49"></td>
        <td class="s49"></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R66" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Cefazolin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">30</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 30, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R67" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Augmentin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">40</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 40, 2)}</td>
        <td class="s4" dir="ltr">1200</td>
        <td class="s5" dir="ltr">${roundOff((weight * 40) / 1000, 2)} mL</td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td class="s18" dir="ltr">100</td>
        <td class="s6" dir="ltr">(diluted to 12ml)</td>
      </tr>
      <tr style="height: 20px">
        <th id="0R68" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ceftriaxone</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">50</td>
        <td class="s17" dir="ltr">75</td>
        <td class="s3">${roundOff(weight * 50, 2)}</td>
        <td class="s4">${roundOff(weight * 75, 2)}</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">2000</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R69" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Ciprofloxacin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">10</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 10, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">400</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R70" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Metronidazole</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">15</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 15, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R71" style="height: 20px" class="row-headers-background">
          <div class="row-header-wrapper" style="line-height: 20px">72</div>
        </th>
        <td class="s6" dir="ltr">Tazocin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">100</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 100, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th id="0R72" style="height: 20px" class="row-headers-background"></th>
        <td class="s6" dir="ltr">Vancomycin</td>
        <td class="freezebar-cell"></td>
        <td class="s17" dir="ltr">15</td>
        <td class="s17" dir="ltr"></td>
        <td class="s3">${roundOff(weight * 15, 2)}</td>
        <td class="s4"></td>
        <td class="s5" dir="ltr"></td>
        <td class="s6" dir="ltr">IV</td>
        <td class="s7" dir="ltr">1000</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
`,
        fileName: genName("drugs"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const ett_vitals = async (weight) => {
    try {
      let PDFOptions = {
        html: `
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s0 {
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s4 {
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s3 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s1 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 15pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s2 {
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
</style>
<div class="ritz grid-container" dir="ltr">
  <table class="waffle" cellspacing="0" cellpadding="0">
    <tbody>
      <tr style="height: 20px">
        <th
          id="616017813R0"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Key in age</td>
        <td class="s1" dir="ltr">${weight}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R1"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td class="s2"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R2"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Uncuffed ETT</td>
        <td class="s3">${weight / 4 + 4}</td>
        <td class="s0" dir="ltr">(age/4) + 4</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R3"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Cuffed ETT</td>
        <td class="s3">${weight / 4 + 3}</td>
        <td class="s0" dir="ltr">(age/4) + 3</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R4"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R5"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">ETT depth</td>
        <td class="s3">${weight / 2 + 12}</td>
        <td class="s0" dir="ltr">(age/2) + 12</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R6"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td class="s4"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R7"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td class="s4"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R8"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R9"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R10"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R11"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R12"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R13"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R14"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R15"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R16"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R17"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R18"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R19"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R20"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R21"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R22"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R23"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R24"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R25"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R26"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R27"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R28"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R29"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R30"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R31"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R32"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R33"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R34"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="616017813R35"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
<div
  id="embed_1328711887"
  class="waffle-embedded-object-overlay"
  style="width: 742px; height: 568px; display: block"
>
  <img
    src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17H3NnWRFjSLSbhT4Np8PrOzVdnk-I-EZ8RYnEiCiEsWg3vXlKS0ObtEOZ09-VlTd7L3woSdixSJbXFcVahQ-ZRB4bv8DD3smZaMKewyaHuvKM6iXdk9WYkhLlUuN_FXNI26J55mPQ?key=VtDPs3KdCU3_v3SpqAGctDUj"
    style="display: block"
    height="568"
    width="742"
  />
</div>
<script>
  function posObj(sheet, id, row, col, x, y) {
    var rtl = false;
    var sheetElement = document.getElementById(sheet);
    if (!sheetElement) {
      sheetElement = document.getElementById(sheet + "-grid-container");
    }
    if (sheetElement) {
      rtl = sheetElement.getAttribute("dir") == "rtl";
    }
    var r = document.getElementById(sheet + "R" + row);
    var c = document.getElementById(sheet + "C" + col);
    if (r && c) {
      var objElement = document.getElementById(id);
      var s = objElement.style;
      var t = y;
      while (r && r != sheetElement) {
        t += r.offsetTop;
        r = r.offsetParent;
      }
      var offsetX = x;
      while (c && c != sheetElement) {
        offsetX += c.offsetLeft;
        c = c.offsetParent;
      }
      if (rtl) {
        offsetX -= objElement.offsetWidth;
      }
      s.left = offsetX + "px";
      s.top = t + "px";
      s.display = "block";
      s.border = "1px solid #000000";
    }
  }

  function posObjs() {
    posObj("616017813", "embed_1328711887", 8, 0, 0, 16);
  }
  posObjs();
</script>
`,
        fileName: genName("ett_vitals"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const pain = async (weight) => {
    try {
      let PDFOptions = {
        html: `
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s0 {
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s17 {
    background-color: #999999;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s3 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s6 {
    background-color: #4285f4;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s11 {
    border-left: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s1 {
    background-color: #ffffff;
    text-align: right;
    font-weight: bold;
    color: #980000;
    font-family: Arial;
    font-size: 15pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s9 {
    border-right: none;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s5 {
    background-color: #4285f4;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s14 {
    background-color: #6aa84f;
    text-align: center;
    font-weight: bold;
    color: #4a86e8;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s8 {
    background-color: #ffffff;
    text-align: right;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s18 {
    border-left: none;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s13 {
    background-color: #6aa84f;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s10 {
    border-left: none;
    border-right: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s15 {
    background-color: #999999;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s12 {
    background-color: #6aa84f;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s7 {
    background-color: #4285f4;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s2 {
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s4 {
    background-color: #4285f4;
    text-align: left;
    font-weight: bold;
    color: #ffffff;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
  .ritz .waffle .s16 {
    background-color: #999999;
    text-align: left;
    color: #000000;
    font-family: Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 2px 3px 2px 3px;
  }
</style>
<div class="ritz grid-container" dir="ltr">
  <table class="waffle" cellspacing="0" cellpadding="0">
    <tbody>
      <tr style="height: 20px">
        <th
          id="1626070742R0"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Key in weight</td>
        <td class="s1" dir="ltr">${weight}</td>
        <td class="s0" dir="ltr">kg</td>
        <td class="s0" dir="ltr"></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R1"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s2 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 43px; left: -1px">
            mg/kg per dose
          </div>
        </td>
        <td class="s3" dir="ltr">dose</td>
        <td class="s2" dir="ltr">age</td>
        <td class="s2" dir="ltr">route</td>
        <td class="s2" dir="ltr">Freq</td>
        <td class="s2" dir="ltr">max mg/ dose</td>
        <td class="s2" dir="ltr">formulation</td>
        <td class="s2" dir="ltr">notes</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th
          style="height: 3px"
          class="freezebar-cell freezebar-horizontal-handle"
        ></th>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
        <td class="freezebar-cell"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R2"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s4" dir="ltr">Opioids</td>
        <td class="s5" dir="ltr"></td>
        <td class="s6"></td>
        <td class="s5"></td>
        <td class="s5"></td>
        <td class="s5"></td>
        <td class="s5"></td>
        <td class="s5"></td>
        <td class="s5"></td>
        <td class="s7"></td>
        <td class="s7"></td>
        <td class="s7"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R3"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Fentanyl (mcg)</td>
        <td class="s8" dir="ltr">1</td>
        <td class="s3">${weight} mcg</td>
        <td></td>
        <td class="s0" dir="ltr">IV</td>
        <td></td>
        <td class="s0"></td>
        <td class="s0" dir="ltr"></td>
        <td class="s9 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 298px; left: -1px">
            consider 50% dose reduction for age &lt;6 mo
          </div>
        </td>
        <td class="s10"></td>
        <td class="s11"></td>
        <td class="s11"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R4"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R5"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Morphine</td>
        <td class="s8" dir="ltr">0.4</td>
        <td class="s3">${weight * 0.4}</td>
        <td></td>
        <td class="s0" dir="ltr">PO</td>
        <td class="s0" dir="ltr">Q6H</td>
        <td class="s0" dir="ltr">10</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R6"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8" dir="ltr">0.1</td>
        <td class="s3">${weight * 0.1}</td>
        <td></td>
        <td class="s0" dir="ltr">IV</td>
        <td></td>
        <td class="s0"></td>
        <td class="s0" dir="ltr"></td>
        <td class="s9 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 198px; left: -1px">
            IV infusion: 20mcg/kg/h
          </div>
        </td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R7"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Oxycodone</td>
        <td class="s8" dir="ltr">0.2</td>
        <td class="s3">${weight * 0.2}</td>
        <td></td>
        <td class="s0" dir="ltr">PO</td>
        <td class="s0" dir="ltr">Q6H</td>
        <td class="s0" dir="ltr">10</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R8"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s12" dir="ltr">Analgesics</td>
        <td class="s13"></td>
        <td class="s14"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
        <td class="s13"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R9"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Paracetamol</td>
        <td class="s8" dir="ltr">7.5</td>
        <td class="s3">${weight * 7.5}</td>
        <td class="s0" dir="ltr">&lt;1 mo</td>
        <td class="s0" dir="ltr">IV/ PO</td>
        <td class="s0" dir="ltr">Q6H</td>
        <td class="s0" dir="ltr">40mg/kg/ day</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R10"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8" dir="ltr">10</td>
        <td class="s3">${weight * 10}</td>
        <td class="s0" dir="ltr">1 - 6 mo</td>
        <td class="s0" dir="ltr">IV/ PO</td>
        <td class="s0" dir="ltr">Q6H</td>
        <td class="s0" dir="ltr">40mg/kg/ day</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R11"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8" dir="ltr">15</td>
        <td class="s3">${weight * 15}</td>
        <td class="s0" dir="ltr">&gt;6 mo</td>
        <td class="s0" dir="ltr">IV/ PO/ PR</td>
        <td class="s0" dir="ltr">Q6H</td>
        <td class="s0" dir="ltr">4g/ day</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R12"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Ibuprofen</td>
        <td class="s8" dir="ltr">10</td>
        <td class="s3">${weight * 10}</td>
        <td class="s0" dir="ltr">&gt;6 mo</td>
        <td class="s0" dir="ltr">IV/ PO</td>
        <td class="s0" dir="ltr">Q6-8H</td>
        <td class="s0" dir="ltr">400</td>
        <td class="s0" dir="ltr"></td>
        <td class="s9 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 198px; left: -1px">
            dilution min. 3mg/ml
          </div>
        </td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R13"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Celecoxib</td>
        <td class="s8" dir="ltr">3</td>
        <td class="s3">${weight * 3}</td>
        <td class="s0" dir="ltr">&gt;2 y</td>
        <td class="s0" dir="ltr">PO</td>
        <td class="s0" dir="ltr">BD</td>
        <td class="s0" dir="ltr">200</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R14"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Diclofenac</td>
        <td class="s8" dir="ltr">1</td>
        <td class="s3">${weight}</td>
        <td class="s0" dir="ltr">&gt;6 y</td>
        <td class="s0" dir="ltr">PR</td>
        <td class="s0" dir="ltr">Q8H</td>
        <td class="s0" dir="ltr">50</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R15"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Etoricoxib</td>
        <td></td>
        <td class="s3" dir="ltr">60-90</td>
        <td></td>
        <td class="s0" dir="ltr">PO</td>
        <td class="s0" dir="ltr">OD</td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R16"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Ketorolac</td>
        <td class="s8" dir="ltr">0.5</td>
        <td class="s3"></td>
        <td class="s0" dir="ltr">&gt;2 y</td>
        <td class="s0" dir="ltr">IV</td>
        <td class="s0" dir="ltr">BD</td>
        <td class="s0" dir="ltr"></td>
        <td class="s0" dir="ltr"></td>
        <td class="s0" dir="ltr"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R17"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Tramadol</td>
        <td class="s8" dir="ltr">2</td>
        <td class="s3">${weight * 2}</td>
        <td class="s0" dir="ltr">&gt;12 y</td>
        <td class="s0" dir="ltr">IV/ PO</td>
        <td class="s0" dir="ltr">Q8H</td>
        <td class="s0" dir="ltr">400mg/ day</td>
        <td class="s0" dir="ltr"></td>
        <td class="s9 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 198px; left: -1px">
            start 50mg/ dose max
          </div>
        </td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R18"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s15" dir="ltr">Adjuvants</td>
        <td class="s16"></td>
        <td class="s17"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R19"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Clonidine (mcg)</td>
        <td class="s8" dir="ltr">2</td>
        <td class="s3">${weight * 2} mcg</td>
        <td></td>
        <td class="s0" dir="ltr">IV/ PO</td>
        <td class="s9 softmerge" dir="ltr">
          <div class="softmerge-inner" style="width: 160px; left: -1px">
            ON up to Q6H
          </div>
        </td>
        <td class="s18"></td>
        <td class="s11"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R20"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Gabapentin</td>
        <td class="s8" dir="ltr">10</td>
        <td class="s3">${weight * 10}</td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R21"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0" dir="ltr">Amitryptiline</td>
        <td></td>
        <td class="s3" dir="ltr">5-10</td>
        <td></td>
        <td></td>
        <td class="s0" dir="ltr">ON</td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R22"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R23"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R24"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R25"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R26"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R27"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R28"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R29"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R30"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R31"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R32"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R33"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R34"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R35"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R36"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R37"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R38"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R39"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R40"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R41"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R42"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R43"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R44"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R45"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R46"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R47"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R48"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R49"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R50"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R51"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R52"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R53"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R54"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R55"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R56"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R57"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1626070742R58"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
<div
  id="embed_1220364968"
  class="waffle-embedded-object-overlay"
  style="width: 563px; height: 291px; display: block"
>
  <img
    src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17EkvGZESi00dzuwgrDzGhJrxL3dCbpxYJ4UXOo_6UgfY8aq00OVaJBuzV-GT5Vn0gg5xsOfc-5jAVKt198n197x-vrzgp7vAkR-Rt4ZVQ5qVVk9tZkj9jnWGxFI9qTFj2NZhxmOJg?key=VtDPs3KdCU3_v3SpqAGctDUj"
    style="display: block"
    height="291"
    width="563"
  />
</div>
<div
  id="embed_1002053002"
  class="waffle-embedded-object-overlay"
  style="width: 912px; height: 460px; display: block"
>
  <img
    src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17FhpLSHmqde68Co_1Q8biq9bR60hc30ijtbVLYW7SUZrSdQXJ1Oz4GVFtgrKAs6N7GYW355YxOJJpMPatI3jydeslt_Xm10AxcYmZa6jnm7MHaqY2CrYcVaCIy0yfg4I-ViZaOt?key=VtDPs3KdCU3_v3SpqAGctDUj"
    style="display: block"
    height="460"
    width="912"
  />
</div>
<div
  id="embed_178729205"
  class="waffle-embedded-object-overlay"
  style="width: 370px; height: 210px; display: block"
>
  <img
    src="https://lh7-rt.googleusercontent.com/sheetsz/AHOq17GeXJ5WpKZzcBRxDiJPM48M1ALzjDys84uJH5cZNH9IRVvXRHGeN5zw4PcHf_Zsp4u2GBYYmOwDdPgDirx660hF55g4gdo6JwqMJh6U62B9f9rcAVa3XgCIUUjZX-Wh4KbFXf5aMw?key=VtDPs3KdCU3_v3SpqAGctDUj"
    style="display: block"
    height="210"
    width="370"
  />
</div>
<script>
  function posObj(sheet, id, row, col, x, y) {
    var rtl = false;
    var sheetElement = document.getElementById(sheet);
    if (!sheetElement) {
      sheetElement = document.getElementById(sheet + "-grid-container");
    }
    if (sheetElement) {
      rtl = sheetElement.getAttribute("dir") == "rtl";
    }
    var r = document.getElementById(sheet + "R" + row);
    var c = document.getElementById(sheet + "C" + col);
    if (r && c) {
      var objElement = document.getElementById(id);
      var s = objElement.style;
      var t = y;
      while (r && r != sheetElement) {
        t += r.offsetTop;
        r = r.offsetParent;
      }
      var offsetX = x;
      while (c && c != sheetElement) {
        offsetX += c.offsetLeft;
        c = c.offsetParent;
      }
      if (rtl) {
        offsetX -= objElement.offsetWidth;
      }
      s.left = offsetX + "px";
      s.top = t + "px";
      s.display = "block";
      s.border = "1px solid #000000";
    }
  }

  function posObjs() {
    posObj("1626070742", "embed_1220364968", 22, 0, 21, 16);
    posObj("1626070742", "embed_1002053002", 36, 0, 53, 19);
    posObj("1626070742", "embed_178729205", 23, 7, 68, 13);
  }
  posObjs();
</script>
`,
        fileName: genName("pain"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const scoliosis = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="generator" content="PhpSpreadsheet, https://github.com/PHPOffice/PhpSpreadsheet">
      <meta name="author" content="Unam Trulee" />
      <meta name="company" content="Microsoft Corporation" />
    <style type="text/css">
      html { font-family:Calibri, Arial, Helvetica, sans-serif; font-size:11pt; background-color:white }
      a.comment-indicator:hover + div.comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em }
      a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em }
      div.comment { display:none }
      table { border-collapse:collapse; page-break-after:always }
      .gridlines td { border:1px dotted black }
      .gridlines th { border:1px dotted black }
      .b { text-align:center }
      .e { text-align:center }
      .f { text-align:right }
      .inlineStr { text-align:left }
      .n { text-align:right }
      .s { text-align:left }
      td.style0 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style0 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style1 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style1 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style2 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style2 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style3 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style3 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style4 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style4 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style5 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style5 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style6 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style6 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style7 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style7 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style8 { vertical-align:top; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style8 { vertical-align:top; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style9 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style9 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style10 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style10 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style11 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style11 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style12 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style12 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style13 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style13 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style14 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style14 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style15 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style15 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style16 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style16 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style17 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style17 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style18 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style18 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style19 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style19 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style20 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style20 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style21 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style21 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style22 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:#C00000 }
      th.style22 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:#C00000 }
      td.style23 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style23 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style24 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style24 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style25 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style25 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style26 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style26 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style27 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style27 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style28 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style28 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style29 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style29 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style30 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style30 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style31 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style31 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style32 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style32 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style33 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style33 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style34 { vertical-align:middle; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:5pt; background-color:white }
      th.style34 { vertical-align:middle; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:5pt; background-color:white }
      td.style35 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:5pt; background-color:white }
      th.style35 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:5pt; background-color:white }
      td.style36 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style36 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style37 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style37 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style38 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style38 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style39 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style39 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style40 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style40 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style41 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style41 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style42 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style42 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style43 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style43 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style44 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:8pt; background-color:white }
      th.style44 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:8pt; background-color:white }
      td.style45 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style45 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style46 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style46 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style47 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style47 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style48 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style48 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style49 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style49 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style50 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style50 { vertical-align:middle; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style51 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style51 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style52 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:8.5pt; background-color:white }
      th.style52 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px dashed #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:8.5pt; background-color:white }
      td.style53 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style53 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style54 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      th.style54 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10pt; background-color:white }
      td.style55 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style55 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style56 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style56 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style57 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      th.style57 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      td.style58 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style58 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style59 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style59 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style60 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style60 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style61 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style61 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style62 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style62 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style63 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style63 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style64 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style64 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style65 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style65 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style66 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style66 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style67 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style67 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style68 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style68 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style69 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style69 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style70 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style70 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style71 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style71 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style72 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style72 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style73 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style73 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style74 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style74 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style75 { vertical-align:middle; text-align:left; padding-left:63px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style75 { vertical-align:middle; text-align:left; padding-left:63px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style76 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style76 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style77 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style77 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style78 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style78 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style79 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style79 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style80 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style80 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style81 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style81 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style82 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style82 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style83 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style83 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style84 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style84 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style85 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style85 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style86 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style86 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style87 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style87 { vertical-align:middle; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style88 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style88 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style89 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style89 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style90 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style90 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style91 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style91 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style92 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style92 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style93 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style93 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style94 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style94 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style95 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style95 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style96 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style96 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style97 { vertical-align:middle; text-align:left; padding-left:90px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:11pt; background-color:white }
      th.style97 { vertical-align:middle; text-align:left; padding-left:90px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:11pt; background-color:white }
      td.style98 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:11pt; background-color:white }
      th.style98 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:11pt; background-color:white }
      td.style99 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style99 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style100 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style100 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style101 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style101 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style102 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style102 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style103 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style103 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style104 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style104 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style105 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style105 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style106 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style106 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style107 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      th.style107 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      td.style108 { vertical-align:top; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style108 { vertical-align:top; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style109 { vertical-align:top; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style109 { vertical-align:top; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style110 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style110 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style111 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style111 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style112 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style112 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style113 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      th.style113 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      td.style114 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      th.style114 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      td.style115 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      th.style115 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:#D2DAE4 }
      td.style116 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style116 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style117 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style117 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style118 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style118 { vertical-align:middle; text-align:left; padding-left:9px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style119 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style119 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style120 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      th.style120 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6pt; background-color:white }
      td.style121 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style121 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style122 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style122 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style123 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      th.style123 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      td.style124 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      th.style124 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      td.style125 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      th.style125 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.5pt; background-color:#D8D8D8 }
      td.style126 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style126 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style127 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      th.style127 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:2px dashed #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:7pt; background-color:white }
      td.style128 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      th.style128 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      td.style129 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      th.style129 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      td.style130 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      th.style130 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      td.style131 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      th.style131 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#000000 }
      td.style132 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      th.style132 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      td.style133 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      th.style133 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      td.style134 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      th.style134 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#4BACC6 }
      td.style135 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style135 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style136 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style136 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style137 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style137 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style138 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style138 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style139 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style139 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style140 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style140 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style141 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      th.style141 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10pt; background-color:#C00000 }
      td.style142 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      th.style142 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      td.style143 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      th.style143 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      td.style144 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      th.style144 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      td.style145 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      th.style145 { vertical-align:middle; text-align:center; border-bottom:2px dashed #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:9.5pt; background-color:#C00000 }
      td.style146 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:9pt; background-color:white }
      th.style146 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:9pt; background-color:white }
      td.style147 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9pt; background-color:white }
      th.style147 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9pt; background-color:white }
      td.style148 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:8pt; background-color:white }
      th.style148 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:8pt; background-color:white }
      td.style149 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style149 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style150 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style150 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      td.style151 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      th.style151 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:10pt; background-color:white }
      table.sheet0 col.col0 { width:121.32222083pt }
      table.sheet0 col.col1 { width:209.43333093pt }
      table.sheet0 col.col2 { width:53.54444383pt }
      table.sheet0 col.col3 { width:44.73333282pt }
      table.sheet0 col.col4 { width:53.54444383pt }
      table.sheet0 col.col5 { width:18.97777756pt }
      table.sheet0 col.col6 { width:40.6666662pt }
      table.sheet0 col.col7 { width:51.51111052pt }
      table.sheet0 col.col8 { width:42pt }
      table.sheet0 tr { height:20.1pt }
      table.sheet0 tr.row0 { height:12.75pt }
      table.sheet0 tr.row1 { height:12.75pt }
      table.sheet0 tr.row2 { height:12.75pt }
      table.sheet0 tr.row3 { height:12.75pt }
      table.sheet0 tr.row4 { height:12.75pt }
      table.sheet0 tr.row5 { height:18.2pt }
      table.sheet0 tr.row6 { height:18.2pt }
      table.sheet0 tr.row7 { height:14.45pt }
      table.sheet0 tr.row8 { height:18.2pt }
      table.sheet0 tr.row9 { height:18.2pt }
      table.sheet0 tr.row10 { height:12.95pt }
      table.sheet0 tr.row11 { height:12.95pt }
      table.sheet0 tr.row12 { height:12.95pt }
      table.sheet0 tr.row13 { height:12.95pt }
      table.sheet0 tr.row14 { height:12.95pt }
      table.sheet0 tr.row15 { height:43.5pt }
      table.sheet0 tr.row16 { height:12.95pt }
      table.sheet0 tr.row17 { height:18.2pt }
      table.sheet0 tr.row18 { height:12.95pt }
      table.sheet0 tr.row19 { height:20.1pt }
      table.sheet0 tr.row20 { height:18.2pt }
      table.sheet0 tr.row21 { height:18.2pt }
      table.sheet0 tr.row22 { height:18.2pt }
      table.sheet0 tr.row23 { height:20.1pt }
      table.sheet0 tr.row24 { height:18.2pt }
      table.sheet0 tr.row25 { height:18.2pt }
      table.sheet0 tr.row26 { height:18.2pt }
      table.sheet0 tr.row27 { height:20.1pt }
      table.sheet0 tr.row28 { height:18.2pt }
      table.sheet0 tr.row29 { height:18.2pt }
      table.sheet0 tr.row30 { height:18.2pt }
    </style>
  </head>

  <body>
<style>
@page { margin-left: 0.74803149606299in; margin-right: 0.74803149606299in; margin-top: 0in; margin-bottom: 0in; }
body { margin-left: 0.74803149606299in; margin-right: 0.74803149606299in; margin-top: 0in; margin-bottom: 0in; }
</style>
    <table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0">
        <col class="col0">
        <col class="col1">
        <col class="col2">
        <col class="col3">
        <col class="col4">
        <col class="col5">
        <col class="col6">
        <col class="col7">
        <col class="col8">
        <tbody>
          <tr class="row4">
            <td class="column0 style93 s">Scoliosis Drugs Calculator</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3">&nbsp;</td>
            <td class="column4">&nbsp;</td>
            <td class="column5">&nbsp;</td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8 style56 null"></td>
          </tr>
          <tr class="row5">
            <td class="column0 style2 null"></td>
            <td class="column1 style60 null"></td>
            <td class="column2 style61 null"></td>
            <td class="column3 style60 null"></td>
            <td class="column4 style61 null"></td>
            <td class="column5 style61 null"></td>
            <td class="column6 style61 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row6">
            <td class="column0 style97 s">BWT in kg =</td>
            <td class="column1 style98 n">${weight}</td>
            <td class="column2 style61 null"></td>
            <td class="column3 style96 null"></td>
            <td class="column4 style2 null"></td>
            <td class="column5 style2 null"></td>
            <td class="column6 style2 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row7">
            <td class="column0 style2 null"></td>
            <td class="column1 style2 null"></td>
            <td class="column2 style61 null"></td>
            <td class="column3 style2 null"></td>
            <td class="column4 style2 null"></td>
            <td class="column5 style2 null"></td>
            <td class="column6 style2 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row8">
            <td class="column0 style62 null"></td>
            <td class="column1 style2 null"></td>
            <td class="column2 style61 null"></td>
            <td class="column3 style59 null"></td>
            <td class="column4">&nbsp;</td>
            <td class="column5">&nbsp;</td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row9">
            <td class="column0 style1 s">Propofol</td>
            <td class="column1 style65 s">TCI - Draw up the drug neat into 50 ml syringe for infusion</td>
            <td class="column2 style105 null"></td>
            <td class="column3 style7 null"></td>
            <td class="column4 style7 null"></td>
            <td class="column5 style7 null"></td>
            <td class="column6 style7 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row10">
            <td class="column0 style66 null"></td>
            <td class="column1 style64 null"></td>
            <td class="column2 style2 null"></td>
            <td class="column3 style7 null"></td>
            <td class="column4 style7 null"></td>
            <td class="column5 style7 null"></td>
            <td class="column6 style7 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row11">
            <td class="column0 style62 null"></td>
            <td class="column1 style2 null"></td>
            <td class="column2 style107 s style107" colspan="3">REMARKS</td>
            <td class="column5">&nbsp;</td>
            <td class="column6 style7 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row12">
            <td class="column0 style68 s">Remifentanil</td>
            <td class="column1 style63 s">TCI - Draw up 2mg in 50 ml for infusion</td>
            <td class="column2 style106 s">0.01-1</td>
            <td class="column3 style67 s">mcg/kg/min, titrate to effect</td>
            <td class="column4 style80 null"></td>
            <td class="column5 style99 null"></td>
            <td class="column6 style7 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row13">
            <td class="column0 style87 null"></td>
            <td class="column1 style69 null"></td>
            <td class="column2 style69 null"></td>
            <td class="column3 style69 null"></td>
            <td class="column4 style69 null"></td>
            <td class="column5 style69 null"></td>
            <td class="column6 style2 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row14">
            <td class="column0 style88 null"></td>
            <td class="column1 style69 null"></td>
            <td class="column2 style113 s style115" colspan="5">REMARKS</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row15">
            <td class="column0 style15 s">Dexmedetomidine</td>
            <td class="column1 style81 s">Draw 200 mcg in 50 ml. Use BBraun Infusion Pump &quot;<span style="font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt">Dexmedetomidine setting&quot;</span><span style="color:#000000; font-family:'Calibri'; font-size:10pt">.<br />
</span><span style="font-weight:bold; font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt">(Dex is </span><span style="font-weight:bold; text-decoration:underline; font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt">NOT</span><span style="font-weight:bold; font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt"> always used - </span><span style="font-weight:bold; text-decoration:underline; font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt">ASK</span><span style="font-weight:bold; font-style:italic; color:#000000; font-family:'Calibri'; font-size:10pt"> Consultant before diluting)</span></td>
            <td class="column2 style94 s">1 ml/ hr =</td>
            <td class="column3 style95 f">${roundOff(4 / weight, 2)}</td>
            <td class="column4 style83 s">mcg/kg/hr <span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt">(0.2-0.5 mcg/kg/hr)</span></td>
            <td class="column5 style83 null"></td>
            <td class="column6 style16 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row16">
            <td class="column0 style64 null"></td>
            <td class="column1 style69 null"></td>
            <td class="column2 style61 null"></td>
            <td class="column3">&nbsp;</td>
            <td class="column4">&nbsp;</td>
            <td class="column5">&nbsp;</td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row17">
            <td class="column0 style15 s">Phenylephrine</td>
            <td class="column1 style81 s">Draw 2000 mcg in 20 ml <span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt">(NEAT)</span></td>
            <td class="column2 style82 s">1 ml/ hr =</td>
            <td class="column3 style20 f">${roundOff(100 / 60 / weight, 2)}</td>
            <td class="column4 style14 s">mcg/kg/min <span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt">(0.1-1 mcg/kg/min)</span></td>
            <td class="column5 style14 null"></td>
            <td class="column6 style16 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row18">
            <td class="column0 style70 null"></td>
            <td class="column1 style69 null"></td>
            <td class="column2 style61 null"></td>
            <td class="column3">&nbsp;</td>
            <td class="column4">&nbsp;</td>
            <td class="column5">&nbsp;</td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row19">
            <td class="column0 style57 s">DRUG</td>
            <td class="column1 style57 s">DOSE/KG</td>
            <td class="column2 style57 s">AMOUNT</td>
            <td class="column3 style57 s">UNIT</td>
            <td class="column4 style113 s style115" colspan="3">REMARKS</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row20">
            <td class="column0 style9 s">Tranexemic acid (&lt; 40kg)</td>
            <td class="column1 style10 s">( BWT x 50 ) mg/20ml</td>
            <td class="column2 style71 f">${weight * 50}</td>
            <td class="column3 style18 s">mg/20ml</td>
            <td class="column4 style101 s">1ml/hr=</td>
            <td class="column5 style102 n">2.5</td>
            <td class="column6 style86 s">mg/kg/hr</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row21">
            <td class="column0 style72 null"></td>
            <td class="column1 style73 null"></td>
            <td class="column2 style8 s">(max 2000 mg)</td>
            <td class="column3 style6 null"></td>
            <td class="column4 style116 s style118" colspan="3">(10ml/hr for 1hr then 1ml/hr)</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row22">
            <td class="column0 style3 s">Tranexemic acid (<span style="font-weight:bold; color:#000000; font-family:'Symbol'; font-size:10pt">³</span><span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt"> 40kg)</span></td>
            <td class="column1 style4 s">2000 mg/20 ml</td>
            <td class="column2 style5 s">2000 mg</td>
            <td class="column3 style17 s">mg/20ml</td>
            <td class="column4 style110 s style112" colspan="3">(10ml/hr for 1hr then 1ml/hr)</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row23">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3 style74 null"></td>
            <td class="column4">&nbsp;</td>
            <td class="column5">&nbsp;</td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row24">
            <td class="column0 style9 s">Morphine+Ketamine PCA (<span style="color:#000000; font-family:'Calibri'; font-size:10pt">&lt; </span><span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt">50kg)</span></td>
            <td class="column1 style108 s style109" rowspan="2">[ (BWT) mg Morphine + (BWT) mg Ketamine ] / 50 ml</td>
            <td class="column2 style71 f">${weight}</td>
            <td class="column3 style18 s">mg/50ml</td>
            <td class="column4 style89 s">1ml/hr=</td>
            <td class="column5 style103 n">20</td>
            <td class="column6 style84 s">mcg/kg/hr</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row25">
            <td class="column0 style72 null"></td>
            <td class="column2 style8 s">(max 50 mg)</td>
            <td class="column3 style6 null"></td>
            <td class="column4 style90 null"></td>
            <td class="column5 style100 null"></td>
            <td class="column6 style85 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row26">
            <td class="column0 style3 s">Morphine+Ketamine PCA (<span style="font-weight:bold; color:#000000; font-family:'Symbol'; font-size:10pt">³</span><span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt"> 50kg)</span></td>
            <td class="column1 style4 s">( 50 mg Morphine + 50 mg Ketamine ) / 50ml</td>
            <td class="column2 style5 n">50</td>
            <td class="column3 style17 s">mg/50ml</td>
            <td class="column4 style91 s">1ml/hr=</td>
            <td class="column5 style104 n">1</td>
            <td class="column6 style80 s">mg/hr</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row27">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
            <td class="column2">&nbsp;</td>
            <td class="column3 style74 null"></td>
            <td class="column4 style92 null"></td>
            <td class="column5 style92 null"></td>
            <td class="column6">&nbsp;</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row28">
            <td class="column0 style9 s">Morphine PCA (<span style="color:#000000; font-family:'Calibri'; font-size:10pt">&lt;</span><span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt"> 50kg)</span></td>
            <td class="column1 style10 s">( BWT ) mg / 50ml</td>
            <td class="column2 style13 f">${weight}</td>
            <td class="column3 style18 s">mg/50ml</td>
            <td class="column4 style89 s">1ml/hr=</td>
            <td class="column5 style103 n">20</td>
            <td class="column6 style84 s">mcg/kg/hr</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row29">
            <td class="column0 style72 null"></td>
            <td class="column1 style73 null"></td>
            <td class="column2 style8 s">(max 50 mg)</td>
            <td class="column3 style6 null"></td>
            <td class="column4 style90 null"></td>
            <td class="column5 style100 null"></td>
            <td class="column6 style85 null"></td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
          <tr class="row30">
            <td class="column0 style11 s">Morphine PCA (<span style="font-weight:bold; color:#000000; font-family:'Symbol'; font-size:10pt">³</span><span style="font-weight:bold; color:#000000; font-family:'Calibri'; font-size:10pt"> 50kg)</span></td>
            <td class="column1 style12 s">50 mg / 50ml</td>
            <td class="column2 style6 n">50</td>
            <td class="column3 style19 s">mg/50ml</td>
            <td class="column4 style91 s">1ml/hr=</td>
            <td class="column5 style104 n">1</td>
            <td class="column6 style80 s">mg/hr</td>
            <td class="column7">&nbsp;</td>
            <td class="column8">&nbsp;</td>
          </tr>
        </tbody>
    </table>
  </body>
</html>
`,
        fileName: genName("scoliosis"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const cardiac = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="generator" content="PhpSpreadsheet, https://github.com/PHPOffice/PhpSpreadsheet">
      <meta name="author" content="Herman AyaHaziQ" />
      <meta name="company" content="Microsoft Corporation" />
    <style type="text/css">
      html { font-family:Calibri, Arial, Helvetica, sans-serif; font-size:11pt; background-color:white }
      a.comment-indicator:hover + div.comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em }
      a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em }
      div.comment { display:none }
      table { border-collapse:collapse; page-break-after:always }
      .gridlines td { border:1px dotted black }
      .gridlines th { border:1px dotted black }
      .b { text-align:center }
      .e { text-align:center }
      .f { text-align:right }
      .inlineStr { text-align:left }
      .n { text-align:right }
      .s { text-align:left }
      td.style0 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      th.style0 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      td.style1 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style1 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style2 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style2 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style3 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style3 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style4 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style4 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style5 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:#FFFFFF }
      th.style5 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:#FFFFFF }
      td.style6 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style6 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style7 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style7 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style8 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style8 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style9 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style9 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style10 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style10 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style11 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style11 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style12 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style12 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style13 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style13 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style14 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style14 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style15 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style15 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style16 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style16 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style17 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style17 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style18 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style18 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style19 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style19 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style20 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style20 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style21 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style21 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style22 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style22 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style23 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style23 { vertical-align:bottom; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style24 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style24 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style25 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style25 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style26 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style26 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style27 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style27 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style28 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style28 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style29 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style29 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style30 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style30 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style31 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style31 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style32 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style32 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style33 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style33 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style34 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style34 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style35 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style35 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style36 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style36 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style37 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style37 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style38 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style38 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style39 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style39 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style40 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style40 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style41 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style41 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style42 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style42 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style43 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style43 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style44 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style44 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style45 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style45 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style46 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style46 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style47 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style47 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style48 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style48 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style49 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style49 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style50 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style50 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style51 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style51 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style52 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style52 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style53 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style53 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style54 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      th.style54 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      td.style55 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      th.style55 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      td.style56 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style56 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style57 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style57 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style58 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style58 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style59 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style59 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style60 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style60 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style61 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style61 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style62 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style62 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style63 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style63 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style64 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style64 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style65 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style65 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style66 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style66 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style67 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style67 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style68 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style68 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style69 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style69 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style70 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style70 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style71 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style71 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style72 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style72 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style73 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style73 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style74 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style74 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style75 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style75 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style76 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style76 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style77 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style77 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style78 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style78 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style79 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:14.0pt; background-color:white }
      th.style79 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:14.0pt; background-color:white }
      td.style80 { vertical-align:bottom; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style80 { vertical-align:bottom; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style81 { vertical-align:bottom; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style81 { vertical-align:bottom; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style82 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      th.style82 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      td.style83 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style83 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style84 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style84 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style85 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style85 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style86 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style86 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style87 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style87 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style88 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style88 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style89 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style89 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style90 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style90 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style91 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style91 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style92 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      th.style92 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      td.style93 { vertical-align:bottom; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style93 { vertical-align:bottom; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style94 { vertical-align:bottom; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style94 { vertical-align:bottom; border-bottom:none #000000; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style95 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style95 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style96 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.0pt; background-color:white }
      th.style96 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:9.0pt; background-color:white }
      td.style97 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style97 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style98 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style98 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style99 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style99 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style100 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      th.style100 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      td.style101 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style101 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style102 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style102 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style103 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      th.style103 { vertical-align:bottom; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Calibri'; font-size:10pt; background-color:white }
      td.style104 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style104 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style105 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style105 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style106 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style106 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style107 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      th.style107 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:6.0pt; background-color:white }
      td.style108 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:8.0pt; background-color:white }
      th.style108 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:8.0pt; background-color:white }
      td.style109 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style109 { vertical-align:middle; text-align:center; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style110 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style110 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style111 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style111 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:1px dotted #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style112 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style112 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style113 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style113 { vertical-align:middle; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style114 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style114 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style115 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:9.0pt; background-color:white }
      th.style115 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:9.0pt; background-color:white }
      td.style116 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:10.0pt; background-color:white }
      th.style116 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Arial Black'; font-size:10.0pt; background-color:white }
      td.style117 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      th.style117 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:7.0pt; background-color:white }
      td.style118 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style118 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style119 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style119 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style120 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style120 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style121 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style121 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style122 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#C0504D }
      th.style122 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#C0504D }
      td.style123 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#000000 }
      th.style123 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#000000 }
      td.style124 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:9.0pt; background-color:#000000 }
      th.style124 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:9.0pt; background-color:#000000 }
      td.style125 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:10.0pt; background-color:#000000 }
      th.style125 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:10.0pt; background-color:#000000 }
      td.style126 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#4BACC6 }
      th.style126 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:14.0pt; background-color:#4BACC6 }
      td.style127 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      th.style127 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:10.0pt; background-color:white }
      td.style128 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#C0504D }
      th.style128 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#C0504D }
      td.style129 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:5.0pt; background-color:white }
      th.style129 { vertical-align:middle; border-bottom:2px solid #000000 !important; border-top:none #000000; border-left:2px solid #000000 !important; border-right:2px solid #000000 !important; color:#000000; font-family:'Tahoma'; font-size:5.0pt; background-color:white }
      td.style130 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:5.0pt; background-color:white }
      th.style130 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:2px solid #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Tahoma'; font-size:5.0pt; background-color:white }
      td.style131 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#000000 }
      th.style131 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#000000 }
      td.style132 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#4BACC6 }
      th.style132 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Arial Black'; font-size:12.0pt; background-color:#4BACC6 }
      td.style133 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:12.0pt; background-color:white }
      th.style133 { vertical-align:middle; text-align:center; border-bottom:1px dotted #000000 !important; border-top:2px solid #000000 !important; border-left:2px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#FFFFFF; font-family:'Tahoma'; font-size:12.0pt; background-color:white }
      td.style134 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:12.0pt; background-color:white }
      th.style134 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:12.0pt; background-color:white }
      td.style135 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      th.style135 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      td.style136 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      th.style136 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      td.style137 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      th.style137 { vertical-align:bottom; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:10.0pt; background-color:white }
      td.style138 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style138 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style139 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style139 { vertical-align:middle; text-align:right; padding-right:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style140 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style140 { vertical-align:middle; text-align:center; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style141 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style141 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style142 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style142 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style143 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style143 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style144 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style144 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; text-decoration:underline; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style145 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style145 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style146 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style146 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style147 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style147 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style148 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style148 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style149 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style149 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style150 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style150 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style151 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style151 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style152 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style152 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style153 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style153 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style154 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style154 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style155 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style155 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style156 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style156 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style157 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style157 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style158 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style158 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style159 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style159 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style160 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      th.style160 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#000000 }
      td.style161 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style161 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style162 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style162 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style163 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style163 { vertical-align:middle; text-align:center; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style164 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style164 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style165 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style165 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      td.style166 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style166 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:1px solid #000000 !important; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style167 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style167 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:1px solid #000000 !important; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style168 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style168 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style169 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style169 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:none #000000; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style170 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      th.style170 { vertical-align:middle; text-align:left; padding-left:0px; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:white }
      td.style171 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      th.style171 { vertical-align:middle; border-bottom:1px solid #000000 !important; border-top:1px solid #000000 !important; border-left:1px solid #000000 !important; border-right:none #000000; font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFFFF }
      td.style172 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      th.style172 { vertical-align:middle; border-bottom:none #000000; border-top:none #000000; border-left:none #000000; border-right:none #000000; color:#000000; font-family:'Helvetica Neue'; font-size:9.0pt; background-color:#FFFF00 }
      table.sheet0 col.col0 { width:5.42222216pt }
      table.sheet0 col.col1 { width:80.65555463pt }
      table.sheet0 col.col2 { width:53.54444383pt }
      table.sheet0 col.col3 { width:86.75555456pt }
      table.sheet0 col.col4 { width:45.41111059pt }
      table.sheet0 col.col5 { width:52.18888829pt }
      table.sheet0 col.col6 { width:33.21111073pt }
      table.sheet0 col.col7 { width:36.59999958pt }
      table.sheet0 col.col8 { width:221.63333079pt }
      table.sheet0 tr { height:15pt }
      table.sheet0 tr.row0 { height:12.75pt }
      table.sheet0 tr.row1 { height:12.75pt }
      table.sheet0 tr.row2 { height:12.75pt }
      table.sheet0 tr.row3 { height:12.75pt }
      table.sheet0 tr.row4 { height:12.75pt }
      table.sheet0 tr.row5 { height:12.75pt }
      table.sheet0 tr.row6 { height:12.75pt }
      table.sheet0 tr.row7 { height:12.75pt }
      table.sheet0 tr.row8 { height:12.75pt }
      table.sheet0 tr.row9 { height:12.75pt }
      table.sheet0 tr.row10 { height:12.75pt }
      table.sheet0 tr.row11 { height:12.75pt }
      table.sheet0 tr.row12 { height:12.75pt }
      table.sheet0 tr.row13 { height:12.75pt }
      table.sheet0 tr.row14 { height:12.75pt }
      table.sheet0 tr.row15 { height:12.75pt }
      table.sheet0 tr.row16 { height:12.75pt }
      table.sheet0 tr.row17 { height:12.75pt }
      table.sheet0 tr.row18 { height:12.75pt }
      table.sheet0 tr.row19 { height:12.75pt }
      table.sheet0 tr.row20 { height:12.75pt }
      table.sheet0 tr.row21 { height:12.75pt }
      table.sheet0 tr.row22 { height:12.75pt }
      table.sheet0 tr.row23 { height:12.75pt }
      table.sheet0 tr.row24 { height:12.75pt }
      table.sheet0 tr.row25 { height:12.75pt }
      table.sheet0 tr.row26 { height:12.75pt }
      table.sheet0 tr.row27 { height:12.75pt }
      table.sheet0 tr.row28 { height:12.75pt }
      table.sheet0 tr.row29 { height:12.75pt }
      table.sheet0 tr.row30 { height:12.75pt }
      table.sheet0 tr.row31 { height:12.75pt }
      table.sheet0 tr.row32 { height:12.75pt }
      table.sheet0 tr.row33 { height:12.75pt }
      table.sheet0 tr.row34 { height:12pt }
      table.sheet0 tr.row35 { height:12.75pt }
      table.sheet0 tr.row36 { height:12.75pt }
      table.sheet0 tr.row37 { height:12.75pt }
      table.sheet0 tr.row38 { height:12.75pt }
      table.sheet0 tr.row39 { height:12.75pt }
      table.sheet0 tr.row40 { height:12.75pt }
      table.sheet0 tr.row41 { height:12.75pt }
      table.sheet0 tr.row42 { height:12.75pt }
      table.sheet0 tr.row43 { height:12.75pt }
      table.sheet0 tr.row44 { height:12.75pt }
      table.sheet0 tr.row45 { height:19.5pt }
      table.sheet0 tr.row46 { height:25.5pt }
      table.sheet0 tr.row47 { height:19.5pt }
    </style>
  </head>

  <body>
<style>
@page { margin-left: 0in; margin-right: 0in; margin-top: 0in; margin-bottom: 0in; }
body { margin-left: 0in; margin-right: 0in; margin-top: 0in; margin-bottom: 0in; }
</style>
    <table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
        <col class="col0">
        <col class="col1">
        <col class="col2">
        <col class="col3">
        <col class="col4">
        <col class="col5">
        <col class="col6">
        <col class="col7">
        <col class="col8">
        <tbody>
          <tr class="row0">
            <td class="column0 style1 null"></td>
            <td class="column1 style2 s">Drugs Calculator</td>
            <td class="column2 style2 s">kg</td>
            <td class="column3 style2 s">Dose/kg BW</td>
            <td class="column4 style3 null"></td>
            <td class="column5 style3 null"></td>
            <td class="column6 style4 null"></td>
            <td class="column7 style4 null"></td>
            <td class="column8 style4 null"></td>
          </tr>
          <tr class="row1">
            <td class="column0 style1 null"></td>
            <td class="column1 style2 s">BW in kg =</td>
            <td class="column2 style5 n">${weight}</td>
            <td class="column3 style6 null"></td>
            <td class="column4 style7 null"></td>
            <td class="column5 style7 null"></td>
            <td class="column6 style8 null"></td>
            <td class="column7 style8 null"></td>
            <td class="column8 style8 null"></td>
          </tr>
          <tr class="row2">
            <td class="column0 style1 null"></td>
            <td class="column1 style9 null style10" colspan="2"></td>
            <td class="column3 style11 null"></td>
            <td class="column4 style12 s">Amount</td>
            <td class="column5 style12 s">Unit</td>
            <td class="column6 style13 s style15" colspan="3">Remarks</td>
          </tr>
          <tr class="row3">
            <td class="column0 style1 null"></td>
            <td class="column1 style16 s">Adrenaline</td>
            <td class="column2 style17 null"></td>
            <td class="column3 style18 n">10</td>
            <td class="column4 style19 f">${weight * 10}</td>
            <td class="column5 style20 s">mcg</td>
            <td class="column6 style21 null style23" colspan="3"></td>
          </tr>
          <tr class="row4">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Adenosine (1st bolus)</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.1</td>
            <td class="column4 style19 f">${roundOff(
              Math.min(6, weight * 0.1),
              2
            )}</td>
            <td class="column5 style26 s">mg</td>
            <td class="column6 style27 s style23" colspan="3">first bolus (max 6 mg)</td>
          </tr>
          <tr class="row5">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Adenosine (2nd bolus)</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.2</td>
            <td class="column4 style19 f">${roundOff(
              Math.min(12, weight * 0.2),
              2
            )}</td>
            <td class="column5 style26 s">mg</td>
            <td class="column6 style27 s style23" colspan="3">second bolus (max 12mg)</td>
          </tr>
          <tr class="row6">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Amiodarone</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">5</td>
            <td class="column4 style19 f">${Math.min(300, weight * 5)}</td>
            <td class="column5 style20 s">mg</td>
            <td class="column6 style27 s style23" colspan="3">over 20-60 minutes</td>
          </tr>
          <tr class="row7">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Atropine</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.02</td>
            <td class="column4 style19 f">${Math.min(1.2, weight * 0.02)}</td>
            <td class="column5 style20 s">mg</td>
            <td class="column6 style21 null style23" colspan="3"></td>
          </tr>
          <tr class="row8">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Bicarb (8.4%)</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">1</td>
            <td class="column4 style19 f">${weight * 1}</td>
            <td class="column5 style20 s">mL</td>
            <td class="column6 style21 null style23" colspan="3"></td>
          </tr>
          <tr class="row9">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s"><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">CaCl</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt"><sub>2 </sub></span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(10%)</span></td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.2</td>
            <td class="column4 style19 f">${roundOff(weight * 0.2, 2)}</td>
            <td class="column5 style20 s">mL</td>
            <td class="column6 style21 null style23" colspan="3"></td>
          </tr>
          <tr class="row10">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Cefazolin</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">30</td>
            <td class="column4 style19 f">${Math.min(2000, weight * 30)}</td>
            <td class="column5 style20 s">mg</td>
            <td class="column6 style27 s style23" colspan="3"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">repeat 4 hourly - max </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">2000mg</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> per dose</span></td>
          </tr>
          <tr class="row11">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Fentanyl</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">20</td>
            <td class="column4 style19 f">${weight * 20}</td>
            <td class="column5 style20 s">mcg</td>
            <td class="column6 style27 s style23" colspan="3">Titrated</td>
          </tr>
          <tr class="row12">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Heparin </td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">300</td>
            <td class="column4 style19 f">${weight * 300}</td>
            <td class="column5 style20 s">IU</td>
            <td class="column6 style28 null style23" colspan="3"></td>
          </tr>
          <tr class="row13">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Lignocaine (1%)</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">1</td>
            <td class="column4 style19 f">${weight * 1}</td>
            <td class="column5 style20 s">mg</td>
            <td class="column6 style29 null"></td>
            <td class="column7 style30 null"></td>
            <td class="column8 style31 null"></td>
          </tr>
          <tr class="row14">
            <td class="column0 style1 null"></td>
            <td class="column1 style16 s"><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">MgSO</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt"><sub>4</sub></span></td>
            <td class="column2 style17 null"></td>
            <td class="column3 style32 n">50</td>
            <td class="column4 style33 f">${Math.min(2000, weight * 50)}</td>
            <td class="column5 style34 s">mg</td>
            <td class="column6 style35 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">Dilute to 100mg/ml, infuse over 1-hour, </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">Max 2000mg</span></td>
            <td class="column7 style30 null"></td>
            <td class="column8 style36 null"></td>
          </tr>
          <tr class="row15">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Protamine</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">3</td>
            <td class="column4 style19 f">${weight * 3}</td>
            <td class="column5 style20 s">mg</td>
            <td class="column6 style37 s style23" colspan="3">ONLY BY CONSULTANT</td>
          </tr>
          <tr class="row16">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Phenylephrine</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">5</td>
            <td class="column4 style19 f">${weight * 5}</td>
            <td class="column5 style20 s">mcg</td>
            <td class="column6 style21 null style23" colspan="3"></td>
          </tr>
          <tr class="row17">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Vasopressin</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.1</td>
            <td class="column4 style19 f">${roundOff(weight * 0.1, 2)}</td>
            <td class="column5 style20 s">unit</td>
            <td class="column6 style29 null"></td>
            <td class="column7 style30 null"></td>
            <td class="column8 style31 null"></td>
          </tr>
          <tr class="row18">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Synch cardioversion</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">0.5</td>
            <td class="column4 style19 f">${weight * 0.5}</td>
            <td class="column5 style26 s">J</td>
            <td class="column6 style27 s style23" colspan="3">SVT/VT with pulse</td>
          </tr>
          <tr class="row19">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Synch cardioversion</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">1</td>
            <td class="column4 style19 f">${weight * 1}</td>
            <td class="column5 style26 s">J</td>
            <td class="column6 style27 s style23" colspan="3">SVT/VT with pulse</td>
          </tr>
          <tr class="row20">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">First &amp; Succeeding defibrillation</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 n">4</td>
            <td class="column4 style19 f">${weight * 4}</td>
            <td class="column5 style26 s">J</td>
            <td class="column6 style27 s style23" colspan="3">VF/VT pulseless</td>
          </tr>
          <tr class="row21">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Adrenaline</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW x 0.3 mg/50mL</td>
            <td class="column4 style19 f">${roundOff(weight * 0.3, 2)}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">0.10</td>
            <td class="column8 style42 s">mcg/kg/min  (Wt: ≤ 10kg)</td>
          </tr>
          <tr class="row22">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Noradrenaline</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW x 0.3 mg/50mL</td>
            <td class="column4 style19 f">${roundOff(weight * 0.3, 2)}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">0.10</td>
            <td class="column8 style42 s">mcg/kg/min  (Wt: ≤ 10kg)</td>
          </tr>
          <tr class="row23">
            <td class="column0 style1 null"></td>
            <td class="column1 style43 s">Amiodarone infusion</td>
            <td class="column2 style31 null"></td>
            <td class="column3 style18 s">BW x 15 mg/50mL</td>
            <td class="column4 style19 f">${weight * 15}</td>
            <td class="column5 style44 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">mg/50mL</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">D5W</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> </span></td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style45 n">5</td>
            <td class="column8 style46 s">mcg/kg/min, run at 1-3 ml/hr</td>
          </tr>
          <tr class="row24">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Dobutamine</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW x 15 mg/50mL</td>
            <td class="column4 style19 f">${weight * 15}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">5.00</td>
            <td class="column8 style46 s">mcg/kg/min (Wt: ≤ 16kg)</td>
          </tr>
          <tr class="row25">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Dopamine</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW x 30 mg/50mL</td>
            <td class="column4 style19 f">${weight * 30}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">10.00</td>
            <td class="column8 style46 s">mcg/kg/min (≤  8kg)</td>
          </tr>
          <tr class="row26">
            <td class="column0 style1 null"></td>
            <td class="column1 style47 s">Esmolol</td>
            <td class="column2 style17 null"></td>
            <td class="column3 style48 s style23" colspan="3">Draw neat</td>
            <td class="column6 style49 s style23" colspan="3">Titrate to effect 0-200mcg/kg/min</td>
          </tr>
          <tr class="row27">
            <td class="column0 style4 null"></td>
            <td class="column1 style38 s">GTN</td>
            <td class="column2 style50 null"></td>
            <td class="column3 style32 s">BX X 3 mg/50mL</td>
            <td class="column4 style33 f">${weight * 3}</td>
            <td class="column5 style32 s">mg/50mL</td>
            <td class="column6 style51 s">1mL/hr=</td>
            <td class="column7 style52 n">1.00</td>
            <td class="column8 style42 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">mcg/kg/min (</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">max 8mcg/kg/min)</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> </span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(Wt: ≤ 4kg)</span></td>
          </tr>
          <tr class="row28">
            <td class="column0 style4 null"></td>
            <td class="column1 style38 s">Nipride</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style32 s">BW x 3 mg/50mL</td>
            <td class="column4 style33 f">${weight * 3}</td>
            <td class="column5 style32 s">mg/50mL</td>
            <td class="column6 style51 s">1mL/hr=</td>
            <td class="column7 style52 n">1.00</td>
            <td class="column8 style42 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">mcg/kg/min</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> (max 8mcg/kg/min)</span><span style="font-style:italic; color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> </span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(Wt: ≤ 4kg)</span></td>
          </tr>
          <tr class="row29">
            <td class="column0 style4 null"></td>
            <td class="column1 style47 s">Isoprenaline</td>
            <td class="column2 style17 null"></td>
            <td class="column3 style32 s">Dilute 0.2mg in 20mls NS</td>
            <td class="column4 style33 n">10</td>
            <td class="column5 style32 s">mcg/mL</td>
            <td class="column6 style49 s style23" colspan="3">Titrate to effect (0.01 to 0.2 mcg/kg/min)</td>
          </tr>
          <tr class="row30">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Milrinone</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW x 3 mg/50mL</td>
            <td class="column4 style19 f">${weight * 3}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">1.00</td>
            <td class="column8 style42 s">mcg/kg/min (Wt: ≤ 7kg)</td>
          </tr>
          <tr class="row31">
            <td class="column0 style1 null"></td>
            <td class="column1 style53 s">Phentolamine</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style54 s">BW x 15 mg/50mL</td>
            <td class="column4 style55 f">45</td>
            <td class="column5 style54 s">mg/50mL</td>
            <td class="column6 style21 s style23" colspan="3">Check dose with pharmacy </td>
          </tr>
          <tr class="row32">
            <td class="column0 style1 null"></td>
            <td class="column1 style47 s">Vasopressin</td>
            <td class="column2 style17 null"></td>
            <td class="column3 style18 s">BW x 1 unit/50mL</td>
            <td class="column4 style19 f">${weight * 1}</td>
            <td class="column5 style18 s">unit/50mL</td>
            <td class="column6 style49 s">1mL/hr=</td>
            <td class="column7 style56 n">0.020</td>
            <td class="column8 style57 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">unit/kg/hr</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> (0.02-0.06 U/kg/hr)</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">  (Wt: ≤ 20kg)</span></td>
          </tr>
          <tr class="row33">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Tranexemic acid</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">BW x 50 mg/</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">20mL</span></td>
            <td class="column4 style19 f">${weight * 50}</td>
            <td class="column5 style18 s">mg/20mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">2.50</td>
            <td class="column8 style46 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">mg/kg/hr </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(10ml/hr for 1hr then1ml/hr)</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> (Wt: ≤ 40kg)</span></td>
          </tr>
          <tr class="row34">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Dexmedetomidine (Neonate)</td>
            <td class="column2 style50 null"></td>
            <td class="column3 style44 s">BW x 10 mcg/50mL</td>
            <td class="column4 style19 f">${weight * 10}</td>
            <td class="column5 style44 s">mcg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style41 n">0.20</td>
            <td class="column8 style46 s">mcg/kg/hr</td>
          </tr>
          <tr class="row35">
            <td class="column0 style1 null"></td>
            <td class="column1 style58 s">Dexmedetomidine (CICU)</td>
            <td class="column2 style59 null"></td>
            <td class="column3 style60 s">200mcg/ 50 mL</td>
            <td class="column4 style61 n">200</td>
            <td class="column5 style60 s">mcg/50mL</td>
            <td class="column6 style62 s">1ml/hr=</td>
            <td class="column7 style63 f">1.33</td>
            <td class="column8 style64 s">mcg/kg/hr</td>
          </tr>
          <tr class="row36">
            <td class="column0 style1 null"></td>
            <td class="column1 style53 s">Fentanyl</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 s">BW x 250 mcg/50mL</td>
            <td class="column4 style19 f">${weight * 250}</td>
            <td class="column5 style18 s">mcg/50mL</td>
            <td class="column6 style65 s style23" colspan="3">1mL/hr= 5 mcg/kg/hr (Wt: ≤ 10kg) </td>
          </tr>
          <tr class="row37">
            <td class="column0 style1 null"></td>
            <td class="column1 style53 s">Midazolam</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style18 s">BW x 3 mg/50mL</td>
            <td class="column4 style19 f">${weight * 3}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style65 s style23" colspan="3">1mL/hr= 1.0 mcg/kg/min</td>
          </tr>
          <tr class="row38">
            <td class="column0 style1 null"></td>
            <td class="column1 style38 s">Morphine</td>
            <td class="column2 style39 null"></td>
            <td class="column3 style18 s">BW / 50mL</td>
            <td class="column4 style19 f">${weight}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style45 n">20</td>
            <td class="column8 style46 s">mcg/kg/hr (Wt: ≤ 50kg)</td>
          </tr>
          <tr class="row39">
            <td class="column0 style1 null"></td>
            <td class="column1 style47 s">Ketamine</td>
            <td class="column2 style17 null"></td>
            <td class="column3 style18 s">BW / 50mL</td>
            <td class="column4 style19 f">${weight}</td>
            <td class="column5 style18 s">mg/50mL</td>
            <td class="column6 style40 s">1mL/hr=</td>
            <td class="column7 style45 n">20</td>
            <td class="column8 style46 s">mcg/kg/hr (Wt: ≤ 50kg)</td>
          </tr>
          <tr class="row40">
            <td class="column0 style1 null"></td>
            <td class="column1 style69 s">Rocuronium</td>
            <td class="column2 style70 null"></td>
            <td class="column3 style71 s">BW x 25mg/50mL </td>
            <td class="column4 style72 f">${weight * 25}</td>
            <td class="column5 style71 s">mg/50mL</td>
            <td class="column6 style73 s">1ml/hr=</td>
            <td class="column7 style74 f">0.50</td>
            <td class="column8 style75 s">mg/kg/hr (Wt: ≤ 20kg)</td>
          </tr>
          <tr class="row45">
            <td class="column0 style1 null"></td>
            <td class="column1 style76 s style23" colspan="2">Fibrinogen (Haemocomplettan)</td>
            <td class="column3 style77 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">70 mg/kg </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(initial max. dose 2 g)</span></td>
            <td class="column4 style19 f">${Math.min(2000, weight * 70)}</td>
            <td class="column5 style26 s">mg</td>
            <td class="column6 style78 s style23" colspan="3"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">- Max. not &gt;5ml/min; Aim Fibtem A10 &gt;8 mm<br />
- Reconstituted solution up to 8H </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">at room temperature</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt"> (handover to CICU)</span></td>
          </tr>
          <tr class="row46">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Novoseven</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style26 s">90 mcg/kg</td>
            <td class="column4 style19 f">${weight * 90}</td>
            <td class="column5 style26 s">mcg</td>
            <td class="column6 style78 s style23" colspan="3"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">- Consider initial dose 20-40mcg/kg ; Redosed Q2H<br />
- Capped at 180 mcg/kg/</span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">day</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">)</span></td>
          </tr>
          <tr class="row47">
            <td class="column0 style1 null"></td>
            <td class="column1 style24 s">Octaplex (4 factor PCC)</td>
            <td class="column2 style25 null"></td>
            <td class="column3 style77 s"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">12.5 IU/kg </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">(initial max. dose 1000 IU)</span></td>
            <td class="column4 style19 f">${Math.min(1000, weight * 12.5)}</td>
            <td class="column5 style26 s">IU</td>
            <td class="column6 style78 s style23" colspan="3"><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">- Max. Adult dose 3000 IU ; Infuse at 2-3 ml/min<br />
- Reconstituted solution stored up to 8H </span><span style="font-weight:bold; color:#000000; font-family:'Helvetica Neue'; font-size:9pt">in the fridge ; </span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">U</span><span style="color:#000000; font-family:'Helvetica Neue'; font-size:9pt">se only after Novoseven</span></td>
          </tr>
        </tbody>
    </table>
  </body>
</html>
`,
        fileName: genName("cardiac"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  const MH = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <style type="text/css">
      .ritz .waffle a {
        color: inherit;
      }
      .ritz .waffle .s15 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s3 {
        border-left: none;
        background-color: #ffffff;
      }
      .ritz .waffle .s9 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s13 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s14 {
        background-color: #ffffff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s0 {
        background-color: #ffffff;
        text-align: center;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s4 {
        border-left: none;
        background-color: #ffffff;
        text-align: center;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s7 {
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s16 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s2 {
        border-left: none;
        border-right: none;
        background-color: #ffffff;
      }
      .ritz .waffle .s11 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s12 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s8 {
        border-bottom: 2px SOLID #000000;
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s10 {
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s1 {
        border-right: none;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s5 {
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s6 {
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
      }
    </style>
    <div class="ritz grid-container" dir="ltr">
      <table class="waffle" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="row-header freezebar-origin-ltr"></th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 20px">
            <th
              id="1473496397R0"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R1"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td></td>
            <td></td>
            <td class="s1 softmerge">
              <div class="softmerge-inner" style="width: 280px; left: -1px">
                MALIGNANT HYPERTHERMIA
              </div>
            </td>
            <td class="s2"></td>
            <td class="s3"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R2"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R3"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s5" colspan="2">DANROLENE:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R4"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s1 softmerge">
              <div class="softmerge-inner" style="width: 374px; left: -1px">
                each vial cobtains 20MILLIgrams of dantrolene
              </div>
            </td>
            <td class="s2"></td>
            <td class="s2"></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R5"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s1 softmerge">
              <div class="softmerge-inner" style="width: 280px; left: -1px">
                Dissolve 1 vial in 60 ML sterile water
              </div>
            </td>
            <td class="s2"></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R6"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s1 softmerge">
              <div class="softmerge-inner" style="width: 374px; left: -1px">
                dantrolene potentiates neuromuscular blockers
              </div>
            </td>
            <td class="s2"></td>
            <td class="s2"></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R7"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="s6"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R8"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s7" colspan="2">Body Weight (KG):</td>
            <td class="s8" dir="ltr">${weight}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R9"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R10"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s10" colspan="3">
              give
              <span style="font-size: 12pt; font-family: Arial; color: #c00000"
                >DANTROLENE</span
              ><span
                style="
                  font-size: 12pt;
                  font-family: Calibri, Arial;
                  color: #000000;
                "
              >
                (2.5 MILLIgram/KG)</span
              >
            </td>
            <td class="s11" colspan="2">
              <span style="font-size: 12pt; font-family: Arial; color: #c00000"
                >INTRAVENOUSLY</span
              ><span
                style="
                  font-size: 12pt;
                  font-family: Calibri, Arial;
                  color: #000000;
                "
              >
                =</span
              >
            </td>
            <td class="s12">${weight * 2.5}</td>
            <td class="s13">MILLIgrams</td>
            <td class="s14">rapidly</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R11"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R12"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R13"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R14"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s11" colspan="3">subsequent dantrolene boluses:</td>
            <td class="s15">${weight}</td>
            <td class="s16">MILLIgrams</td>
            <td class="s10" colspan="2">intravenously</td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R15"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s10" colspan="2">(1 MILLIgram/KG)</td>
            <td class="s10"></td>
            <td class="s10"></td>
            <td class="s10"></td>
            <td class="s10"></td>
            <td class="s10"></td>
            <td class="s10"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1473496397R16"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s10" colspan="6">
              (every 5 minutes til symptoms subside or up to total of 10
              MILLIgrams/KG)
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`,
        fileName: genName("malignant"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const HyperK = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <style type="text/css">
      .ritz .waffle a {
        color: inherit;
      }
      .ritz .waffle .s20 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: center;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s24 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s5 {
        border-bottom: 2px SOLID #000000;
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s9 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s25 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s27 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s28 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s0 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #ffffff;
        text-align: center;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 10pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s15 {
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s17 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s16 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s4 {
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s13 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s18 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s23 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s3 {
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s6 {
        border-right: none;
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s11 {
        border-bottom: 2px SOLID #000000;
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s19 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s29 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s12 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: top;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s8 {
        border-left: none;
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s7 {
        border-left: none;
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s22 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s21 {
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s1 {
        background-color: #ffffff;
        text-align: center;
        font-weight: bold;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s10 {
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s14 {
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s2 {
        background-color: #ffffff;
        text-align: left;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 10pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s26 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
    </style>
    <div class="ritz grid-container" dir="ltr">
      <table class="waffle" cellspacing="0" cellpadding="0">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr style="height: 20px">
            <th
              id="91737183R0"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td class="s1" colspan="6">
              EMERGENCY MANAGEMENT OF HYPAEKALAEMIA IN CHILDREN &amp; NEONATES
            </td>
            <td class="s2"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R1"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="s3"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R2"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s4" colspan="2">enter Body WEIGHT (KG) =</td>
            <td class="s5" dir="ltr">${weight}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R3"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R4"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s6 softmerge">
              <div class="softmerge-inner" style="width: 229px; left: -1px">
                3. Inititate Treatment
              </div>
            </td>
            <td class="s7"></td>
            <td class="s8"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R5"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">Salbutamol 0.5% solution</td>
            <td class="s12" colspan="2" rowspan="2">
              Nebulise with 8 L oxygen :
            </td>
            <td class="s13">&lt; 25 KG:</td>
            <td class="s13" colspan="3">2.5 MG in 4 ML of NS Q1-2H</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R6"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s14"></td>
            <td></td>
            <td class="s13">&gt; 25 KG:</td>
            <td class="s13" colspan="3">5 MG in 4 ML of NS Q1-2H</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R7"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s15"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R8"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">Regular Insulin (Actrapid)</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td class="s14" colspan="3"></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R9"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s17" colspan="2"></td>
            <td class="s18">IV</td>
            <td class="s19">0.1</td>
            <td class="s20">${weight * 0.1}</td>
            <td class="s20">IU</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s21" colspan="4"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R10"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s22"></td>
            <td class="s22"></td>
            <td class="s22"></td>
            <td class="s22"></td>
            <td class="s22"></td>
            <td class="s22"></td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s21" colspan="2"></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R11"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s16">ONSET</td>
            <td class="s16">DURATION</td>
            <td class="s16" colspan="4">REMARKS</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R12"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s23">15-20 min</td>
            <td class="s23">4-6 h</td>
            <td class="s24" colspan="4">
              administer together with DEXTROSE (10% or 50%)
            </td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td class="s14"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R13"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s17"></td>
            <td class="s17"></td>
            <td class="s23" colspan="4">1 IU to every 5 g glucose</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R14"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23" colspan="4">administer in 1 IU/ML dilution</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R15"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s17" colspan="4">MAX: 10 IU per dose</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R16"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23" colspan="4">check H/C; may cause hypoglycaemia</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R17"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s21"></td>
            <td class="s23"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13" colspan="4">may be repeated</td>
            <td class="s21"></td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R18"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R19"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">Dextrose 10%</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R20"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s18">IV</td>
            <td class="s26">5</td>
            <td class="s27">${weight * 5}</td>
            <td class="s18">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R21"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R22"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s16" colspan="3">REMARKS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R23"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s28" colspan="3">administer together with INSULIN</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R24"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R25"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">Dextrose 50%</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R26"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s18">IV</td>
            <td class="s26">1</td>
            <td class="s27">${weight}</td>
            <td class="s18">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R27"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R28"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s16" colspan="3">REMARKS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R29"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s23" colspan="3">
              administer
              <span style="font-size: 12pt; font-family: Arial; color: #c00000"
                >via large bore peripheral IV
              </span>
            </td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R30"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s29" colspan="3">or central venous access</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R31"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s28" colspan="3">administer together with insulin</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R32"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R33"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">10% Calcium Gluconate</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R34"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s18">IV</td>
            <td class="s26">0.5</td>
            <td class="s27">${weight * 0.5}</td>
            <td class="s18">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R35"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R36"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s16">ONSET</td>
            <td class="s16">DURATION</td>
            <td class="s16" colspan="4">REMARKS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R37"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s23">5- 10 min</td>
            <td class="s23">30- 60 min</td>
            <td class="s23" colspan="4">
              may cause hypercalcaemia &amp; tissue necrosis
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R38"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13" colspan="4">may be repeated</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R39"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R40"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">10% Calcium Chloride</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R41"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s18">IV</td>
            <td class="s26">0.2</td>
            <td class="s27">${weight * 0.2}</td>
            <td class="s18">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R42"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3"></td>
            <td class="s3"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R43"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s10"></td>
            <td class="s11" colspan="2">8.4% NaHCO3</td>
            <td class="s16">ROUTE</td>
            <td class="s16">DOSE/KG BODY WEIGHT</td>
            <td class="s16">AMOUNT</td>
            <td class="s16">UNITS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R44"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s18">IV</td>
            <td class="s26">1</td>
            <td class="s27">${weight}</td>
            <td class="s18">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R45"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td class="s9"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R46"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s16">ONSET</td>
            <td class="s16">DURATION</td>
            <td class="s16" colspan="2">REMARKS</td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R47"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s23">15 min</td>
            <td class="s23">1-2 H</td>
            <td class="s23" colspan="2">give over 10 min</td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R48"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23" colspan="2">DO NOT mix with Calcium</td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="91737183R49"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s25"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13" colspan="2">Max: 50 mmol/dose</td>
            <td class="s21"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`,
        fileName: genName("Hyperkalemia"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const Anaphylaxis = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
      type="text/css"
      rel="stylesheet"
      href="resources/sheet.css"
    />
    <style type="text/css">
      .ritz .waffle a {
        color: inherit;
      }
      .ritz .waffle .s35 {
        border-bottom: 1px SOLID #ff0000;
        border-right: 1px SOLID #ff0000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s8 {
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s49 {
        border-bottom: 1px SOLID #548135;
        border-right: 1px SOLID #ff0000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s14 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s37 {
        border-bottom: 1px SOLID #ff0000;
        border-right: 1px SOLID #ff0000;
        background-color: #ffe5f7;
        text-align: center;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s28 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #c00000;
        background-color: #d2e1ff;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s31 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #ff0000;
        background-color: #d2e1ff;
        text-align: left;
        font-weight: bold;
        color: #0070c0;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s25 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #c00000;
        background-color: #d2e1ff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s48 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #ff0000;
        background-color: #ffe5f7;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s9 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID #8eaadb;
        background-color: #d2e1ff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s29 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: right;
        font-weight: bold;
        color: #0070c0;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s24 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #ff0000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s26 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #c00000;
        background-color: #d2e1ff;
        text-align: center;
        font-weight: bold;
        color: #0070c0;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s4 {
        border-right: 2px SOLID transparent;
        background-color: #ffffff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s30 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #c00000;
        background-color: #d2e1ff;
        text-align: left;
        font-weight: bold;
        color: #0070c0;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s15 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #d2e1ff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s46 {
        border-right: none;
        border-bottom: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s34 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID #ff0000;
        background-color: #d2e1ff;
        text-align: left;
        color: #0070c0;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s51 {
        border-bottom: 1px SOLID #ff0000;
        border-right: 1px SOLID #548135;
        background-color: #c5e0b3;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s2 {
        border-bottom: 2px SOLID transparent;
        background-color: #ffffff;
      }
      .ritz .waffle .s32 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s44 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #ff0000;
        background-color: #ffe5f7;
        text-align: left;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s47 {
        border-left: none;
        border-bottom: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s7 {
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s22 {
        border-bottom: 1px SOLID #c00000;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s36 {
        border-bottom: 1px SOLID #ff0000;
        border-right: 1px SOLID #ff0000;
        background-color: #ffe5f7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s45 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID transparent;
        background-color: #ffe5f7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s16 {
        border-bottom: 1px SOLID #ff0000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s13 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #8eaadb;
        background-color: #d2e1ff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s11 {
        border-bottom: 1px SOLID #8eaadb;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s10 {
        border-bottom: 1px SOLID #8eaadb;
        border-right: 1px SOLID #8eaadb;
        background-color: #d2e1ff;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s3 {
        border-bottom: 1px SOLID transparent;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s50 {
        border-bottom: 1px SOLID #ff0000;
        border-right: 1px SOLID #548135;
        background-color: #c5e0b3;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s43 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: left;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s39 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID transparent;
        background-color: #ffe5f7;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s17 {
        border-bottom: 1px SOLID #ff0000;
        background-color: #ffffff;
      }
      .ritz .waffle .s41 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s42 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID transparent;
        background-color: #ffe5f7;
        text-align: right;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s5 {
        border-bottom: 2px SOLID transparent;
        border-right: 2px SOLID transparent;
        background-color: #ffffff;
        text-align: center;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s27 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s12 {
        border-bottom: 1px SOLID #8eaadb;
        border-right: 1px SOLID #000000;
        background-color: #d2e1ff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s0 {
        background-color: #ffffff;
        text-align: center;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 10pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s1 {
        background-color: #ffffff;
        text-align: center;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s19 {
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s23 {
        border-bottom: 1px SOLID #c00000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s38 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: center;
        font-weight: bold;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s33 {
        border-bottom: 1px SOLID #c00000;
        border-right: 1px SOLID transparent;
        background-color: #d2e1ff;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s6 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s21 {
        border-right: 1px SOLID #ff0000;
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s20 {
        background-color: #ffffff;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s18 {
        border-right: 1px SOLID #ff0000;
        background-color: #ffffff;
      }
      .ritz .waffle .s40 {
        border-bottom: 1px SOLID #7030a0;
        border-right: 1px SOLID #7030a0;
        background-color: #ffe5f7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
    </style>
    <div class="ritz grid-container" dir="ltr">
      <table class="waffle" cellspacing="0" cellpadding="0">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr style="height: 20px">
            <th
              id="885691738R0"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R1"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td class="s1" colspan="2">ANAPHYLAXIS</td>
            <td class="s0"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R2"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s2"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R3"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s3">IMMEDIATE TREATMENT</td>
            <td></td>
            <td class="s4" colspan="3">enter BODY WEIGHT(KG)=</td>
            <td class="s5" dir="ltr">${weight}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R4"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s6" colspan="5" rowspan="2"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R5"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s7"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R6"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s8"></td>
            <td class="s9">NS/ RL</td>
            <td class="s10">IV</td>
            <td class="s10">BOLUS</td>
            <td class="s11">${weight * 10}</td>
            <td class="s12">ML</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R7"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s8"></td>
            <td class="s13">(10-30 ML/KG)</td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td class="s14"></td>
            <td class="s15"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R8"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s16" colspan="5"></td>
            <td class="s17"></td>
            <td class="s17"></td>
            <td class="s17"></td>
            <td class="s17"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R9"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s19">EPINEPHRINE</td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s20"></td>
            <td class="s21"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R10"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s21"></td>
            <td class="s22"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s23"></td>
            <td class="s24"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R11"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s25">10 MICROgram/KG</td>
            <td class="s26">IM</td>
            <td class="s26">BOLUS</td>
            <td class="s27">${weight * 10}</td>
            <td class="s25">MICROgrams</td>
            <td class="s28">or</td>
            <td class="s29">${weight * 0.1}</td>
            <td class="s30">ML</td>
            <td class="s31">1: 10 000</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R12"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s32"></td>
            <td class="s33"></td>
            <td class="s33"></td>
            <td class="s32" colspan="3">(MAX: 300 MICROgram)</td>
            <td class="s33"></td>
            <td class="s33"></td>
            <td class="s34">DILUTION</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R13"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s35" colspan="9"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R14"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s36">1 MICROgram/KG</td>
            <td class="s37">IV/IO</td>
            <td class="s38">BOLUS</td>
            <td class="s39">${weight}</td>
            <td class="s40">MICROgrams</td>
            <td class="s41">or</td>
            <td class="s42">${weight * 0.1}</td>
            <td class="s43">ML</td>
            <td class="s44">1: 100 000</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R15"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s46 softmerge">
              <div class="softmerge-inner" style="width: 187px; left: -1px">
                (MAX: 1000 MICROgram)
              </div>
            </td>
            <td class="s47"></td>
            <td class="s47"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s48">DILUTION</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R16"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s49" colspan="9"></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="885691738R17"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s50">0.02-0.2 MICROgram/KG/MIN</td>
            <td class="s51">IV/IO</td>
            <td class="s51">INFUSION</td>
            <td class="s35" colspan="6"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`,
        fileName: genName("Anaphylaxis"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      const updatedFiles = [...files, file.filePath];
      setFileArray(updatedFiles);
      saveFiles(updatedFiles).then(() =>
        console.log(
          "successfully saved to AsyncStorage (CalcScreen_PDF): ",
          updatedFiles
        )
      );
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.treeTop,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: Dimensions.get("window").width,
          marginTop: 25,
          alignItems: "center",
          alignContent: "center",
        }}
      ></View>

      <View style={styles.contentContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn1}>
            <TextInputButton
              title="Weight / Age"
              unit="kg"
              action={(prop) => setWeight(prop)}
              backgroundColor={"#313135"}
              width={Dimensions.get("window").width * 0.3333333}
              height={Dimensions.get("window").height * 0.06635071}
            />
          </View>
          <View style={styles.buttonColumn2}>
            <Text
              style={[styles.select, { color: isDarkMode ? "white" : "black" }]}
              allowFontScaling={false}
            >
              Select{" "}
              <Text
                style={[
                  styles.one,
                  {
                    fontWeight: isDarkMode ? "700" : "800",
                    color: isDarkMode ? "white" : "black",
                  },
                ]}
                allowFontScaling={false}
              >
                one
              </Text>
            </Text>
            <TouchableOpacity onPress={() => setButtonState("cardiac")}>
              <TextButton
                title="Cardiac"
                width={Dimensions.get("window").width * 0.46153846}
                height={Dimensions.get("window").height * 0.06812796}
                bgHex="#313135"
                contentHex={"white"}
                borderRadius={
                  Dimensions.get("window").height * 0.06812796 * 0.30434783
                }
                borderColor={
                  buttonState === "cardiac" ? "#72A8DA" : "transparent"
                }
                borderWidth={1}
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").width * 0.46153846 * 0.08
                    : Dimensions.get("window").width * 0.46153846 * 0.10555556
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setButtonState("scoliosis")}>
              <TextButton
                title="Scoliosis"
                width={Dimensions.get("window").width * 0.46153846}
                height={Dimensions.get("window").height * 0.06812796}
                bgHex="#313135"
                contentHex={"white"}
                borderColor={
                  buttonState === "scoliosis" ? "#72A8DA" : "transparent"
                }
                borderWidth={1}
                borderRadius={
                  Dimensions.get("window").height * 0.06812796 * 0.30434783
                }
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").width * 0.46153846 * 0.08
                    : Dimensions.get("window").width * 0.46153846 * 0.10555556
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setButtonState("drugs")}>
              <TextButton
                title="Drugs"
                width={Dimensions.get("window").width * 0.46153846}
                height={Dimensions.get("window").height * 0.06812796}
                bgHex="#313135"
                contentHex={"white"}
                borderColor={
                  buttonState === "drugs" ? "#72A8DA" : "transparent"
                }
                borderWidth={1}
                borderRadius={
                  Dimensions.get("window").height * 0.06812796 * 0.30434783
                }
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").width * 0.46153846 * 0.08
                    : Dimensions.get("window").width * 0.46153846 * 0.10555556
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setButtonState("ett_vitals")}>
              <TextButton
                title="ETT Vitals"
                width={Dimensions.get("window").width * 0.46153846}
                height={Dimensions.get("window").height * 0.06812796}
                bgHex="#313135"
                contentHex={"white"}
                borderColor={
                  buttonState === "ett_vitals" ? "#72A8DA" : "transparent"
                }
                borderWidth={1}
                borderRadius={
                  Dimensions.get("window").height * 0.06812796 * 0.30434783
                }
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").width * 0.46153846 * 0.08
                    : Dimensions.get("window").width * 0.46153846 * 0.10555556
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setButtonState("pain")}>
              <TextButton
                title="Pain"
                width={Dimensions.get("window").width * 0.46153846}
                height={Dimensions.get("window").height * 0.06812796}
                bgHex="#313135"
                contentHex={"white"}
                borderColor={buttonState === "pain" ? "#72A8DA" : "transparent"}
                borderWidth={1}
                borderRadius={
                  Dimensions.get("window").height * 0.06812796 * 0.30434783
                }
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").width * 0.46153846 * 0.08
                    : Dimensions.get("window").width * 0.46153846 * 0.10555556
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 50 }}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                if (buttonState === "scoliosis") {
                  scoliosis(weight);
                }
                if (buttonState === "cardiac") {
                  cardiac(weight);
                }
                if (buttonState === "pain") {
                  pain(weight);
                }
                if (buttonState === "ett_vitals") {
                  ett_vitals(weight);
                }
                if (buttonState === "drugs") {
                  drugs(weight);
                }
                if (buttonState === "MH") {
                  MH(weight);
                }
                if (buttonState === "HyperK") {
                  HyperK(weight);
                }
                if (buttonState === "LA Toxicity") {
                  LAToxic(weight);
                }
                if (buttonState === "Anaphylaxis") {
                  Anaphylaxis(weight);
                }
              }}
            >
              <IconButton
                bgHex="#72A8DA"
                title="View"
                iconPath="folder-outline"
                contentHex="white"
                borderColor={"rgb(30, 30, 32)"}
                borderWidth={0}
                size={(Dimensions.get("window").height / 844) * 25}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").height * 0.04739336 * 0.45
                    : 19
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <FontAwesome
                name="history"
                size={40}
                color={isDarkMode ? "white" : "#313135"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.selectionRow}>
            <TextButton
              title="Drug"
              width={Dimensions.get("window").width * 0.4}
              height={Dimensions.get("window").height * 0.04739336}
              bgHex="#313135"
              contentHex={"white"}
              borderColor={"#72A8DA"}
              borderWidth={1}
              borderRadius={
                Dimensions.get("window").height * 0.04739336 * 0.94594595
              }
              fontWeight={"700"}
              textSize={
                Platform.isPad
                  ? Dimensions.get("window").height * 0.04739336 * 0.45
                  : 19
              }
            />
            <TouchableOpacity onPress={() => navigation.navigate("Bmi")}>
              <TextButton
                title="BMI"
                width={Dimensions.get("window").width * 0.4}
                height={Dimensions.get("window").height * 0.04739336}
                bgHex="#313135"
                contentHex={"white"}
                borderRadius={
                  Dimensions.get("window").height * 0.04739336 * 0.94594595
                }
                fontWeight={"700"}
                textSize={
                  Platform.isPad
                    ? Dimensions.get("window").height * 0.04739336 * 0.45
                    : 19
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const FileItem = ({ item, setDisplayFiles, displayFiles, files, setFiles }) => {
  const title = item.replace(/.*\/|\.pdf$/g, ""); // Remove everything before the item and .pdf so easier for renaming
  const [newName, setNewName] = useState(title);
  const saveFiles = async (filesArray) => {
    try {
      const jsonValue = JSON.stringify(filesArray);
      await AsyncStorage.setItem("files", jsonValue).then(() =>
        console.log(
          "Successfully saved to AsyncStorage (saveFiles - FileItem): ",
          jsonValue
        )
      );
    } catch (e) {
      console.error("Error saving files (saveFiles - FileItem): ", e);
    }
  };
  // for deleting the files
  // TODO: add async storage
  const deletion = () => {
    RNFS.unlink(item)
      .then(() => {
        Alert.alert("Success", "File Deleted");
        console.log("FILE DELETED");
        setFiles((currentFiles) => {
          const updatedFiles = currentFiles.filter((file) => file !== item);
          setDisplayFiles(updatedFiles);
          saveFiles(updatedFiles);
          return updatedFiles;
        });
        console.log("Files after deletion: ", files);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const rename = () => {
    // Obtains new name
    const directoryPath = item.substring(0, item.lastIndexOf("/") + 1);
    const newPath = `${directoryPath}${newName}.pdf`;

    // Check if newPath already exists in files array
    if (files.includes(newPath)) {
      Alert.alert(
        "Error",
        "A file with this name already exists. Please choose a different name."
      );
      return; // Exit the function to prevent renaming to an existing name
    }

    // Renames the file
    RNFS.moveFile(item, newPath)
      .then(() => {
        Alert.alert("Success", "File Renamed");
        console.log("FILE RENAMED");
        setFiles((currentFiles) => {
          const updatedFiles = currentFiles.map((file) =>
            file === item ? newPath : file
          );
          setDisplayFiles(updatedFiles);
          saveFiles(updatedFiles);
          return updatedFiles;
        });
        console.log("Files after renaming: ", files);
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert("Error", "Failed to rename the file.");
      });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: Dimensions.get("window").width - 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          width: Dimensions.get("window").width - 20,
          height: "60%",
        }}
      >
        <View style={styles.rectangle}>
          <TextInput
            style={{ ...styles.title, width: "70%" }}
            onChangeText={(text) => {
              setNewName(text);
            }}
            allowFontScaling={false}
          >
            {title}
          </TextInput>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <TouchableOpacity onPress={rename}>
              <AntDesign name="edit" style={{ color: "grey", fontSize: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deletion}>
              <AntDesign
                name="delete"
                style={{ color: "grey", fontSize: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => FileViewer.open(item)}>
              <AntDesign name="login" style={{ color: "grey", fontSize: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const FileScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [displayFiles, setDisplayFiles] = useState([]);
  const [files, setFileArray] = useState([]);
  const getFilePaths = async () => {
    try {
      const savedValue = await AsyncStorage.getItem("files");
      if (savedValue !== null) {
        const filesArray = JSON.parse(savedValue);
        setFileArray(filesArray);
        setDisplayFiles(filesArray);
        console.log("Files retrieved (FileScreen): ", filesArray);
      }
    } catch (e) {
      console.error("Error retrieving files (FileScreen): ", e);
    }
  };
  useEffect(() => {
    getFilePaths();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.treeTop,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <FlatList
          data={displayFiles}
          style={{ marginBottom: 150 }}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: isDarkMode ? "white" : "black",
              }}
              allowFontScaling={false}
            >
              No files available
            </Text>
          )}
          renderItem={({ item }) => (
            <FileItem
              item={item}
              setDisplayFiles={setDisplayFiles}
              files={files}
              setFiles={setFileArray}
              displayFiles={displayFiles}
            />
          )}
          keyExtractor={(item, index) => item + index}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Stack.Navigator initialRouteName="Calc">
      <Stack.Screen
        name="Calc"
        component={CalcScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bmi"
        component={Bmi}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          ),
          headerStyle: {
            backgroundColor: "rgb(30, 30, 32)",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="History"
        component={FileScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          ),
          headerStyle: {
            backgroundColor: "rgb(30, 30, 32)",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  treeTop: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  rectangle: {
    width: Dimensions.get("window").width * 0.95,
    marginBottom: 20,
    backgroundColor: "rgb(69, 69, 74)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    overflow: "hidden",
    paddingVertical: 15,
    marginHorizontal: 15,
    height: Dimensions.get("window").height * 0.1,
    paddingHorizontal: "5%",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    marginTop: 20,
    paddingHorizontal: Platform.isPad ? 10 : 5,
    height: Dimensions.get("window").height * 0.7582984,
    width: Platform.isPad
      ? Dimensions.get("window").width
      : Dimensions.get("window").width * 0.925,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonColumn1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
  buttonColumn2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  one: {
    fontSize: 18,
    marginBottom: 10,
  },
  actionRow: {
    width: Platform.isPad
      ? Dimensions.get("window").width
      : Dimensions.get("window").width * 0.925,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 20,
  },
  divider: {
    height: 1,
    width: Dimensions.get("window").width - 20,
    borderWidth: 1,
    borderColor: "#6D6D74",
    marginVertical: 35,
  },
  selectionRow: {
    width: Platform.isPad
      ? Dimensions.get("window").width
      : Dimensions.get("window").width * 0.925,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "15%",
  },
});

export default App;
