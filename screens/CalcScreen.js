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
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
import {
  scoliosis,
  cardiac,
  MH,
  HyperK,
  LAToxic,
  Anaphylaxis,
  files,
} from "./pdfs";

function CalcScreen({ navigation }) {
  // Reference dimension : iPhone 14
  // console.log(Dimensions.get("window").width);  390
  // console.log(Dimensions.get("window").height);  844
  const windowWidth = useWindowDimensions().width;
  const [buttonState, setButtonState] = useState("");
  const [weight, setWeight] = useState(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
              style={[styles.select, { color: isDarkMode ? "white" : "black" }]}
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
            <ScrollView>
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
            </ScrollView>
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
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <FontAwesome name="history" size={40} color="white" />
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

const FileItem = ({ item, setDisplayFiles, displayFiles, files }) => {
  const title = item.replace(/.*\/|\.pdf$/g, ""); // Remove everything before the item and .pdf so easier for renaming
  const [newName, setNewName] = useState(title);
  // for deleting the files
  // TODO: add async storage
  const deletion = () => {
    RNFS.unlink(item)
      .then(() => {
        console.log("FILE DELETED");
        const index = files.indexOf(item);
        files.splice(index, 1); //removes deleted items from array
        const updatedFiles = files.filter((file) => file !== item); // creates new array without the deleted item
        setDisplayFiles(updatedFiles);
        console.log(files);
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
        console.log("FILE RENAMED");
        // Update the displayFiles array
        const updatedFiles = displayFiles.map((file) =>
          file === item ? newPath : file
        );
        setDisplayFiles(updatedFiles);
        files[files.indexOf(item)] = newPath; // Update the original files array if necessary
        Alert.alert("Success", "File Renamed");
        console.log(files);
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

  useEffect(() => {
    setDisplayFiles(files);
  }, [files]);

  return (
    <SafeAreaView
      style={[
        styles.treeTop,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <KeyboardAvoidingView behavior="position">
        <FlatList
          data={displayFiles}
          renderItem={({ item }) => (
            <FileItem
              item={item}
              setDisplayFiles={setDisplayFiles}
              files={files}
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
    marginTop: 35,
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
