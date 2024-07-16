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
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import TextInputButton from "../components/TextInputButton";
// import TextButton from '../components/TextButton';
import IconButton from "../components/IconButton";
import SegmentedControl from "../components/SegmentedControl";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDarkMode } from "../components/DarkModeContext";
// import { ScrollView } from "react-native-gesture-handler";
import FileViewer from "react-native-file-viewer";

export default function Bmi() {
  const { isDarkMode } = useDarkMode();

  const [age, setAge] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isMale, setGender] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [result, setResult] = useState("Input values to get result");
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
  </body>\
  </html>`,
        fileName: genName("BMI"),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("File path: ", file.filePath);
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
              width={(Dimensions.get("window").width * 125) / 390}
              height={(Dimensions.get("window").height * 55) / 844}
              backgroundColor={"#313135"}
              store={age}
              action={setAge}
            />
          </View>
          <View style={styles.segmentedControlRow}>
            <SegmentedControl
              width={(Dimensions.get("window").width * 260) / 390}
              height={(Dimensions.get("window").height * 35) / 844}
              titleArray={["Male", "Female"]}
              fontSize={(Dimensions.get("window").height / 844) * 16}
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
                width={(Dimensions.get("window").width * 120) / 390}
                height={(Dimensions.get("window").height * 55) / 844}
                backgroundColor={"#313135"}
                store={height}
                action={setHeight}
              />
              <View style={{ marginVertical: 15 }} />
              <TextInputButton
                title="Weight"
                unit="kg"
                width={(Dimensions.get("window").width * 120) / 390}
                height={(Dimensions.get("window").height * 55) / 844}
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
                width={(Dimensions.get("window").width * 125) / 390}
                height={(Dimensions.get("window").height * 55) / 844}
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
              fontSize: (Dimensions.get("window").height / 844) * 18,
              color: isDarkMode ? "white" : "black",
            }}
          >
            {result}
          </Text>
          <View style={styles.shareRow}>
            <TouchableOpacity onPress={createPDF}>
              <IconButton
                bgHex="#rgb(30, 30, 32)"
                title="Share"
                iconPath="share-variant"
                contentHex="#72A8DA"
                borderColor={"#72A8DA"}
                borderWidth={1.25}
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
        <View style={styles.divider} />
        {/* <View style={styles.selectionRow}>
          <TouchableOpacity onPress={() => console.log(isMale)}>
            <TextButton
              title="Drug"
              width={(Dimensions.get("window").width * 156) / 390}
              height={(Dimensions.get("window").height * 40) / 844}
              bgHex="#313135"
              contentHex={"white"}
              borderRadius={17.5}
              fontWeight={"700"}
              textSize={(Dimensions.get("window").height / 844) * 18}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Bmi")}>
            <TextButton
              title="BMI"
              width={(Dimensions.get("window").width * 156) / 390}
              height={(Dimensions.get("window").height * 40) / 844}
              bgHex="#313135"
              contentHex={"white"}
              borderRadius={17.5}
              fontWeight={"700"}
              textSize={(Dimensions.get("window").height / 844) * 18}
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flexDirection: "column",
    // justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 30,
    height: Dimensions.get("window").height * 0.75,
    width: Dimensions.get("window").width * 0.95,
    paddingBottom: 30,
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
    width: Dimensions.get("window").width - 20,
    borderWidth: 1,
    borderColor: "#6D6D74",
    marginVertical: 35,
  },
  selectionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
