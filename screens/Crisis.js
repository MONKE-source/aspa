import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  useWindowDimensions,
  Image,
  TextInput,
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

export default function CrisisNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Crisis">
      <Stack.Screen
        name="Crisis"
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
    </Stack.Navigator>
  );
}

function Crisis({ navigation }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const windowWidth = useWindowDimensions().width;
  const [filteredData, setFilteredData] = useState([]);
  const [isBlurred, setIsBlurred] = useState([
    {
      id: "1",
      title: "Basic Life Support(BLS)",
      navigation: "Basic Life Support",
    },
    {
      id: "2",
      title: "Cardiac Arrest",
      navigation: "Cardiac Arrest",
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
      height: windowWidth * 0.1,
      width: windowWidth * 0.1,
      borderRadius: (windowWidth * 0.1) / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      // left: 5,
    },
    settingIcon: {
      height: windowWidth * 0.055,
      width: windowWidth * 0.055,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: windowWidth * 0.05,
      marginHorizontal: 7.5,
      width: windowWidth * 0.85,
      height: windowWidth * 0.1,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: windowWidth * 0.035,
      marginTop: 30,
      marginBottom: -25,
    },
    searchIcon: {
      height: windowWidth * 0.04,
      width: windowWidth * 0.04,
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: windowWidth * 0.03,
      fontWeight: "600",
      fontSize: windowWidth * 0.045,
      color: "white",
      width: windowWidth * 0.65,
    },
    clearButton: {},
  });

  const renderItem = ({ item }) => (
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
          // height: Dimensions.get("window").height - 580,
          height: "60%",
        }}
      >
        <TouchableOpacity
          style={styles.rectangle}
          onPress={() => navigation.navigate(item.navigation)}
        >
          <Text style={styles.title}>{item.title}</Text>
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
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TouchableOpacity
          style={{ marginTop: 34, marginLeft: 15 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <SimpleLineIcons
            name="settings"
            style={{
              fontSize: 30,
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
      <FlatList
        data={filteredData} // use filteredData here
        style={{ top: 25, marginBottom: 70 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  listContainer: {
    alignItems: "center",
    marginVertical: 15,
    width: Dimensions.get("window").width,
    paddingBottom: 75,
    paddingTop: 10,
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
  eyeview: {
    position: "relative",
    left: Dimensions.get("window").width * 0.009,
  },
  descview: {
    fontSize: 16.5,
    fontWeight: "400",
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 17.5,
  },
});
