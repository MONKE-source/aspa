import React, { useState, useEffect, useContext } from "react";
import { WeightProvider, WeightContext } from "../components/WeightContext";
import Collapsible from "react-native-collapsible";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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
import FileViewer from "react-native-file-viewer";
import TextInputButton from "../components/TextInputButton";
import IconButton from "../components/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export default function LA() {
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
    // Neurotoxicity
    html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s18 {
    border-bottom: 1px SOLID #000000;
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
  .ritz .waffle .s11 {
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s16 {
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: right;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s8 {
    border-left: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s10 {
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s0 {
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
  .ritz .waffle .s2 {
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
  .ritz .waffle .s13 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s5 {
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
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
  .ritz .waffle .s15 {
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s17 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s12 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s1 {
    border-bottom: 1px SOLID transparent;
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
    border-bottom: 2px SOLID #000000;
    border-right: 2px SOLID #000000;
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
  .ritz .waffle .s4 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
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
  .ritz .waffle .s7 {
    border-right: none;
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
  .ritz .waffle .s14 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
    text-align: center;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: middle;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
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
          id="1795803559R0"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s1"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s1"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R1"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s2"></td>
        <td class="s4" colspan="3">MANAGEMENT OF LA TOXICITY</td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R2"
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
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R3"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s5" colspan="2">TREATMENT</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R4"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="1795803559R5"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s7 softmerge">
          <div class="softmerge-inner" style="width: 185px; left: -1px">
            enter BODY WEIGHT (KG)=
          </div>
        </td>
        <td class="s8"></td>
        <td class="s9">${weight}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R6"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="1795803559R7"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s5" colspan="3">NEUROTOXICITY- Seizures</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R8"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s0" colspan="6">
          give benzodiazepine, thiopentone or propofol in small incremental
          doses
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R9"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="1795803559R10"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
        <td class="s10"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R11"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s12" colspan="2">DRUG</td>
        <td class="s13">ROUTE</td>
        <td class="s13">DOSE/KG</td>
        <td class="s13">AMOUNT</td>
        <td class="s13">UNITS</td>
        <td class="s13" colspan="2">REMARKS</td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R12"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s14" colspan="2" rowspan="2">MIDAZOLAM</td>
        <td class="s15">IV</td>
        <td class="s16">0.05</td>
        <td class="s16">${roundToOneDecimalPlace(weight * 0.05)}</td>
        <td class="s15">MG</td>
        <td class="s15" colspan="2">small incremental doses</td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R13"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s18"></td>
        <td class="s17"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R14"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s14" colspan="2" rowspan="2">THIOPENTONE</td>
        <td class="s15">IV</td>
        <td class="s16">4</td>
        <td class="s16">${roundToOneDecimalPlace(weight * 4)}</td>
        <td class="s15">MG</td>
        <td class="s15" colspan="2">small incremental doses</td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R15"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s18"></td>
        <td class="s17"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R16"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s14" colspan="2" rowspan="2">PROPOFOL</td>
        <td class="s15">IV</td>
        <td class="s16">1</td>
        <td class="s16">${roundToOneDecimalPlace(weight * 1)}</td>
        <td class="s15">MG</td>
        <td class="s15" colspan="2">small incremental doses</td>
      </tr>
      <tr style="height: 20px">
        <th
          id="1795803559R17"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s17"></td>
        <td class="s18"></td>
        <td class="s17"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
    fileName: genName("NEUROTOXICITY- Seizures"),
    directory: Platform.OS === "android" ? "Downloads" : "Documents",
  };

  let PDFOptions2 = {
    // CARDIOTOXICITY
    html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s17 {
    border-right: 1px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s20 {
    border-left: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s16 {
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s25 {
    background-color: #ffffff;
    text-align: right;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s12 {
    border-right: none;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s4 {
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
  .ritz .waffle .s3 {
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
  .ritz .waffle .s15 {
    border-left: none;
    border-bottom: 1px SOLID transparent;
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
  .ritz .waffle .s14 {
    border-right: none;
    border-bottom: 1px SOLID transparent;
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
  .ritz .waffle .s24 {
    background-color: #ffffff;
    text-align: center;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s11 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s13 {
    border-left: none;
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
  .ritz .waffle .s5 {
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
  .ritz .waffle .s22 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s10 {
    border-bottom: 2px SOLID #000000;
    border-right: 2px SOLID #000000;
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
  .ritz .waffle .s8 {
    border-bottom: 2px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s18 {
    border-right: none;
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
    border-right: 2px SOLID #000000;
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
  .ritz .waffle .s28 {
    border-bottom: 2px SOLID #000000;
    border-right: 2px SOLID #000000;
    background-color: #ffffff;
    text-align: left;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    color: #0563c1;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s26 {
    background-color: #ffffff;
    text-align: left;
    font-style: italic;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s0 {
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
  .ritz .waffle .s2 {
    border-bottom: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s23 {
    background-color: #ffffff;
    text-align: left;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
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
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s27 {
    border-left: none;
    border-right: none;
    background-color: #ffffff;
  }
  .ritz .waffle .s21 {
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s1 {
    border-bottom: 1px SOLID transparent;
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
  .ritz .waffle .s6 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s19 {
    border-left: none;
    border-right: none;
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
          id="143660389R0"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s1"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s2"></td>
        <td class="s3"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R1"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s4"></td>
        <td class="s6" colspan="3">MANAGEMENT OF LA TOXICITY</td>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R2"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="143660389R3"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s7" colspan="2">TREATMENT</td>
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
          id="143660389R4"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s8"></td>
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
          id="143660389R5"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s9" colspan="2">enter BODY WEIGHT (KG)=</td>
        <td class="s10">${weight}</td>
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
          id="143660389R6"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s2"></td>
        <td class="s2"></td>
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
          id="143660389R7"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s12 softmerge">
          <div class="softmerge-inner" style="width: 243px; left: -1px">
            CARDIOTOXICITY
          </div>
        </td>
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
          id="143660389R8"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s11"></td>
        <td class="s14 softmerge">
          <div class="softmerge-inner" style="width: 243px; left: -1px">
            without circulatory arrest
          </div>
        </td>
        <td class="s15"></td>
        <td class="s15"></td>
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
          id="143660389R9"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s16"></td>
        <td class="s16"></td>
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
          id="143660389R10"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s17"></td>
        <td class="s18 softmerge">
          <div class="softmerge-inner" style="width: 337px; left: -1px">
            use conventional therpies to treat :
          </div>
        </td>
        <td class="s19"></td>
        <td class="s13"></td>
        <td class="s20"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R11"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s17"></td>
        <td class="s21" colspan="3">hypotension</td>
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
          id="143660389R12"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s17"></td>
        <td class="s21" colspan="3">bradycardia</td>
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
          id="143660389R13"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s17"></td>
        <td class="s22" colspan="3">tachyarrhythmias</td>
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
          id="143660389R14"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="143660389R15"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s0">HYPOTENSION:</td>
        <td class="s23">epinephrine</td>
        <td class="s24">IV</td>
        <td class="s25">${weight}</td>
        <td class="s23">MICROgrams</td>
        <td class="s0">OR</td>
        <td class="s25">${weight * 0.1}</td>
        <td class="s23">ML</td>
        <td class="s23">1: 100 000</td>
        <td class="s23">DILUTION</td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R16"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td class="s0" colspan="2">(1 MICROgram/KG)</td>
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
          id="143660389R17"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="143660389R18"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="143660389R19"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s0">ARRHYTHMIA:</td>
        <td class="s26" colspan="6">
          * Lignocaine should NOT be used as as antiarrhythmic therapy !
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R20"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td class="s18 softmerge">
          <div class="softmerge-inner" style="width: 269px; left: -1px">
            Avoid Calcium Channel Blockers
          </div>
        </td>
        <td class="s27"></td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R21"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td class="s18 softmerge">
          <div class="softmerge-inner" style="width: 200px; left: -1px">
            Avoid Beta Blockers
          </div>
        </td>
        <td class="s20"></td>
        <td class="s20"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R22"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td></td>
        <td class="s8"></td>
        <td class="s8"></td>
        <td class="s8"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="143660389R23"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s9">consider:</td>
        <td class="s28" colspan="3">
          <a target="_blank" href="#gid=69382765">IV LIPID EMULSION THERAPY</a>
        </td>
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
`,
    fileName: genName("CARDIOTOXICITY"),
    directory: Platform.OS === "android" ? "Downloads" : "Documents",
  };

  let PDFOptions3 = {
    // INTRALIPID THERAPY
    html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link
  type="text/css"
  rel="stylesheet"
  href="resources/sheet.css"
/>
<style type="text/css">
  .ritz .waffle a {
    color: inherit;
  }
  .ritz .waffle .s12 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
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
  .ritz .waffle .s30 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #b4c6e7;
    text-align: left;
    font-weight: bold;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s43 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID #2f5496;
    background-color: #d9e2f3;
    text-align: left;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s20 {
    border-bottom: 1px SOLID #e34cc9;
    border-right: 1px SOLID transparent;
    background-color: #e995b6;
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
  .ritz .waffle .s27 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID #e34cc9;
    background-color: #f3e3ea;
    text-align: left;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s42 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d9e2f3;
    text-align: left;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s39 {
    border-bottom: 1px SOLID #2f5496;
    border-right: 1px SOLID #2f5496;
    background-color: #d9e2f3;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s14 {
    border-bottom: 1px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s24 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: center;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s28 {
    border-bottom: 1px SOLID #e34cc9;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s2 {
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
  .ritz .waffle .s35 {
    border-bottom: 1px SOLID #2f5496;
    border-right: 1px SOLID transparent;
    background-color: #b4c6e7;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s25 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: right;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s18 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #e995b6;
    text-align: left;
    font-weight: bold;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s37 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d9e2f3;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s23 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: left;
    font-weight: bold;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s34 {
    border-left: none;
    border-bottom: 1px SOLID #2f5496;
    background-color: #b4c6e7;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s38 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID #2f5496;
    background-color: #d9e2f3;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s8 {
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s3 {
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
  .ritz .waffle .s32 {
    border-right: none;
    border-bottom: 1px SOLID #2f5496;
    background-color: #b4c6e7;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s13 {
    border-bottom: 1px SOLID #000000;
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
  .ritz .waffle .s21 {
    border-bottom: 1px SOLID #e34cc9;
    border-right: 1px SOLID transparent;
    background-color: #e995b6;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s41 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #d9e2f3;
    text-align: right;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s33 {
    border-left: none;
    border-right: none;
    border-bottom: 1px SOLID #2f5496;
    background-color: #b4c6e7;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
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
    text-align: right;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s7 {
    border-bottom: 2px SOLID #000000;
    background-color: #ffffff;
  }
  .ritz .waffle .s22 {
    border-right: 1px SOLID #e34cc9;
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
  .ritz .waffle .s10 {
    border-right: 2px SOLID #000000;
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
    border-right: 1px SOLID transparent;
    background-color: #ffffff;
    text-align: left;
    font-weight: bold;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s44 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s5 {
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
  .ritz .waffle .s17 {
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
  .ritz .waffle .s0 {
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
  .ritz .waffle .s16 {
    border-bottom: 1px SOLID #000000;
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s46 {
    border-right: 1px SOLID #2f5496;
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
  .ritz .waffle .s29 {
    border-bottom: 1px SOLID #e34cc9;
    border-right: 1px SOLID #e34cc9;
    background-color: #f3e3ea;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s6 {
    border-bottom: 1px SOLID transparent;
    background-color: #ffffff;
  }
  .ritz .waffle .s40 {
    border-bottom: 1px SOLID #2f5496;
    border-right: 1px SOLID transparent;
    background-color: #d9e2f3;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s45 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: right;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s19 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #e995b6;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s15 {
    border-right: 1px SOLID #000000;
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
  .ritz .waffle .s1 {
    border-bottom: 1px SOLID transparent;
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
  .ritz .waffle .s31 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #b4c6e7;
    text-align: left;
    color: #000000;
    font-family: docs-Calibri, Arial;
    font-size: 12pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s26 {
    border-bottom: 1px SOLID transparent;
    border-right: 1px SOLID transparent;
    background-color: #f3e3ea;
    text-align: left;
    color: #c00000;
    font-family: docs-Calibri, Arial;
    font-size: 14pt;
    vertical-align: bottom;
    white-space: nowrap;
    direction: ltr;
    padding: 0px 3px 0px 3px;
  }
  .ritz .waffle .s36 {
    border-right: 1px SOLID #2f5496;
    background-color: #ffffff;
  }
  .ritz .waffle .s4 {
    background-color: #ffffff;
    text-align: center;
    font-weight: bold;
    color: #2f5496;
    font-family: docs-Calibri, Arial;
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
      <tr>
        <th class="row-header freezebar-origin-ltr"></th>
      </tr>
    </thead>
    <tbody>
      <tr style="height: 20px">
        <th
          id="69382765R0"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s1"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R1"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s2"></td>
        <td class="s4" colspan="3">MANAGEMENT OF LA TOXICITY</td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R2"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="s7"></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R3"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s9" colspan="2">INTRALIPID THERAPY</td>
        <td></td>
        <td class="s10" colspan="2">enter BODY WEIGHT (KG)=</td>
        <td class="s11">${weight}</td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R4"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s12" colspan="2">(20% LIPID EMULSION)</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R5"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s13" colspan="2"></td>
        <td class="s14"></td>
        <td class="s14"></td>
        <td class="s14"></td>
        <td class="s14"></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R6"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s15"></td>
        <td class="s16" colspan="6">
          ** LAST treatment box (BLACK) located in MOT recovery &amp; outside
          DSOT 2
        </td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R7"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s17"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R8"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s18">IMMEDIATE:</td>
        <td class="s19"></td>
        <td class="s19"></td>
        <td class="s19"></td>
        <td class="s19"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R9"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s2"></td>
        <td class="s20" colspan="2"></td>
        <td class="s21"></td>
        <td class="s21"></td>
        <td class="s21"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R10"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s22"></td>
        <td class="s23">BOLUS</td>
        <td class="s24">IV</td>
        <td class="s25">%{roundToOneDecimalPlace(weight*1.5)}</td>
        <td class="s26">ML</td>
        <td class="s27">Over 1 Minute</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R11"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s22"></td>
        <td class="s28">(1.5 ML/KG)</td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s29"></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R12"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td></td>
        <td></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R13"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s22"></td>
        <td class="s23">INFUSION</td>
        <td class="s24">IV</td>
        <td class="s25">${roundToOneDecimalPlace(weight * 15)}</td>
        <td class="s26">ML</td>
        <td class="s27">Over 1 Hour</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R14"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s22"></td>
        <td class="s28">(15 ML/KG/H)</td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s28"></td>
        <td class="s29"></td>
        <td class="s0"></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R15"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="69382765R16"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R17"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s1"></td>
        <td class="s1"></td>
        <td class="s1"></td>
        <td class="s1"></td>
        <td class="s1"></td>
        <td class="s0"></td>
        <td class="s0"></td>
        <td class="s0"></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R18"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s30" colspan="2">AFTER 5 MINUTES:</td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R19"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td class="s31"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R20"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s32 softmerge">
          <div class="softmerge-inner" style="width: 324px; left: -1px">
            if cardiovascular stabilty NOT restored:
          </div>
        </td>
        <td class="s33"></td>
        <td class="s34"></td>
        <td class="s34"></td>
        <td class="s35"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R21"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s36"></td>
        <td class="s37"></td>
        <td class="s37"></td>
        <td class="s37"></td>
        <td class="s37"></td>
        <td class="s38"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R22"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s36"></td>
        <td class="s38" colspan="5">
          1. repeat bolus up to maximum of 2X (same dose) 5 minutes apart
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R23"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s36"></td>
        <td class="s39" colspan="5">
          (TOTAL 3 bolus including initial dose !)
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R24"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s40"></td>
        <td class="s40"></td>
        <td class="s40"></td>
        <td class="s40"></td>
        <td class="s40"></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R25"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s36"></td>
        <td class="s37" colspan="2">
          2. double rate of
          <span style="font-size: 12pt; font-family: Arial; color: #2f5496"
            >INFUSION</span
          ><span
            style="font-size: 12pt; font-family: Calibri, Arial; color: #000000"
            >:</span
          >
        </td>
        <td class="s41">${roundToOneDecimalPlace(30 * weight)}</td>
        <td class="s42">ML</td>
        <td class="s43">Over 1 Hour</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R26"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s36"></td>
        <td class="s39" colspan="5">(30 ML/KG/ H)</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R27"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
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
          id="69382765R28"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td class="s6"></td>
        <td></td>
      </tr>
      <tr style="height: 20px">
        <th
          id="69382765R29"
          style="height: 20px"
          class="row-headers-background"
        ></th>
        <td class="s0"></td>
        <td class="s8"></td>
        <td class="s44" colspan="5">
          DO NOT EXCEED MAXIMUM CUMMULATIVE DOSE (12 ML/KG) =
        </td>
        <td class="s45">${roundToOneDecimalPlace(weight * 12)}</td>
        <td class="s44">ML</td>
        <td class="s46"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
    fileName: "Intraplipid Therapy",
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
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);

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
              marginBottom: "-3%",
            }}
            onPress={() => setCollapsed1(!collapsed1)}
          >
            <Text
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              LA Toxicity Management
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
          <Collapsible collapsed={collapsed1}>
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
          <Collapsible collapsed={collapsed2} style={{ marginTop: "2%" }}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
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
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
              ]}
            >
              Treatment
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
          <Collapsible collapsed={collapsed3} style={{ marginTop: "2%" }}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              CARDIOTOXICITY - with circulatory arrest
            </Text>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              {"\t"} 1. start CPR {"\n"}
              {"\t"} 2. Administer Intraplid therapy (take reference to below
              calc) {"\n"}
            </Text>
            <View
              style={{
                flexDirection: "Column",
                marginTop: "10%",
                paddingBottom: "10%",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={() => createPDF(PDFOptions1)}>
                <IconButton
                  bgHex="#72A8DA"
                  title="Neurotoxicity"
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
                  title="CARDIOTOXICITY"
                  iconPath="folder-outline"
                  contentHex="white"
                  borderColor={"rgb(30, 30, 32)"}
                  borderWidth={0}
                  size={(Dimensions.get("window").height / 844) * 25}
                  textSize={
                    Platform.isPad
                      ? Dimensions.get("window").height * 0.04739336 * 0.45
                      : 16
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => createPDF(PDFOptions2)}>
                <IconButton
                  bgHex="#72A8DA"
                  title="Intraplid Therapy"
                  iconPath="folder-outline"
                  contentHex="white"
                  borderColor={"rgb(30, 30, 32)"}
                  borderWidth={0}
                  size={(Dimensions.get("window").height / 844) * 25}
                  textSize={
                    Platform.isPad
                      ? Dimensions.get("window").height * 0.04739336 * 0.45
                      : 17
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
    gap: 10,
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
