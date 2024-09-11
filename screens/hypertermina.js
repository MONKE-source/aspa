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

export default function Hypertermina() {
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
      Alert.alert("File path: ", file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Call for help", completed: false },
    {
      id: 2,
      text: "STOP all triggers (turn OFF VOLATILE anaesthetics)",
      completed: false,
    },
    { id: 3, text: "Get MH Box with Dantrolene", completed: false },
    { id: 4, text: "Notify surgeon", completed: false },
    { id: 5, text: "Install clean breathing circuit", completed: false },
    { id: 6, text: "Hyperventilate with 100% oxygen", completed: false },
    {
      id: 7,
      text: "Maintain anaesthesia with IV anaesthetics",
      completed: false,
    },
    {
      id: 8,
      text: "Muscle relaxation with Non-Depolarising neuromuscular blockers",
      completed: false,
    },
    { id: 9, text: "Finish/abandon surgery ASAP", completed: false },
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
  const [collapsed5, setCollapsed5] = useState(true);
  const [collapsed6, setCollapsed6] = useState(true);

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
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              MALIGNANT HYPERTHERMIA
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
              Check Box
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
                  color: isDarkMode ? "white" : "black",
                  textDecorationLine: "none",
                },
              ]}
            >
              MH BOX- ORANGE box (containing essential drugs & treatment
              algorithm) kept in: {`\n`}
              {"\t"}- MOT: check with your instituition {`\n`}
              {"\t"}- DSOT- check with your own instituition {`\n`}
              {"\n"}
              Please inform AU nurse if MH box has been opened and used.{`\n`}
              Please return box to respective OT locations if not used.
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
                {
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "3%",
                },
              ]}
            >
              Recognition
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
                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              Previous uneventful GA DOES NOT rule out MH
              {"\n"}
              {"\n"}
              Clinical:{"\n"}
              {"\t"}1. Unexplained increase in ETCO2 {"\n"}
              {"\t"}2. Unexplained Tachycardia {"\n"}
              {"\t"}3. Unexplained increase in Oxygen requirements {"\n"}
              {"\t"}4. Trunk or limb rigidity {"\n"}
              {"\t"}5. Masseter spasm (Trismus) {"\n"}
              {"\t"}6. Unstable or rising blood pressure {"\n"}
              {"\t"}7. Respiratory & Metabloic Acidosis {"\n"}
              {"\t"}8. Arrhythmias {"\n"}
              {"\t"}9. Temperature changes are a LATE sign
              {"\n"}
              {"\n"}
              Biochemical:{"\n"}
              {"\t"}1. increased PaCO2 {"\n"}
              {"\t"}2. decreased PH {"\n"}
              {"\t"}3. increased serum K {"\n"}
              {"\t"}4. decreased PaO2 {"\n"}
              {"\t"}5. increased creatine kinase {"\n"}
              {"\t"}6. myoglobinuria {"\n"}
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
              Treatment{" "}
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
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              Dantrolene
              {"\n"}
              1. COOL patient if temp {">"} 39 degrees celsius{"\n"}
              2.Cold IV NS,ice saline lavage, surface ice packs{"\n"}
              3.Stop cooling when temp 38 degrees celsius and falling
              {"\n"}
              {"\n"}
              Treat HYPERKALAEMIA{"\n"}
              1. Treat ARRHYTHMIAS{"\n"}
              {"\t"} - Avoid Calcium channel blockers {"\n"}
              {"\t"} - can use Amiodarone {"\n"}
              2. Treat METABOLIC ACIDOSIS {"\n"}
              {"\t"} - Hyperventilate {"\n"}
              {"\t"} - NaHCO3 {"\n"}
              3. Treat MYOGLOBINURIA{"\n"}
              {"\t"} - forced alkaline diuresis (mannitol/frusemide+NaHCO3){" "}
              {"\n"}
              {"\t"} - may require renal replacement therapy later {"\n"}
              4.Treat DIC (if present) {"\n"}
              {"\t"} - FFP, Cryoppt, Platelets {"\n"}
              {"\n"}
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed5(!collapsed5)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  marginTop: "2%",
                },
              ]}
            >
              Monitor
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
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "5%",
                },
              ]}
            >
              1. Core & Peripheral TEMPERATURE{"\n"}
              2. ECG{"\n"}
              3. Invasive BP{"\n"}
              4. CVP{"\n"}
              5. ETCO2/ PaCO2{"\n"}
              6. SpO2/ PaO2{"\n"}
              7. serum CREATINE KINASE{"\n"}
              8. serum K{"\n"}
              9. coagulation profile
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed6(!collapsed6)}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: isDarkMode ? "white" : "black",
              }}
            >
              DIFFERENTIAL DIAGNOSIS
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed6 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed6}>
            <Text
              style={[
                styles.checklistText,
                {
                  color: isDarkMode ? "white" : "black",
                  marginVertical: "3%",
                },
              ]}
            >
              1. Inadequate anaesthesia or analgesia{"\n"}
              2. Inappropriate breathing circuit, fresh gas flow or ventilation
              {"\n"}
              3. Infection or sepsis{"\n"}
              4. Tourniquet ischaemia{"\n"}
              5. Anaphylaxis{"\n"}
              5. Pheochromocytoma{"\n"}
              6. Thyroid storm
            </Text>
          </Collapsible>
          <View
            style={{
              paddingBottom: 20,
              flexDirection: "row",
              marginTop: "15%",
              alignSelf: "center",
              right: "0.75%",
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
