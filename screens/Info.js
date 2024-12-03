import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDarkMode } from "../components/DarkModeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { openGitPDF } from "./Main"; // function to open the pdfs
import Settings from "./Settings";

const Info = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [fontSize, setFontSize] = useState(18);

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(12, prevSize - 2));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "white",
        flex: 1,
        marginBottom: 50,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Image
            source={require("../assets/aspaImage.png")}
            style={styles.Image}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            color: isDarkMode ? "white" : "black",
            fontSize: 30,
            padding: 25,
            alignSelf: "center",
            marginTop: "-8%",
          }}
        >
          DISCLAIMER
        </Text>
        <Text
          style={{
            color: isDarkMode ? "white" : "black",
            paddingLeft: 25,
            paddingRight: 25,
            fontSize: fontSize,
          }}
        >
          This app is a resource for doctors working under the Asian Society of
          Paediatric Anaesthesiologists. The guidelines presented are based on
          department and international practice guidelines. They are not meant
          to be comprehensive but may not be all inclusive. The use of these
          guidelines must be individualized to the patient's needs. {"\n"}The
          authors of each chapter have ensured that the information is current
          and correct at the time of writing. Asian Society of Paediatric
          Anaesthesiologists does not assume responsibility for the correctness,
          sufficiency or completeness of such information or recommendations.
          The user is advised to check drug dosages and protocols carefully and
          refer to the latest updates posted by the relevant anesthesia bodies.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{
            backgroundColor: isDarkMode ? "white" : "#45454A",
            width: "90%",
            alignSelf: "center",
            height: "5%",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 20,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              color: isDarkMode ? "black" : "white",
              fontWeight: "bold",
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openGitPDF("Acknowledgement", "Acknowledgement")}
          style={{
            backgroundColor: isDarkMode ? "white" : "#45454A",
            width: "90%",
            alignSelf: "center",
            height: "5%",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 5,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              color: isDarkMode ? "black" : "white",
              fontWeight: "bold",
            }}
          >
            Acknowledgments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openGitPDF("Preface", "Preface")}
          style={{
            backgroundColor: isDarkMode ? "white" : "#45454A",
            width: "90%",
            alignSelf: "center",
            height: "5%",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 5,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              color: isDarkMode ? "black" : "white",
              fontWeight: "bold",
            }}
          >
            Preface
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            padding: 25,
            color: isDarkMode ? "white" : "black",
            fontWeight: "bold",
            // position: 'absolute',
            // bottom: 80,
          }}
        >
          2024 © Caleb Han, Aathithya Jegatheesan, Ted Goh, arth, Darryan Lim
        </Text>

        {/* Settings Section */}
        {/*<View style={styles.settingsContainer}>
        <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20, marginBottom: 10 }}>Settings</Text>
        <View style={styles.settingRow}>
          <Text style={{ flex: 1, fontSize: 16, color: isDarkMode ? 'white' : 'black' }}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>
  </ScrollView>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Infos"
        component={Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
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
  settingsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: useDarkMode ? "rgb(30, 30, 32)" : "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  Image: {
    width: "90%",
    alignSelf: "center",
  },
});

// export default Info;
