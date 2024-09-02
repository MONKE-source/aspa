import React, { useState, useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import TextInputButton from "../components/TextInputButton";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import Bmi from "./Bmi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export default function LA() {
  const [weight, setWeight] = useState(0);
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
  const createPDF = async () => {
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
        fileName: genName("BMI"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      console.log("successful: ", file.filePath);

      FileViewer.open(file.filePath)
        .then(() => setFileArray([...files, file.filePath]))
        .catch((e) => {
          console.log("Error: ", e);
        });
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "STOP INJECTING LA", completed: false },
    { id: 2, text: "Call for HELP", completed: false },
    {
      id: 3,
      text: "Maintain & secure AIRWAY (hyperventilation useful to ↑ plasma PH)",
      completed: false,
    },
    { id: 4, text: "Give 100% OXYGEN", completed: false },
    { id: 5, text: "Establish IV access", completed: false },
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
          >
            LA Toxicity
          </Text>
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
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
            ]}
          >
            Signs
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
          >
            Sudden altertaion in mental status: {"\n"}
            {"\t"} 1. Severe Agitation {"\n"}
            {"\t"} 2. loss of consciousness {"\n"}
            Cardiovascular Collapse: {"\n"}
            {"\t"} 1. sinus bradycardia {"\n"}
            {"\t"} 2. conduction block {"\n"}
            {"\t"} 3. ventricular Tachyarrhythmias {"\n"}
            {"\t"} 4. Asystole {"\n"}
          </Text>
          <View
            style={{
              bottom: "2%",
              paddingBottom: 20,
              flexDirection: "row",
              bottom: "11%",
              justifyContent: "space-evenly",
            }}
          >
            <TextInputButton
              title="Weight"
              unit="kg"
              width={(Dimensions.get("window").width * 120) / 390}
              height={(Dimensions.get("window").height * 55) / 844}
              backgroundColor={"#313135"}
              store={weight}
              action={setWeight}
            />
            <TouchableOpacity
              onPress={createPDF}
              style={{ left: "20%", top: "7%" }}
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
          </View>
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
  },
  title: {
    fontSize: 30,
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
