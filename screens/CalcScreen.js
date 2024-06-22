import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import TopBar from "../components/TopBar";
import TextInputButton from "../components/TextInputButton";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import Bmi from "./Bmi";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDarkMode } from "../components/DarkModeContext";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import FileViewer from "react-native-file-viewer";

function CalcScreen({ navigation }) {
  // Reference dimension : iPhone 14
  // console.log(Dimensions.get("window").width);  390
  // console.log(Dimensions.get("window").height);  844
  const windowWidth = useWindowDimensions().width;
  const [buttonState, setButtonState] = useState("");
  const [weight, setWeight] = useState(0);

  const scoliosis = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
      }
      th,
      td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }
      .longthingy {
        width: 200px;
      }
      .shortthingy {
        width: 20%;
      }
      .header > td {
        background-color: #6bb4e7;
        text-align: center;
      }
      .drug {
        width: 26%;
      }
      .dosekg {
        width: 25%;
      }
      .amount {
        width: 9%;
      }
      .unit {
        width: 9%;
      }
      .remarks {
        width: 25%;
      }
      .dexy {
        width: 60%;
      }
      .dexy2 {
        width: 20%;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Scolliosis</h1>
      <p id="weight">${weight}kg</p>
      <!-- propofol-->
      <table>
        <tr>
          <td class="shortthingy">Propofol</td>
          <td class="longthingy">
            TCI - Draw up the drug neat into 50 ml syringe for infusion
          </td>
          <td class="shortthingy"></td>
        </tr>
      </table>
      <!-- Remifentanil-->
      <table>
        <tr>
          <td class="shortthingy">Remifentanil</td>
          <td class="longthingy">TCI - Draw up 2mg in 50 ml for infusion</td>
          <td class="shortthingy">0.01-1 mcg/kg/min, titrate to effect</td>
        </tr>
      </table>
      <!-- Dexmedetomidine-->
      <table>
        <tr>
          <td class="shortthingy">Dexmedetomidine</td>
          <td class="longthingy dexy">
            Draw 200 mcg in 50 ml. Use BBraun Infusion Pump Dexmedetomidine
            setting"".<br />
            <b>(Dex is NOT always used - ASK Consultant before diluting)</b>
          </td>
          <td class="dexy2">
            <div>1 ml/hr =</div>
            <div id="dexcal">${(4 / weight).toFixed(14)}</div>
            <div>mcg/kg/hr</div>
            <br />
            <div>0.2-0.5 mcg/kg/hr</div>
          </td>
        </tr>
      </table>

      <!-- New 3 x 5 Table -->
      <table>
        <!-- Header + Transexmic acid-->
        <tr class="header">
          <td class="drug">Drug</td>
          <td class="dosekg">Dose/KG</td>
          <td class="amount">Amount</td>
          <td class="unit">Unit</td>
          <td class="remarks">Remarks</td>
        </tr>
        <tr class="under40">
          <td class="drug">Tranexemic acid (< 40kg)</td>
          <td class="dosekg">( BWT x 50 ) mg/20ml</td>
          <td id="t<40am" class="amount">${weight * 50}</td>
          <td class="unit">mg/20ml</td>
          <td class="remarks">
            1ml/hr=2.5 mg/kg/hr<br />
            (10ml/hr for 1hr then 1ml/hr)"
          </td>
        </tr>
        <tr class="above40">
          <td class="drug">Tranexemic acid (≥ 40kg)</td>
          <td class="dosekg">2000 mg/20 ml/td</td>
          <td id="t>40am" class="amount">2000</td>
          <td class="unit">mg/20ml</td>
          <td class="remarks">(10ml/hr for 1hr then 1ml/hr)</td>
        </tr>
      </table>
      <table>
        <!--Morphine + ketamine PCA acid-->
        <tr class="header">
          <td class="drug">Drug</td>
          <td class="dosekg">Dose/KG</td>
          <td class="amount">Amount</td>
          <td class="unit">Unit</td>
          <td class="remarks">Remarks</td>
        </tr>
        <tr class="under50">
          <td class="drug">Morphine <br />Ketamine PCA(<50kg)</td>
          <td class="dosekg">
            [ (BWT) mg Morphine + (BWT) mg Ketamine ] / 50 ml
          </td>
          <td id="t<50am" class="amount">${weight}</td>
          <td class="unit">mg/50ml</td>
          <td class="remarks">1ml/hr=20mcg/kg/hr</td>
        </tr>
        <tr class="over50">
          <td class="drug">Morphine <br />Ketamine PCA(≥50kg)</td>
          <td class="dosekg">( 50 mg Morphine + 50 mg Ketamine ) / 50ml</td>
          <td id="t>50am" class="amount">50</td>
          <td class="unit">mg/50ml</td>
          <td class="remarks">1ml/hr=1mg/hr</td>
        </tr>
      </table>
    </div>
    <script>
      document.getElementById("t>50am").innerHTML = 50;
    </script>
  </body>
</html>
`,
        fileName: "scoliosis",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const cardiac = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
        <style type="text/css">
  .ritz {
    white-space: normal;
    overflow-wrap: break-word;
  }
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s6 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s13 {
    border-right: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s0 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s2 {
    border-bottom: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s4 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s9 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s16 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #aaaaaa;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s10 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s20 {
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s24 {
    border-left: none;
    border-right: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s7 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s8 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s3 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ff0000;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s19 {
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s21 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: normal;
    overflow: hidden;
    word-wrap: break-word;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s23 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #000000;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s14 {
    border-left: none;
    border-right: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s26 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: normal;
    overflow: hidden;
    word-wrap: break-word;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s17 {
    border-right: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s1 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s18 {
    border-left: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s12 {
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s25 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: normal;
    overflow: hidden;
    word-wrap: break-word;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s22 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #000000;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s15 {
    border-left: none;
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s5 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s11 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: "docs-Helvetica Neue", Arial;
    font-size: 9pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
</style>
<div class="ritz grid-container" dir="ltr">
  <table class="waffle no-grid" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th class="row-header freezebar-origin-ltr"></th>
        <th
          id="1243788770C0"
          style="width: 8px"
          class="column-headers-background"
        >
          A
        </th>
        <th
          id="1243788770C1"
          style="width: 130px"
          class="column-headers-background"
        >
          B
        </th>
        <th
          id="1243788770C2"
          style="width: 144px"
          class="column-headers-background"
        >
          C
        </th>
        <th
          id="1243788770C3"
          style="width: 212px"
          class="column-headers-background"
        >
          D
        </th>
        <th
          id="1243788770C4"
          style="width: 78px"
          class="column-headers-background"
        >
          E
        </th>
        <th
          id="1243788770C5"
          style="width: 84px"
          class="column-headers-background"
        >
          F
        </th>
        <th
          id="1243788770C6"
          style="width: 49px"
          class="column-headers-background"
        >
          G
        </th>
        <th
          id="1243788770C7"
          style="width: 32px"
          class="column-headers-background"
        >
          H
        </th>
        <th
          id="1243788770C8"
          style="width: 246px"
          class="column-headers-background"
        >
          I
        </th>
      </tr>
    </thead>
    <tbody>
      <tr style="height: 16px">
        <th
          id="1243788770R0"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">1</div>
        </th>
        <td class="s0"></td>
        <td class="s1">Drugs Calculator</td>
        <td class="s1">kg</td>
        <td class="s1">Dose/kg BW</td>
        <td class="s2"></td>
        <td class="s2"></td>
        <td class="s2"></td>
        <td class="s2"></td>
        <td class="s2"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R1"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">2</div>
        </th>
        <td class="s0"></td>
        <td class="s1">BW in kg =</td>
        <td class="s1">${weight}</td>
        <td class="s3">
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
          >
            START HERE</span
          >
        </td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s6" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R2"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">3</div>
        </th>
        <td class="s7"></td>
        <td class="s4" colspan="2"></td>
        <td class="s8"></td>
        <td class="s9">Amount</td>
        <td class="s9">Unit</td>
        <td class="s9" colspan="3">Remarks</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R3"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">4</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Adrenaline</td>
        <td class="s8">10</td>
        <td class="s9">${weight * 10}</td>
        <td class="s8">mcg</td>
        <td class="s1" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R4"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">5</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Adenosine (1st bolus)</td>
        <td class="s8">0.1</td>
        <td class="s9">${Math.min(6, weight * 0.1)}</td>
        <td class="s8">mg</td>
        <td class="s8" colspan="3">first bolus (max 6 mg)</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R5"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">6</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Adenosine (2nd bolus)</td>
        <td class="s8">0.2</td>
        <td class="s9">${Math.min(12, weight * 0.2)}</td>
        <td class="s8">mg</td>
        <td class="s8" colspan="3">second bolus (max 12mg)</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R6"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">7</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Amiodarone</td>
        <td class="s8">5</td>
        <td class="s9">${Math.min(300, weight * 5)}</td>
        <td class="s8">mg</td>
        <td class="s8" colspan="3">over 20-60 minutes</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R7"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">8</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Atropine</td>
        <td class="s8">0.02</td>
        <td class="s9">${Math.min(1.2, weight * 0.02)}</td>
        <td class="s8">mg</td>
        <td class="s1" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R8"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">9</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Bicarb (8.4%)</td>
        <td class="s8">1</td>
        <td class="s9">${weight}</td>
        <td class="s8">mL</td>
        <td class="s1" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R9"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">10</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">
          CaCl<span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >2 </span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(10%)</span
          >
        </td>
        <td class="s8">0.2</td>
        <td class="s9">${weight * 0.2}</td>
        <td class="s8">mL</td>
        <td class="s1" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R10"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">11</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Cefazolin</td>
        <td class="s8">30</td>
        <td class="s9">${Math.min(2000, weight * 30)}</td>
        <td class="s8">mg</td>
        <td class="s8" colspan="3">
          repeat 4 hourly - max
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >2000mg</span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              color: #000000;
            "
          >
            per dose</span
          >
        </td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R11"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">12</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Fentanyl</td>
        <td class="s8">20</td>
        <td class="s9">${weight * 20}</td>
        <td class="s8">mcg</td>
        <td class="s8" colspan="3">Titrated</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R12"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">13</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Heparin</td>
        <td class="s8">300</td>
        <td class="s9">${weight * 300}</td>
        <td class="s8">IU</td>
        <td class="s10" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R13"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">14</div>
        </th>
        <td class="s0"></td>
        <td class="s11">Lignocaine (1%)</td>
        <td class="s1"></td>
        <td class="s8">1</td>
        <td class="s9">${weight}</td>
        <td class="s8">mg</td>
        <td class="s12"></td>
        <td class="s11"></td>
        <td class="s1"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R14"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">15</div>
        </th>
        <td class="s0"></td>
        <td class="s12">
          MgSO<span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >4</span
          >
        </td>
        <td class="s1"></td>
        <td class="s8">50</td>
        <td class="s9">${Math.min(2000, weight * 50)}</td>
        <td class="s13 softmerge">
          <div class="softmerge-inner" style="width: 325px; left: -1px">
            Dilute to 100mg/ml, infuse over 1-hour,
            <span
              style="
                font-size: 9pt;
                font-family: Helvetica Neue, Arial;
                font-weight: bold;
                color: #000000;
              "
              >Max 2000mg</span
            >
          </div>
        </td>
        <td class="s14"></td>
        <td class="s15"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R15"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">16</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Protamine</td>
        <td class="s8">3</td>
        <td class="s9">${weight * 3}</td>
        <td class="s8">mg</td>
        <td class="s1" colspan="3">ONLY BY CONSULTANT</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R16"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">17</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Phenylephrine</td>
        <td class="s8">10</td>
        <td class="s9">${weight * 10}</td>
        <td class="s8">mcg</td>
        <td class="s1" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R17"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">18</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Vasopressin</td>
        <td class="s8">0.1</td>
        <td class="s9">${weight * 0.1}</td>
        <td class="s8">unit</td>
        <td class="s12"></td>
        <td class="s11"></td>
        <td class="s1"></td>
      </tr>
      <tr style="height: 8px">
        <th
          id="1243788770R18"
          style="height: 8px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 8px">19</div>
        </th>
        <td class="s7"></td>
        <td class="s4" colspan="2"></td>
        <td class="s5"></td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s16" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R19"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">20</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Synch cardioversion</td>
        <td class="s8">0.5</td>
        <td class="s9">${weight * 0.5}</td>
        <td class="s8">J</td>
        <td class="s8" colspan="3">SVT/VT with pulse</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R20"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">21</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Synch cardioversion</td>
        <td class="s8">1</td>
        <td class="s9">${weight}</td>
        <td class="s8">J</td>
        <td class="s8" colspan="3">SVT/VT with pulse</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R21"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">22</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">First &amp; Succeeding defibrillation</td>
        <td class="s8">4</td>
        <td class="s9">${weight * 4}</td>
        <td class="s8">J</td>
        <td class="s8" colspan="3">VF/VT pulseless</td>
      </tr>
      <tr style="height: 8px">
        <th
          id="1243788770R22"
          style="height: 8px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 8px">23</div>
        </th>
        <td class="s7"></td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td class="s5"></td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s16" colspan="3"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R23"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">24</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Adrenaline/Noradrenaline</td>
        <td class="s8">BW x 0.3 mg/50mL</td>
        <td class="s9">${weight * 0.3}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 0.1 mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R24"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">25</div>
        </th>
        <td class="s0"></td>
        <td class="s17 softmerge">
          <div class="softmerge-inner" style="width: 272px; left: -1px">
            Amiodarone infusion
          </div>
        </td>
        <td class="s15"></td>
        <td class="s18">BW x 15 mg/50mL</td>
        <td class="s9">${weight * 15}</td>
        <td class="s8 softmerge">
          <div class="softmerge-inner" style="width: 81px; left: -1px">
            mg/50mL<span
              style="
                font-size: 9pt;
                font-family: Helvetica Neue, Arial;
                font-weight: bold;
                color: #000000;
              "
              >D5W</span
            ><span
              style="
                font-size: 9pt;
                font-family: Helvetica Neue, Arial;
                color: #000000;
              "
            >
            </span>
          </div>
        </td>
        <td class="s8" colspan="3">1mL/hr= 5 mcg/kg/min, run at 1-3 ml/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R25"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">26</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Dobutamine</td>
        <td class="s8">BW x 15 mg/50mL</td>
        <td class="s9">${weight * 15}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 5 mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R26"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">27</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Dopamine</td>
        <td class="s8">BW x 30 mg/50mL</td>
        <td class="s9">${weight * 30}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 10 mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R27"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">28</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Esmolol</td>
        <td class="s9" colspan="3">Draw neat</td>
        <td class="s8" colspan="3">Titrate to effect 0-200mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R28"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">29</div>
        </th>
        <td class="s19"></td>
        <td class="s1" colspan="2">GTN/Nipride (≤ 16kg)</td>
        <td class="s8">BW x 3 mg/50mL</td>
        <td class="s9">${weight * 3}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">
          1mL/hr= 1.0 mcg/kg/min
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(max 8mcg/kg/min)</span
          >
        </td>
      </tr>
      <tr style="height: 25px">
        <th
          id="1243788770R29"
          style="height: 25px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 25px">30</div>
        </th>
        <td class="s19"></td>
        <td class="s1" colspan="2">GTN/Nipride (&gt; 16kg)</td>
        <td class="s8">50 mg/50 mL</td>
        <td class="s9">50</td>
        <td class="s8">mg/50mL</td>
        <td class="s20">1mL/hr=</td>
        <td class="s20">5.6</td>
        <td class="s21">
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: normal;
              color: #000000;
            "
            >mcg/kg/min </span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(max 8mcg/kg/min)</span
          >
        </td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R30"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">31</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Isoprenaline</td>
        <td class="s8">Dilute 0.2mg in 20mls NS</td>
        <td class="s9">10</td>
        <td class="s8">mcg/mL</td>
        <td class="s8" colspan="3">
          Titrate to effect (0.01 to 0.2 mcg/kg/min)
        </td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R31"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">32</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">
          Milrinone (<span
            style="
              font-size: 9pt;
              font-family: High Tower Text, Arial;
              font-weight: normal;
              color: #000000;
            "
            >≤</span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
          >
            16kg)</span
          >
        </td>
        <td class="s8">BW x 3 mg/50mL</td>
        <td class="s9">${weight * 3}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 1.0mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R32"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">33</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Milrinone (&gt; 16kg)</td>
        <td class="s8">50 mg/50 mL</td>
        <td class="s9">50</td>
        <td class="s8">mg/50mL</td>
        <td class="s20">1mL/hr=</td>
        <td class="s5">5.6</td>
        <td class="s8">mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R33"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">34</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Phentolamine</td>
        <td class="s22">BW x 15 mg/50mL</td>
        <td class="s23">45</td>
        <td class="s22">mg/50mL</td>
        <td class="s1" colspan="3">Check dose with pharmacy</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R34"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">35</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Vasopressin</td>
        <td class="s8">BW x 1 unit/50mL</td>
        <td class="s9">${weight}</td>
        <td class="s8">unit/50mL</td>
        <td class="s13 softmerge">
          <div class="softmerge-inner" style="width: 325px; left: -1px">
            1mL/hr= 0.02 unit/kg/hr, 0.5-3ml/hr
          </div>
        </td>
        <td class="s24"></td>
        <td class="s18"></td>
      </tr>
      <tr style="height: 8px">
        <th
          id="1243788770R35"
          style="height: 8px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 8px">36</div>
        </th>
        <td class="s7"></td>
        <td class="s11"></td>
        <td class="s11"></td>
        <td class="s5"></td>
        <td class="s4"></td>
        <td class="s5"></td>
        <td class="s20"></td>
        <td class="s5"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 25px">
        <th
          id="1243788770R36"
          style="height: 25px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 25px">37</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Tranexemic acid (≤ 40kg)</td>
        <td class="s8">
          BW x 50 mg/<span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >20mL</span
          >
        </td>
        <td class="s9">${weight * 50}</td>
        <td class="s8">mg/20mL</td>
        <td class="s25" colspan="3">
          1mL/hr=2.5 mg/kg/hr
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(10ml/hr for 1hr then1ml/hr)</span
          >
        </td>
      </tr>
      <tr style="height: 25px">
        <th
          id="1243788770R37"
          style="height: 25px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 25px">38</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Tranexemic acid (&gt; 40kg)</td>
        <td class="s8">
          2000 mg/<span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >20 mL</span
          >
        </td>
        <td class="s9">2000 mg</td>
        <td class="s8">mg/20mL</td>
        <td class="s26">0.1</td>
        <td class="s25" colspan="2">
          mL/hr=2.5 mg/kg/hr
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(10ml/hr for 1hr then1ml/hr)</span
          >
        </td>
      </tr>
      <tr style="height: 8px">
        <th
          id="1243788770R38"
          style="height: 8px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 8px">39</div>
        </th>
        <td class="s2"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td class="s20"></td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R39"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">40</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Dexmedetomidine (Neonate)</td>
        <td class="s8">BW x 10 mcg/50mL</td>
        <td class="s9">${weight * 10}</td>
        <td class="s8">mcg/50mL</td>
        <td class="s8" colspan="3">1mL/hr=0.2 mcg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R40"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">41</div>
        </th>
        <td class="s0"></td>
        <td class="s17 softmerge">
          <div class="softmerge-inner" style="width: 272px; left: -1px">
            Dexmedetomidine (CICU)
          </div>
        </td>
        <td class="s18"></td>
        <td class="s18">200mcg/ 50 mL</td>
        <td class="s9">200</td>
        <td class="s8">mcg/50mL</td>
        <td class="s20">1ml/hr=</td>
        <td class="s5">1.33</td>
        <td class="s8">mcg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R41"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">42</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Fentanyl (≤ 10kg)</td>
        <td class="s8">BW x 250 mcg/50mL</td>
        <td class="s9">${weight * 250}</td>
        <td class="s8">mcg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 5 mcg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R42"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">43</div>
        </th>
        <td class="s0"></td>
        <td class="s11">Fentanyl (&gt;10kg)</td>
        <td class="s1"></td>
        <td class="s8">2500mcg in 50ml</td>
        <td class="s9">2500</td>
        <td class="s8">mcg/50mL</td>
        <td class="s20">1ml/hr=</td>
        <td class="s5">16.66666667</td>
        <td class="s8">mcg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R43"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">44</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Midazolam</td>
        <td class="s8">BW x 3 mg/50mL</td>
        <td class="s9">${weight * 3}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 1.0 mcg/kg/min</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R44"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">45</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Morphine/ Ketamine (≤ 50kg)</td>
        <td class="s8">BW / 50mL</td>
        <td class="s9">${weight}</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 20 mcg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R45"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">46</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Morphine/ Ketamine (&gt; 50kg)</td>
        <td class="s8">50 mg / 50mL</td>
        <td class="s9">50</td>
        <td class="s8">mg/50mL</td>
        <td class="s8" colspan="3">1mL/hr= 1mg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R46"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">47</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Rocuronium (≤ 20kg)</td>
        <td class="s8">BW x 25mg/50mL</td>
        <td class="s9">${weight * 25}</td>
        <td class="s8">mg/50mL</td>
        <td class="s20">1ml/hr=</td>
        <td class="s5">0.5</td>
        <td class="s8">mg/kg/hr</td>
      </tr>
      <tr style="height: 16px">
        <th
          id="1243788770R47"
          style="height: 16px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 16px">48</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Rocuronium (&gt; 20kg)</td>
        <td class="s8">500mg/ 50mL</td>
        <td class="s9">500</td>
        <td class="s8">mg/50mL</td>
        <td class="s20">1ml/hr=</td>
        <td class="s5">3.3</td>
        <td class="s8">mg/kg/hr</td>
      </tr>
      <tr style="height: 86px">
        <th
          id="1243788770R48"
          style="height: 86px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 86px">49</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Fibrinogen Concentrate (Haemocomplettan)</td>
        <td class="s8">
          70 mg/kg
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >(initial max. dose 2 g)</span
          >
        </td>
        <td class="s9">${Math.min(2000, weight * 70)}</td>
        <td class="s8">mg</td>
        <td class="s25" colspan="3">
          - Max. rate of infusion not &gt;5ml per min<br />- Aim Fibtem A10
          &gt;8 mm<br />- Top-up dose 50mg/kg (Capped at 4 g)<br />-
          Reconstituted solution can be stored up to 8H
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >at<br> room
            temperature</span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              color: #000000;
            "
          >
            (handover to CICU if there&#39;s extra)</span
          >
        </td>
      </tr>
      <tr style="height: 57px">
        <th
          id="1243788770R49"
          style="height: 57px"
          class="row-headers-background"
        >
          <div class="row-header-wrapper" style="line-height: 57px">50</div>
        </th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Novoseven</td>
        <td class="s8">90 mcg/kg</td>
        <td class="s9">${weight * 90}</td>
        <td class="s8">mcg</td>
        <td class="s25" colspan="3">
          - Can consider initial dose 20-40mcg/kg <br />- Can be redosed Q2H<br />-
          Capped at 180 mcg/kg
        </td>
      </tr>
      <tr style="height: 68px">
        <th
          id="1243788770R50"
          style="height: 68px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s1" colspan="2">Octaplex (4 factor PCC)</td>
        <td class="s8 softmerge">
          <div class="softmerge-inner" style="width: 209px; left: -1px">
            12.5 IU/kg
            <span
              style="
                font-size: 9pt;
                font-family: Helvetica Neue, Arial;
                font-weight: bold;
                color: #000000;
              "
              >(initial max. dose 1000 IU)</span
            >
          </div>
        </td>
        <td class="s9">${Math.min(1000, weight * 12.5)}</td>
        <td class="s8">IU</td>
        <td class="s25" colspan="3">
          - Max. Adult dose 3000 IU<br />- Infuse at 2-3 ml/min<br />-
          Reconstituted solution can be stored up to 8H
          <br>
          <span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              font-weight: bold;
              color: #000000;
            "
            >in the fridge</span
          ><span
            style="
              font-size: 9pt;
              font-family: Helvetica Neue, Arial;
              color: #000000;
            "
            ><br />- To be used only after trial of Novoseven</span
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div
  id="embed_991172567"
  class="waffle-embedded-object-overlay"
  style="width: 45px; height: 11px; display: block"
>
  <img
    src="resources/drawing0.png"
    style="display: block"
    height="11"
    width="45"
  />
</div>
<script nonce="OYwwMJq97bH5R_3ISJbOfw">
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
    posObj("1243788770", "embed_991172567", 1, 3, 2, 2);
  }
  posObjs();
</script>
  </body>
</html>

`,
        fileName: "cardiac",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
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
        fileName: "MH",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
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
        fileName: "HyperK",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const LAToxic = async (weight) => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <style type="text/css">
      .ritz .waffle a {
        color: inherit;
      }
      .ritz .waffle .s52 {
        border-bottom: 1px SOLID #2f5496;
        border-right: 1px SOLID #2f5496;
        background-color: #d9e2f3;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s60 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: center;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: middle;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s54 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #d9e2f3;
        text-align: right;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s37 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: center;
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
        border-right: none;
        border-bottom: 1px SOLID #2f5496;
        background-color: #b4c6e7;
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
      .ritz .waffle .s17 {
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
      .ritz .waffle .s24 {
        border-bottom: 2px SOLID #000000;
        border-right: 2px SOLID #000000;
        background-color: #ffffff;
        text-align: left;
        text-decoration: underline;
        -webkit-text-decoration-skip: none;
        text-decoration-skip-ink: none;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s38 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s20 {
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
      .ritz .waffle .s61 {
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
      .ritz .waffle .s46 {
        border-right: none;
        border-bottom: 1px SOLID #2f5496;
        background-color: #b4c6e7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s29 {
        border-bottom: 1px SOLID #000000;
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
      .ritz .waffle .s55 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #d9e2f3;
        text-align: left;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s58 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: right;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s42 {
        border-bottom: 1px SOLID #e34cc9;
        border-right: 1px SOLID #e34cc9;
        background-color: #f3e3ea;
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
        border-left: none;
        border-bottom: 1px SOLID transparent;
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
        border-left: none;
        background-color: #ffffff;
      }
      .ritz .waffle .s41 {
        border-bottom: 1px SOLID #e34cc9;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s22 {
        background-color: #ffffff;
        text-align: left;
        font-style: italic;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s40 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID #e34cc9;
        background-color: #f3e3ea;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s25 {
        background-color: #ffffff;
        text-align: left;
        color: #0563c1;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s23 {
        border-left: none;
        border-right: none;
        background-color: #ffffff;
      }
      .ritz .waffle .s56 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID #2f5496;
        background-color: #d9e2f3;
        text-align: left;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s57 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s44 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #b4c6e7;
        text-align: left;
        font-weight: bold;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s48 {
        border-left: none;
        border-bottom: 1px SOLID #2f5496;
        background-color: #b4c6e7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s19 {
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
      .ritz .waffle .s45 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #b4c6e7;
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
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s1 {
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
      .ritz .waffle .s10 {
        border-left: none;
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
      .ritz .waffle .s13 {
        border-bottom: 1px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s34 {
        border-bottom: 1px SOLID #e34cc9;
        border-right: 1px SOLID transparent;
        background-color: #e995b6;
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
      .ritz .waffle .s43 {
        border-bottom: 1px SOLID transparent;
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
      .ritz .waffle .s49 {
        border-bottom: 1px SOLID #2f5496;
        border-right: 1px SOLID transparent;
        background-color: #b4c6e7;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s35 {
        border-bottom: 1px SOLID #e34cc9;
        border-right: 1px SOLID transparent;
        background-color: #e995b6;
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
      .ritz .waffle .s27 {
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
      .ritz .waffle .s32 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #e995b6;
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
      .ritz .waffle .s30 {
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
      .ritz .waffle .s18 {
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
      .ritz .waffle .s51 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID #2f5496;
        background-color: #d9e2f3;
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
        text-align: right;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s53 {
        border-bottom: 1px SOLID #2f5496;
        border-right: 1px SOLID transparent;
        background-color: #d9e2f3;
        text-align: left;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s31 {
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
      .ritz .waffle .s36 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
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
      .ritz .waffle .s2 {
        border-right: 1px SOLID transparent;
        background-color: #ffffff;
        text-align: center;
        font-weight: bold;
        color: #2f5496;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s6 {
        border-bottom: 2px SOLID #000000;
        background-color: #ffffff;
      }
      .ritz .waffle .s59 {
        border-bottom: 1px SOLID #000000;
        border-right: 1px SOLID #000000;
        background-color: #ffffff;
        text-align: center;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 12pt;
        vertical-align: middle;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s33 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #e995b6;
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
        border-right: none;
        border-bottom: 1px SOLID transparent;
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
      .ritz .waffle .s0 {
        border-bottom: 1px SOLID transparent;
        background-color: #ffffff;
      }
      .ritz .waffle .s15 {
        border-left: none;
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
      .ritz .waffle .s9 {
        border-right: none;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s39 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #f3e3ea;
        text-align: left;
        color: #c00000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
        vertical-align: bottom;
        white-space: nowrap;
        direction: ltr;
        padding: 0px 3px 0px 3px;
      }
      .ritz .waffle .s28 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
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
      .ritz .waffle .s62 {
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
      .ritz .waffle .s4 {
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
      .ritz .waffle .s50 {
        border-bottom: 1px SOLID transparent;
        border-right: 1px SOLID transparent;
        background-color: #d9e2f3;
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
      .ritz .waffle .s26 {
        border-right: 1px SOLID transparent;
        background-color: #ffffff;
        text-align: left;
        font-weight: bold;
        color: #000000;
        font-family: "docs-Calibri", Arial;
        font-size: 14pt;
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
              id="1309419562R0"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="s0"></td>
            <td class="s1"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R1"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s2" colspan="3">MANAGEMENT OF LA TOXICITY</td>
            <td class="s3"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R2"
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
              id="1309419562R3"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s5" colspan="2">TREATMENT</td>
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
              id="1309419562R4"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td class="s6"></td>
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
              id="1309419562R5"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s7" colspan="2">enter BODY WEIGHT (KG)=</td>
            <td class="s8">${weight}</td>
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
              id="1309419562R6"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
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
              id="1309419562R7"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s9 softmerge">
              <div class="softmerge-inner" style="width: 243px; left: -1px">
                CARDIOTOXICITY
              </div>
            </td>
            <td class="s10"></td>
            <td class="s10"></td>
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
              id="1309419562R8"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s11 softmerge">
              <div class="softmerge-inner" style="width: 243px; left: -1px">
                without circulatory arrest
              </div>
            </td>
            <td class="s12"></td>
            <td class="s12"></td>
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
              id="1309419562R9"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
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
              id="1309419562R10"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s14 softmerge">
              <div class="softmerge-inner" style="width: 337px; left: -1px">
                use conventional therpies to treat :
              </div>
            </td>
            <td class="s15"></td>
            <td class="s10"></td>
            <td class="s16"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R11"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s17" colspan="3">hypotension</td>
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
              id="1309419562R12"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s17" colspan="3">bradycardia</td>
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
              id="1309419562R13"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18" colspan="3">tachyarrhythmias</td>
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
              id="1309419562R14"
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
              id="1309419562R15"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4">HYPOTENSION:</td>
            <td class="s19">epinephrine</td>
            <td class="s20">IV</td>
            <td class="s21">${weight}</td>
            <td class="s19">MICROgrams</td>
            <td class="s4">OR</td>
            <td class="s21">${weight * 0.1}</td>
            <td class="s19">ML</td>
            <td class="s19">1: 100 000</td>
            <td class="s19">DILUTION</td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R16"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s4" colspan="2">(1 MICROgram/KG)</td>
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
              id="1309419562R17"
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
              id="1309419562R18"
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
              id="1309419562R19"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4">ARRHYTHMIA:</td>
            <td class="s22" colspan="6">
              * Lignocaine should NOT be used as as antiarrhythmic therapy !
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R20"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s14 softmerge">
              <div class="softmerge-inner" style="width: 269px; left: -1px">
                Avoid Calcium Channel Blockers
              </div>
            </td>
            <td class="s23"></td>
            <td class="s16"></td>
            <td class="s16"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R21"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s14 softmerge">
              <div class="softmerge-inner" style="width: 200px; left: -1px">
                Avoid Beta Blockers
              </div>
            </td>
            <td class="s16"></td>
            <td class="s16"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R22"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td class="s6"></td>
            <td class="s6"></td>
            <td class="s6"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R23"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s7">consider:</td>
            <td class="s24" colspan="3">
              <a target="_blank" href="#gid=44093422"
                >IV LIPID EMULSION THERAPY</a
              >
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
              id="1309419562R24"
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
              id="1309419562R25"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="s1"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R26"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s11 softmerge">
              <div class="softmerge-inner" style="width: 243px; left: -1px">
                with circulatory arrest
              </div>
            </td>
            <td class="s12"></td>
            <td class="s16"></td>
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
              id="1309419562R27"
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
              id="1309419562R28"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4">
              1. start
              <span
                style="
                  font-size: 14pt;
                  font-family: Arial;
                  font-weight: bold;
                  color: #000000;
                "
                >CPR</span
              >
            </td>
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
              id="1309419562R29"
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
              id="1309419562R30"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4">2. administer:</td>
            <td class="s25" colspan="2"></td>
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
              id="1309419562R31"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td class="s0"></td>
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
              id="1309419562R32"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s26" colspan="2">INTRALIPID THERAPY</td>
            <td></td>
            <td class="s4" colspan="2"></td>
            <td class="s27"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R33"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s28" colspan="2">(20% LIPID EMULSION)</td>
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
              id="1309419562R34"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s29" colspan="2"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R35"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s30" colspan="6">
              ** LAST treatment box (BLACK) located in MOT recovery &amp;
              outside DSOT 2
            </td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R36"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s31"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R37"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s32">IMMEDIATE:</td>
            <td class="s33"></td>
            <td class="s33"></td>
            <td class="s33"></td>
            <td class="s33"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R38"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s34" colspan="2"></td>
            <td class="s35"></td>
            <td class="s35"></td>
            <td class="s35"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R39"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s36">BOLUS</td>
            <td class="s37">IV</td>
            <td class="s38">${weight * 1.5}</td>
            <td class="s39">ML</td>
            <td class="s40">Over 1 Minute</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R40"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s41">(1.5 ML/KG)</td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s42"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R41"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R42"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s36">INFUSION</td>
            <td class="s37">IV</td>
            <td class="s38">${weight * 15}</td>
            <td class="s39">ML</td>
            <td class="s40">Over 1 Hour</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R43"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s41">(15 ML/KG/H)</td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s41"></td>
            <td class="s42"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R44"
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
              id="1309419562R45"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R46"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s43"></td>
            <td class="s43"></td>
            <td class="s43"></td>
            <td class="s43"></td>
            <td class="s43"></td>
            <td class="s4"></td>
            <td class="s4"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R47"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s44" colspan="2">AFTER 5 MINUTES:</td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R48"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td class="s45"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R49"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s46 softmerge">
              <div class="softmerge-inner" style="width: 337px; left: -1px">
                if cardiovascular stabilty NOT restored:
              </div>
            </td>
            <td class="s47"></td>
            <td class="s48"></td>
            <td class="s48"></td>
            <td class="s49"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R50"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s50"></td>
            <td class="s50"></td>
            <td class="s50"></td>
            <td class="s50"></td>
            <td class="s51"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R51"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s51" colspan="5">
              1. repeat bolus up to maximum of 2X (same dose) 5 minutes apart
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R52"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s52" colspan="5">
              (TOTAL 3 bolus including initial dose !)
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R53"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s53"></td>
            <td class="s53"></td>
            <td class="s53"></td>
            <td class="s53"></td>
            <td class="s53"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R54"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s50" colspan="2">
              2. double rate of
              <span style="font-size: 12pt; font-family: Arial; color: #2f5496"
                >INFUSION</span
              ><span
                style="
                  font-size: 12pt;
                  font-family: Calibri, Arial;
                  color: #000000;
                "
                >:</span
              >
            </td>
            <td class="s54">${weight * 30}</td>
            <td class="s55">ML</td>
            <td class="s56">Over 1 Hour</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R55"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s52" colspan="5">(30 ML/KG/ H)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R56"
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
              id="1309419562R57"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td class="s0"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R58"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s57" colspan="5">
              DO NOT EXCEED MAXIMUM CUMMULATIVE DOSE (12 ML/KG) =
            </td>
            <td class="s58">0</td>
            <td class="s57">ML</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R59"
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
              id="1309419562R60"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s5" colspan="3">NEUROTOXICITY- Seizures</td>
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
              id="1309419562R61"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s4" colspan="6">
              give benzodiazepine, thiopentone or propofol in small incremental
              doses
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R62"
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
              id="1309419562R63"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td class="s13"></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R64"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s59" colspan="2">DRUG</td>
            <td class="s30">ROUTE</td>
            <td class="s30 softmerge">
              <div class="softmerge-inner" style="width: 66px; left: -1px">
                DOSE/KG
              </div>
            </td>
            <td class="s30">AMOUNT</td>
            <td class="s30 softmerge">
              <div class="softmerge-inner" style="width: 39px; left: -1px">
                UNITS
              </div>
            </td>
            <td class="s30" colspan="2">REMARKS</td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R65"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s60" colspan="2" rowspan="2">MIDAZOLAM</td>
            <td class="s17">IV</td>
            <td class="s61">0.05</td>
            <td class="s61">${weight * 0.05}</td>
            <td class="s17">MG</td>
            <td class="s17" colspan="2">small incremental doses</td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R66"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s62"></td>
            <td class="s18"></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R67"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s60" colspan="2" rowspan="2">THIOPENTONE</td>
            <td class="s17">IV</td>
            <td class="s61">4</td>
            <td class="s61">${weight * 4}</td>
            <td class="s17">MG</td>
            <td class="s17" colspan="2">small incremental doses</td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R68"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s62"></td>
            <td class="s18"></td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R69"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s60" colspan="2" rowspan="2">PROPOFOL</td>
            <td class="s17">IV</td>
            <td class="s61">1</td>
            <td class="s61">${weight}</td>
            <td class="s17">MG</td>
            <td class="s17" colspan="2">small incremental doses</td>
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 20px">
            <th
              id="1309419562R70"
              style="height: 20px"
              class="row-headers-background"
            ></th>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s18"></td>
            <td class="s62"></td>
            <td class="s18"></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
        `,
        fileName: "LAToxic",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
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
        fileName: "Anaphylaxis",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
      console.log("successful: ", file.filePath);
      FileViewer.open(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  /*   async function checkPermissions() {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our writeDataAndDownloadExcelFile function)
          writeDataAndDownloadExcelFile();
          console.log('Permission granted');
          return 'granted';
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our writeDataAndDownloadExcelFile function)
        writeDataAndDownloadExcelFile();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  } */

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      width: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      borderRadius: (windowWidth * 0.1) / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
    },
    settingIcon: {
      height: Platform.isPad ? "52.5%" : windowWidth * 0.055,
      width: Platform.isPad ? "52.5%" : windowWidth * 0.055,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: windowWidth * 0.05,
      marginHorizontal: 7.5,
      width: windowWidth * 0.85,
      height: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: windowWidth * 0.035,
    },
    searchIcon: {
      height: Platform.isPad ? windowWidth * 0.03 : windowWidth * 0.04,
      width: Platform.isPad ? windowWidth * 0.03 : windowWidth * 0.04,
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: windowWidth * 0.03,
      fontWeight: "600",
      fontSize: Platform.isPad ? windowWidth * 0.034 : windowWidth * 0.045,
      color: "white",
      width: "100%",
    },
  });
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <SafeAreaView
      style={[
        styles.treeTop,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: Dimensions.get("window").width,
            marginTop: 25,
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {/* <TouchableOpacity style={dynamicStyles.settingsView} onPress={() => navigation.navigate("Settings")}>
        <Image
          source={require("../assets/setting.png")}
          style={dynamicStyles.settingIcon}
        />
      </TouchableOpacity> */}
          {/*       <View style={dynamicStyles.searchContainer}>
        <Image
          source={require("../assets/search.png")}
          style={dynamicStyles.searchIcon}
        />
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#818188"
        />
        
      </View> */}
        </View>
        {/* <StatusBar style="light" /> */}

        <View style={styles.contentContainer}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonColumn1}>
              <TextInputButton
                title="Weight"
                unit="kg"
                action={(prop) => setWeight(prop)}
                backgroundColor={"#313135"}
                width={Dimensions.get("window").width * 0.3333333}
                height={Dimensions.get("window").height * 0.06635071}
              />
            </View>
            <View style={styles.buttonColumn2}>
              <Text
                style={[
                  styles.select,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                Select{" "}
                <Text
                  style={[
                    styles.one,
                    {
                      fontWeight: isDarkMode ? "700" : "800",
                      color: isDarkMode ? "#72A8DA" : "#3289d9",
                    },
                  ]}
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
              <TouchableOpacity onPress={() => setButtonState("MH")}>
                <TextButton
                  title="MH"
                  width={Dimensions.get("window").width * 0.46153846}
                  height={Dimensions.get("window").height * 0.06812796}
                  bgHex="#313135"
                  borderColor={buttonState === "MH" ? "#72A8DA" : "transparent"}
                  borderWidth={1}
                  contentHex={"white"}
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
              <TouchableOpacity onPress={() => setButtonState("HyperK")}>
                <TextButton
                  title="HyperK"
                  width={Dimensions.get("window").width * 0.46153846}
                  height={Dimensions.get("window").height * 0.06812796}
                  bgHex="#313135"
                  contentHex={"white"}
                  borderColor={
                    buttonState === "HyperK" ? "#72A8DA" : "transparent"
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
              <TouchableOpacity onPress={() => setButtonState("Anaphylaxis")}>
                <TextButton
                  title="Anaphylaxis"
                  width={Dimensions.get("window").width * 0.46153846}
                  height={Dimensions.get("window").height * 0.06812796}
                  bgHex="#313135"
                  contentHex={"white"}
                  borderColor={
                    buttonState === "Anaphylaxis" ? "#72A8DA" : "transparent"
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
              <TouchableOpacity onPress={() => setButtonState("LA Toxicity")}>
                <TextButton
                  title="LA Toxicity"
                  width={Dimensions.get("window").width * 0.46153846}
                  height={Dimensions.get("window").height * 0.06812796}
                  bgHex="#313135"
                  contentHex={"white"}
                  borderColor={
                    buttonState === "LA Toxicity" ? "#72A8DA" : "transparent"
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
              {/* <IconButton
            bgHex="#rgb(30, 30, 32)"
            title="Share"
            iconPath="share-variant"
            contentHex="#72A8DA"
            borderColor={"#72A8DA"}
            borderWidth={1.25}
            size={(Dimensions.get("window").height / 844) * 22.5}
            textSize={
              Platform.isPad
                ? Dimensions.get("window").height * 0.04739336 * 0.45
                : 19
            }
          /> */}
            </View>
            <View style={styles.divider} />
            <View style={styles.selectionRow}>
              <TouchableOpacity>
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
              </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
            >
              {/* <StatusBar style="light" /> */}
            </View>
          ),
          headerStyle: {
            backgroundColor: "rgb(30, 30, 32)", // Set the background color of the header
          },
          headerTintColor: "white", // Set the color of the back button and title text
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  treeTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
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
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 15,
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
    paddingBottom: 30,
  },
});

export default App;
