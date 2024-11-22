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

export default function Hyper() {
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
  const createPDF = async () => {
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
            <td class="s20">${roundToOneDecimalPlace(weight * 0.1)}</td>
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
            <td class="s27">${roundToOneDecimalPlace(weight * 0.5)}</td>
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
            <td class="s27">${roundToOneDecimalPlace(weight * 0.2)}</td>
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
      Alert.alert("File path: ", file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Declare Emergency", completed: false },
    { id: 2, text: "Call for help", completed: false },
    {
      id: 3,
      text: "Discontinue ALL K+ containing infusions",
      completed: false,
    },
    { id: 4, text: "Discontinue blood products", completed: false },
    { id: 5, text: "Hyperventilate with 100% oxygen", completed: false },
  ]);

  const [checklistItems2, setChecklistItems2] = useState([
    {
      id: 1,
      text: "send rpt K+ to lab",
      completed: false,
    },
    {
      id: 2,
      text: "obtain ECG",
      completed: false,
    },
    {
      id: 3,
      text: "start CPR if haemodynamically unstable",
      completed: false,
    },
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleToggleComplete2 = (itemId) => {
    setChecklistItems2((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const tableData = [
    {
      range: "5.5 - 6.0",
      initialTreatment:
        "Salbutamol nebuliser (if possible)\nconsider Dextrose/Insulin",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.0:\n→ rpt salbutamol\nstart IV Dextrose/Insulin",
      notImproving: "reevaluate cause\nif K+ > 6, escalate level of Mx",
    },
    {
      range: "6.1 - 6.9",
      initialTreatment:
        "Salbutamol nebuliser (if possible)\nIV Dextrose/Insulin\nconsider NaHCO3 (if PH < 7.2)",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.9:\n→ rpt salbutamol\n→ rpt IV Dextrose/Insulin",
      notImproving: "reevaluate cause\nif K+ > 6.9, escalate level of Mx",
    },
    {
      range: "> 7.0",
      initialTreatment:
        "Calcium Chloride or Calcium Gluconate\nSalbutamol nebuliser (if possible)\nIV Dextrose/Insulin\nconsider NaHCO3 (if PH < 7.2)",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.9:\n→ rpt salbutamol\n→ rpt IV Dextrose/Insulin",
      notImproving:
        "reevaluate cause\nif ECG changes persist:\n→ rpt Calcium\n→ consider CRRT",
    },
  ];
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flexGrow: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
          >
            Hyperkalemia
          </Text>
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
              Inclusion Criteria
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
                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              Term NEONATE ({">"} 1 month age): serum K+ {">"} 6 mmol/L {"\n"}
              Children {">"} 1 month age: serum K+ {">"}5.5 mmol/L
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              marginVertical: "2%",
            }}
            onPress={() => setCollapsed3(!collapsed3)}
          >
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Exclusion Criteria
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
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "1%",
                },
              ]}
            >
              Premature Neonates
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
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Management Algoritihm
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
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "1%",
                },
              ]}
            >
              Perform ECG immediately when possible {"\n"}
              Review all medications/ infusions {"\n"}
              Exclude: {"\n"}
              {"\t"} - Burn or Crush injury {"\n"}
              {"\t"} - Rhabdomyolysis {"\n"}
              {"\t"} - Succinylchholine {"\n"}
              {"\t"} - Malignant Hyperthermia {"\n"}
              {"\t"} - Renal Failure
            </Text>
            {tableData.map((row, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: isDarkMode ? "white" : "black",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 8,
                    borderBottomWidth: 1,
                    borderColor: isDarkMode ? "white" : "black",
                    paddingBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      width: "25%",
                      color: isDarkMode ? "white" : "black",
                    }}
                  >
                    serum K+ (mmol/L)
                  </Text>
                  <Text
                    style={{
                      width: "25%",
                      color: isDarkMode ? "white" : "black",
                      flexWrap: "wrap",
                    }}
                  >
                    {row.range}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      width: "25%",
                      color: isDarkMode ? "white" : "black",
                    }}
                  >
                    Initial Treatment
                  </Text>
                  <Text
                    style={{
                      width: "25%",
                      color: isDarkMode ? "white" : "black",
                      flexWrap: "wrap",
                    }}
                  >
                    {row.initialTreatment}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 8,
                    borderBottomWidth: 1,
                    borderColor: isDarkMode ? "white" : "black",
                    paddingBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      color: isDarkMode ? "white" : "black",
                    }}
                  >
                    Review: K+ improving
                  </Text>
                  <Text
                    style={{
                      width: "50%",
                      color: isDarkMode ? "white" : "black",
                      flexWrap: "wrap",
                    }}
                  >
                    {row.improving}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      color: isDarkMode ? "white" : "black",
                    }}
                  >
                    Review: K+ NOT improving
                  </Text>
                  <Text
                    style={{
                      width: "50%",
                      color: isDarkMode ? "white" : "black",
                      flexWrap: "wrap",
                    }}
                  >
                    {row.notImproving}
                  </Text>
                </View>
              </View>
            ))}
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              marginTop: "5%",
            }}
            onPress={() => setCollapsed5(!collapsed5)}
          >
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Emergency Management
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed5 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed5}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "1%",
                },
              ]}
            >
              1. DO:
            </Text>
            {checklistItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleToggleComplete(item.id)}
                style={styles.checklistItem}
              >
                <View style={{ marginRight: "5%" }} />
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
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "1%",
                },
              ]}
            >
              2. without delaying therapy, consider:
            </Text>
            {checklistItems2.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleToggleComplete2(item.id)}
                style={styles.checklistItem}
              >
                <View style={{ marginRight: "5%" }} />
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
            <View
              style={{
                paddingBottom: 20,
                flexDirection: "row",
                marginTop: "5%",
                alignSelf: "center",
                right: "0.75%",
              }}
            >
              <TouchableOpacity onPress={createPDF}>
                <IconButton
                  bgHex="#72A8DA"
                  title="Calculator"
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
