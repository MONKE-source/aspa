import React, { useState, useEffect } from "react";
import RNHTMLtoPDF from "react-native-html-to-pdf";
// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  useWindowDimensions,
} from "react-native";
import TextInputButton from "../components/TextInputButton";
// import TextButton from '../components/TextButton';
import IconButton from "../components/IconButton";
import SegmentedControl from "../components/SegmentedControl";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDarkMode } from "../components/DarkModeContext";
// import { ScrollView } from "react-native-gesture-handler";
import FileViewer from "react-native-file-viewer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useResponsive from "../components/useResponsive";

export default function Bmi() {
  const { isDarkMode } = useDarkMode();
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const shortDim = Math.min(winWidth, winHeight);
  const isTablet = Platform.isPad || (Platform.OS === "android" && shortDim >= 600);
  const fontScale = 1 + (shortDim / 375 - 1) * 0.3;
  // Use moderate scaling for input dimensions on tablet
  const inputScale = isTablet ? 1 + (shortDim / 390 - 1) * 0.4 : 1;

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isMale, setGender] = useState(true);
  const [bmi, setBmi] = useState("");
  const [result, setResult] = useState("Input values to get result");
  const [files, setFileArray] = useState([]);
  const getFilePaths = async () => {
    try {
      const savedValue = await AsyncStorage.getItem("files");
      if (savedValue !== null) {
        const filesArray = JSON.parse(savedValue);
        setFileArray(filesArray);
      }
    } catch (e) {
      Alert.alert("Error retrieving files: ", e);
    }
  };
  const saveFiles = async (filesArray) => {
    try {
      const jsonValue = JSON.stringify(filesArray);
      await AsyncStorage.setItem("files", jsonValue);
    } catch (e) {
      Alert.alert("Error saving files: ", e);
    }
  };
  function bmiAgeSexCheck(bmi) {
    if (bmi == NaN) {
      return 0;
    } else if (bmi <= 18.5) {
      return "Risk of nutritional deficiency diseases and osteoporosis";
    } else if (18.5 <= bmi && bmi <= 22.9) {
      return "Low risk (healthy range)";
    } else if (23.0 <= bmi && bmi <= 29.9) {
      return "Moderate Risk";
    } else {
      return "High Risk";
    }
  }
  useEffect(() => {
    getFilePaths();
  }, []);
  useEffect(() => {
    saveFiles(files);
  }, [files]);
  useEffect(() => {
    if (height && weight) {
      let bmi = weight / (height / 100) ** 2;
      setBmi(bmi.toFixed(2).toString());
      setResult(bmiAgeSexCheck(bmi));
    }
  }, [age, height, weight, isMale]);
  function genName(type) {
    const d = new Date();
    let uniqueName = type + d.toISOString();
    return uniqueName;
  }
  const createPDF = async () => {
    try {
      let PDFOptions = {
        html: `<!DOCTYPE html>\
  <html>\
  <head>\
      <title>BMI Data</title>\
      <style>\
          table {\
              width: 100%;\
              border-collapse: collapse;\
          }\
          th, td {\
              border: 1px solid black;\
              padding: 15px;\
              text-align: left;\
          }\
      </style>\
  </head>\
  <body>\
      <h1>BMI Data</h1>\
      <table>\
          <tr>\
              <th>Height</th>\
              <th>Weight</th>\
              <th>Gender</th>\
              <th>Age</th>\
              <th>BMI</th>\
          </tr>\
          <tr>\
              <td>${height}</td>\
              <td>${weight}</td>\
                <td>${isMale ? "female" : "male"}</td>\
              <td>${age}</td>\
              <td>${bmi}</td>\
          </tr>\
      </table>\
      <h2>Result: ${result}</h2>\
  </body>\
  </html>`,
        fileName: genName("BMI"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      FileViewer.open(file.filePath)
        .then(() => setFileArray([...files, file.filePath]))
        .catch((e) => {});
    } catch (error) {}
  };

  return (
    <SafeAreaView
      style={[
        styles.treeTop,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      {/* <StatusBar style="light" /> */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <View style={styles.patientAgeCol}>
            <TextInputButton
              title="Patient Age"
              unit=""
              width={isTablet ? 180 * inputScale : (winWidth * 125) / 390}
              height={isTablet ? 65 * inputScale : (winHeight * 55) / 844}
              backgroundColor={"#313135"}
              store={age}
              action={setAge}
            />
          </View>
          <View style={styles.segmentedControlRow}>
            <SegmentedControl
              width={isTablet ? Math.min(winWidth * 0.55, 500) : (winWidth * 260) / 390}
              height={isTablet ? 50 * inputScale : (winHeight * 35) / 844}
              titleArray={["Male", "Female"]}
              fontSize={16 * fontScale}
              color1={"#45454A"}
              color2={"#313135"}
              optionStore={isMale}
              optionUpdate={setGender}
            />
          </View>
          <View style={styles.inputRow}>
            <View style={styles.detailsColumn}>
              <TextInputButton
                title="Height"
                unit="cm"
                width={isTablet ? 170 * inputScale : (winWidth * 120) / 390}
                height={isTablet ? 65 * inputScale : (winHeight * 55) / 844}
                backgroundColor={"#313135"}
                store={height}
                action={setHeight}
              />
              <View style={{ marginVertical: 15 }} />
              <TextInputButton
                title="Weight"
                unit="kg"
                width={isTablet ? 170 * inputScale : (winWidth * 120) / 390}
                height={isTablet ? 65 * inputScale : (winHeight * 55) / 844}
                backgroundColor={"#313135"}
                store={weight}
                action={setWeight}
              />
            </View>
            <View style={styles.bmiRow}>
              {/* <MaterialCommunityIcons
                name={"arrow-right"}
                size={35}
                color="#818188"
                style={{ paddingTop: 23, paddingRight: 10 }}
              /> */}
              <TextInputButton
                title="BMI"
                width={isTablet ? 180 * inputScale : (winWidth * 125) / 390}
                height={isTablet ? 65 * inputScale : (winHeight * 55) / 844}
                backgroundColor={"#45454A"}
                store={bmi}
                action={setBmi}
              />
            </View>
          </View>
          <Text
            style={{
              marginTop: 30,
              fontWeight: "700",
              fontSize: 18 * fontScale,
              color: isDarkMode ? "white" : "black",
            }}
            allowFontScaling={false}
          >
            {result}
          </Text>
          <View style={styles.shareRow}>
            <TouchableOpacity onPress={createPDF}>
              <IconButton
                bgHex="#72A8DA"
                title="View"
                iconPath="folder-outline"
                contentHex="white"
                borderColor={"rgb(30, 30, 32)"}
                borderWidth={0}
                size={25 * fontScale}
                textSize={
                  isTablet
                    ? 19 * fontScale
                    : 19
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        {/* <View style={styles.selectionRow}>
          
            <TextButton
              title="Drug"
              width={(winWidth * 156) / 390}
              height={(winHeight * 40) / 844}
              bgHex="#313135"
              contentHex={"white"}
              borderRadius={17.5}
              fontWeight={"700"}
              textSize={(winHeight / 844) * 18}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Bmi")}>
            <TextButton
              title="BMI"
              width={(winWidth * 156) / 390}
              height={(winHeight * 40) / 844}
              bgHex="#313135"
              contentHex={"white"}
              borderRadius={17.5}
              fontWeight={"700"}
              textSize={(winHeight / 844) * 18}
            />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  treeTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginVertical: 30,
    width: "95%",
    maxWidth: 700,
    paddingBottom: 30,
    alignSelf: "center",
  },
  mainContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  patientAgeCol: {
    flexDirection: "column",
    alignItems: "center",
  },
  segmentedControlRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    marginTop: 25,
  },
  detailsColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 15,
  },
  bmiRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  divider: {
    height: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#6D6D74",
    marginVertical: 35,
  },
  selectionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
