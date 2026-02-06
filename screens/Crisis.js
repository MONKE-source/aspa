import React, { useState, useEffect, useContext } from "react";
import { WeightProvider, WeightContext } from "../components/WeightContext";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
// import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { BlurView } from "expo-blur";
import {
  DarkModeProvider,
  DarkModeContext,
  useDarkMode,
} from "../components/DarkModeContext";
import TopBar from "../components/TopBar";
import TextInputButton from "../components/TextInputButton";
import TextButton from "../components/TextButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//screens
import Settings from "./Settings";
import Anaphylaxis from "./anaphylixcs";
import CardiacArrest from "./CardiacArrest";
import Hyper from "./hyper";
import LA from "./Latoxicity";
import Basiclifesupport from "./Basiclifesupport";
import Hypertermina from "./hypertermina";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import useResponsive from "../components/useResponsive";

export default function CrisisNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <WeightProvider>
      <Stack.Navigator initialRouteName="Set Weight">
        <Stack.Screen
          name="CrisisHome"
          component={Crisis}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Anaphylaxis"
          component={Anaphylaxis}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Cardiac Arrest"
          component={CardiacArrest}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Hyperkalemia"
          component={Hyper}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="LA Toxicity"
          component={LA}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Basic Life Support"
          component={Basiclifesupport}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Malignant Hyperthermia"
          component={Hypertermina}
          options={{
            headerStyle: {
              backgroundColor: "rgb(30, 30, 32)",
              color: "white",
            },
            headerTitleStyle: {
              color: "rgba(255, 255, 255, 0)",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Set Weight"
          component={SetWeight}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </WeightProvider>
  );
}
function SetWeight({ navigation }) {
  const [displayWeight, setDisplayWeight] = useState(true);
  const { weight, setWeight } = useContext(WeightContext);
  const { width, height, isLandscape, isTablet, wp, hp, ms, fs } = useResponsive();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const containerWidth = isLandscape ? Math.min(wp(60), 500) : wp(92.5);
  const containerHeight = isLandscape ? hp(70) : hp(57.5);
  const inputWidth = isLandscape ? Math.min(wp(25), 250) : wp(40);
  const inputHeight = isLandscape ? Math.min(hp(12), 60) : hp(9);
  const nextBtnWidth = isLandscape ? Math.min(wp(50), 400) : wp(80);
  const nextBtnHeight = isLandscape ? Math.min(hp(10), 55) : hp(6.3);
  const titleFontSize = isTablet ? ms(25, 0.45) : 25;

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      width: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      borderRadius: (width * 0.1) / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      // left: 5,
    },
    settingIcon: {
      height: width * 0.055,
      width: width * 0.055,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: width * 0.05,
      marginHorizontal: 7.5,
      width: isLandscape ? Math.min(width * 0.65, 600) : width * 0.85,
      height: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: width * 0.035,
      marginTop: isLandscape ? 15 : 30,
      marginBottom: isLandscape ? 0 : -25,
    },
    searchIcon: {
      height: Math.min(width * 0.04, 20),
      width: Math.min(width * 0.04, 20),
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: width * 0.03,
      fontWeight: "600",
      fontSize: isLandscape ? Math.min(width * 0.025, 18) : width * 0.045,
      color: "white",
      width: isLandscape ? Math.min(width * 0.5, 500) : width * 0.65,
    },
    clearButton: {},
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
          width: containerWidth,
          height: containerHeight,
          backgroundColor: "transparent",
          borderRadius: hp(4.7) * 0.945,
          borderWidth: 2,
          borderColor: "hsv(240, 2%, 18%)",
        }}
      >
        <Text
          style={{
            color: isDarkMode ? "white" : "black",
            fontWeight: "700",
            fontSize: titleFontSize,
            position: "relative",
            top: "10%",
          }}
          allowFontScaling={false}
        >
          Enter patient's weight
        </Text>
        <View style={{ position: "relative", top: "26%" }}>
          <TextInputButton
            title="Weight"
            unit="kg"
            action={(prop) => {
              setWeight(prop);
              setDisplayWeight(false);
            }}
            backgroundColor={"#313135"}
            width={inputWidth}
            height={inputHeight}
          />
        </View>
        {displayWeight === false && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CrisisHome");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              width: nextBtnWidth,
              height: nextBtnHeight,
              backgroundColor: "black",
              borderRadius: hp(4.7) * 0.5,
              position: "relative",
              top: "55%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: titleFontSize,
              }}
              allowFontScaling={false}
            >
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

