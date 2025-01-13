import React, { useState, useEffect, useContext } from "react";
import { WeightProvider, WeightContext } from "../components/WeightContext";
import { useDarkMode } from "../components/DarkModeContext";
import Collapsible from "react-native-collapsible";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import FileViewer from "react-native-file-viewer";
import TextInputButton from "../components/TextInputButton";
import IconButton from "../components/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export default function Anaphylaxis() {
  const { weight, setWeight } = useContext(WeightContext);
  const [files, setFileArray] = useState([]);

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
  useEffect(() => {
    saveFiles(files);
  }, [files]);
  function genName(type) {
    const d = new Date();
    let uniqueName = type + d.toISOString();
    return uniqueName;
  }
  function roundToOneDecimalPlace(value) {
    const decimalPlaces = value.toString().split(".")[1]?.length || 0;
    if (decimalPlaces > 5) {
      return Math.round(value * 10) / 10;
    }
    return value;
  }
  let PDFOptions1 = {
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
            <td class="s29">${roundToOneDecimalPlace(weight * 0.1)}</td>
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
            <td class="s42">${roundToOneDecimalPlace(weight * 0.1)}</td>
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
    fileName: genName("AnaphylaxisImmediate"),
    directory: Platform.OS === "android" ? "Downloads" : "Documents",
  };
  let PDFOptions2 = {
    html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s3 {
    background-color: #ffffff;
    text-align: center;
    color: #0563c1;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s18 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #deeaf6;
    text-align: center;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s2 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s6 {
    border-bottom: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s14 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d2e1ff;
    text-align: center;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s7 {
    border-right: 2px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s9 {
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s20 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s19 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #deeaf6;
    text-align: right;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s5 {
    border-bottom: 2px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s0 {
    border-bottom: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s15 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d2e1ff;
    text-align: right;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s10 {
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s4 {
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s8 {
    border-bottom: 2px SOLID transparent;
    border-right: 2px SOLID transparent;
    background-color: #ffffff;
    text-align: right;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s11 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s1 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    color: #0563c1;
    font-family: docs-Calibri, Arial;
    font-size: 10pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s13 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d2e1ff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s16 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #deeaf6;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s17 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #deeaf6;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s12 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d2e1ff;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
</style>
<div class="ritz grid-container" dir="ltr">
  <table class="waffle" cellspacing="0" cellpadding="0" id="myTable">
    <tbody>
      <tr style="height: 20px">
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <td class="s2" colspan="2">ANAPHYLAXIS</td>
        <td class="s4"></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s5"></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s6" colspan="2">SECONDARY TREATMENT</td>
        <td></td>
        <td class="s7" colspan="2">enter BODY WEIGHT(KG)=</td>
        <td class="s8">${weight}</td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s9"></td>
        <td class="s10"></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12">Anti- Inflammatory:</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s13" colspan="2">HYDROCORTISONE</td>
        <td class="s14">IV/IO</td>
        <td class="s14">BOLUS</td>
        <td class="s15">${weight * 2}</td>
        <td class="s12">MILLIgram</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12" colspan="2">(2 MILLIgram/KG)</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16" colspan="4">
          consider if hypotension persist despite epinephrine:
        </td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16" colspan="6"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s17">phenylephrine</td>
        <td class="s16"></td>
        <td class="s18">IV/IO</td>
        <td class="s18">BOLUS</td>
        <td class="s19">${weight * 10}</td>
        <td class="s16">MICROgram</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16">(10 MICROgram/KG)</td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16" colspan="6" rowspan="2"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s17">vasopressin</td>
        <td class="s16"></td>
        <td class="s16">IV/IO</td>
        <td class="s16">BOLUS</td>
        <td class="s19">${roundToOneDecimalPlace(weight * 0.03)}</td>
        <td class="s16">UNITS</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16">0.03 UNITS/KG</td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16" colspan="6" rowspan="2"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16" colspan="6">
          <span
            style="
              font-size: 12pt;
              font-family: Calibri, Arial;
              font-weight: bold;
              color: #000000;
            "
            >NOREPINEPHRINE</span
          ><span
            style="font-size: 12pt; font-family: Calibri, Arial; color: #000000"
          >
            infusion at 0.01-0.2 MICROgram/KG/MIN</span
          >
        </td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12" colspan="2">consider if bronchospasm:</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s20"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12">
          <span
            style="
              font-size: 12pt;
              font-family: Calibri, Arial;
              font-weight: bold;
              color: #000000;
            "
            >Salbutamol </span
          ><span
            style="font-size: 12pt; font-family: Calibri, Arial; color: #000000"
            >Inhaler</span
          >
        </td>
        <td class="s15">4-10</td>
        <td class="s12">puffs</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s13">Aminophylline</td>
        <td class="s12"></td>
        <td class="s14">IV/IO</td>
        <td class="s12">SLOW BOLUS</td>
        <td class="s15">${weight * 10}</td>
        <td class="s12">MILLIgram</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12">(10 MILLIgram/KG)</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s14">(1 Hour)</td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16">AntiHistamine:</td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s17">Diphenhydramine</td>
        <td class="s16"></td>
        <td class="s18">IV/IO</td>
        <td class="s16">SLOW BOLUS</td>
        <td class="s19">${weight * 1}</td>
        <td class="s16">MILLIgram</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s16">(1 MILLIgram/KG)</td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
        <td class="s16"></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s13">Ranitidine</td>
        <td class="s12"></td>
        <td class="s12">IV/IO</td>
        <td class="s14">BOLUS</td>
        <td class="s15">${weight * 1}</td>
        <td class="s12">MILLIgram</td>
      </tr>
      <tr style="height: 20px">
        <td class="s11"></td>
        <td class="s12">(1 MILLIgram/KG)</td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
        <td class="s12"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
    fileName: genName("AnaphylaxisSecondary"),
    directory: Platform.OS === "android" ? "Downloads" : "Documents",
  };
  const createPDF = async (PDFOptions) => {
    try {
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
      Alert.alert("File path: ", file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Declare an emergency", completed: false },
    { id: 2, text: "Call for HELP", completed: false },
    { id: 3, text: "Increase FiO2 to 100%", completed: false },
    { id: 4, text: "Assess AIRWAY, BREATHING, CIRCULATION", completed: false },
    { id: 5, text: "Intubate if necessary", completed: false },
    { id: 6, text: "Obtain IV/IO access", completed: false },
    { id: 7, text: "Turn OFF anaesthetic agents", completed: false },
    { id: 8, text: "Elevate legs if there is hypotension", completed: false },
    { id: 9, text: "Start CPR if necessary", completed: false },
    { id: 10, text: "Remove possible Triggers", completed: false },
    { id: 11, text: "Latex", completed: false },
    { id: 12, text: "NMB", completed: false },
    { id: 13, text: "Chlorhexidine", completed: false },
    { id: 14, text: "IV Colloids", completed: false },
    { id: 15, text: "Antibiotics", completed: false },
    // Add more checklist items here
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed1(!collapsed1)}
          >
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Anaphylaxis Management
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed1 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed1} style={{ marginVertical: "3%" }}>
            {checklistItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleToggleComplete(item.id)}
                style={styles.checklistItem}
              >
                <View style={styles.checkbox}>
                  {item.completed && <Text style={styles.tick}>&#x2713;</Text>}
                </View>
                <Text
                  style={[
                    styles.checklistText,
                    {
                      color: isDarkMode ? "white" : "black",
                      textDecorationLine: item.completed
                        ? "line-through"
                        : "none",
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed2(!collapsed2)}
          >
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Signs
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed2 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed2}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  lineHeight: 25,

                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              1.Erythema{"\n"}
              2.Urticaria{"\n"}
              3.Angioedema{"\n"}
              4.Hypotension{"\n"}
              5.Tachycardia{"\n"}
              6.Dysrrhythmias{"\n"}
              7.Circulatory Collapse
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed3(!collapsed3)}
          >
            <Text
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              Symptoms
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed3 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed3}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                  marginTop: "-1%",
                },
              ]}
            >
              1.Dyspnoea{"\n"}
              2.Wheezing
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed4(!collapsed4)}
          >
            <Text
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              Calculators
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed4 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed4}>
            <View
              style={{
                paddingBottom: 20,
                flexDirection: "row",
                marginTop: "10%",
                alignSelf: "center",
                right: "1%",
              }}
            >
              <TouchableOpacity
                onPress={() => createPDF(PDFOptions1)}
                style={{ marginRight: "5%" }}
              >
                <IconButton
                  bgHex="#72A8DA"
                  title="Immediate"
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
              <TouchableOpacity onPress={() => createPDF(PDFOptions2)}>
                <IconButton
                  bgHex="#72A8DA"
                  title="Secondary"
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
            </View>
          </Collapsible>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 50,
    height: "100%",
    paddingBottom: "100",
    gap: 5,
  },
  title: {
    fontSize: 23 * (Dimensions.get("window").width / 375),
    marginBottom: 20,
    fontWeight: "bold",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: useDarkMode ? "#D3D3D3" : "black",
  },
  tick: {
    fontSize: 20,
    color: "green",
  },
  checklistText: {
    flex: 1,
    fontSize: 18,
  },
});