function Crisis({ navigation }) {
  const [displayWeight, setDisplayWeight] = useState(true);
  const { weight, setWeight } = useContext(WeightContext);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const { width, height, isLandscape, isTablet, wp, hp, ms, fs } = useResponsive();
  const [filteredData, setFilteredData] = useState([]);
  const [isBlurred, setIsBlurred] = useState([
    {
      id: "1",
      title: "Cardiac Arrest", // Changed to Cardiac arrest since doctor asked, no more section for cardiac arrest instructions currently
      navigation: "Basic Life Support",
    },
    {
      id: "3",
      title: "LA Toxicity",
      navigation: "LA Toxicity",
    },
    {
      id: "4",
      title: "Hyperkalemia",
      navigation: "Hyperkalemia",
    },
    {
      id: "5",
      title: "Malignant Hyperthermia",
      navigation: "Malignant Hyperthermia",
    },
    {
      id: "6",
      title: "Anaphylaxis",
      navigation: "Anaphylaxis",
    },
  ]);

  useEffect(() => {
    setFilteredData([...isBlurred]);
  }, []);

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      width: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      borderRadius: (width * 0.1) / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      // left: 5,
    },
    settingIcon: {
      height: width * 0.055,
      width: width * 0.055,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: width * 0.05,
      marginHorizontal: 7.5,
      width: isLandscape ? Math.min(width * 0.65, 600) : width * 0.85,
      height: isLandscape ? Math.min(width * 0.06, 50) : width * 0.1,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: width * 0.035,
      marginTop: isTablet ? 20 : (isLandscape ? 15 : 30),
      marginBottom: isTablet ? 0 : (isLandscape ? 0 : -25),
    },
    searchIcon: {
      height: Math.min(width * 0.04, 20),
      width: Math.min(width * 0.04, 20),
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: width * 0.03,
      fontWeight: "600",
      fontSize: isLandscape ? Math.min(width * 0.025, 18) : width * 0.045,
      color: "white",
      width: isLandscape ? Math.min(width * 0.5, 500) : width * 0.65,
    },
    clearButton: {},
  });

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: width - 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          width: width - 20,
          // height: Dimensions.get("window").height - 580,
          height: "60%",
        }}
      >
        <TouchableOpacity
          style={[styles.rectangle, {
            width: isLandscape ? Math.min(width * 0.7, 700) : width * 0.95,
            height: isLandscape ? Math.min(hp(14), 70) : hp(10),
          }]}
          onPress={() => navigation.navigate(item.navigation)}
        >
          <Text style={[styles.title, { fontSize: isTablet ? ms(20, 0.4) : 20 }]} allowFontScaling={false}>
            {item.title}
          </Text>
          <AntDesign name="right" style={{ color: "grey", fontSize: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity
            style={{ marginTop: isLandscape ? 18 : 34, marginLeft: 15 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <SimpleLineIcons
              name="settings"
              style={{
                fontSize: isTablet ? ms(30, 0.4) : (isLandscape ? 24 : 30),
                color: isDarkMode ? "white" : "black",
              }}
            />
          </TouchableOpacity>
          <View style={dynamicStyles.searchContainer}>
            <Image
              source={require("../assets/search.png")}
              style={dynamicStyles.searchIcon}
            />
            <TextInput
              allowFontScaling={false}
              style={dynamicStyles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#818188"
              value={searchQuery}
              onChangeText={(text) => {
                const lowercaseText = text.toLowerCase();
                setSearchQuery(text);
                const filtered = isBlurred.filter((item) => {
                  const lowercaseTitle = item.title.toLowerCase();
                  return lowercaseTitle.includes(lowercaseText);
                });
                setFilteredData(filtered);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            backgroundColor: "#72A8DA",
            marginTop: 15,
            width: width,
            height: isLandscape ? Math.min(hp(10), 50) : hp(8),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: isTablet ? ms(20, 0.45) : (isLandscape ? 16 : 20),
            }}
            allowFontScaling={false}
          >
            Patient's Weight:{" "}
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: isTablet ? ms(25, 0.45) : (isLandscape ? 20 : 25),
              }}
              allowFontScaling={false}
            >
              {weight}
            </Text>{" "}
            kg
          </Text>
        </TouchableOpacity>
        <FlatList
          data={filteredData} // use filteredData here
          style={{ top: isLandscape ? 10 : 25, marginBottom: isLandscape ? 50 : 70 }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContainer, { width: width }]}
        />
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    alignItems: "center",
    marginVertical: 15,
    paddingBottom: 75,
    paddingTop: 10,
  },
  rectangle: {
    marginBottom: 20,
    backgroundColor: "rgb(69, 69, 74)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    overflow: "hidden",
    paddingVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: "5%",
  },
  title: {
    color: "white",
    fontSize: Platform.isPad ? 30 : 20,
    fontWeight: "700",
  },
  eyeview: {
    position: "relative",
    left: 5,
  },
  descview: {
    fontSize: 16.5,
    fontWeight: "400",
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 17.5,
  },
});
