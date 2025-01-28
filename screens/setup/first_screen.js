import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { useDarkMode } from "../../components/DarkModeContext";
import TextInputButton from "../../components/TextInputButton";
import TextButton from "../../components/TextButton";
import IconButton from "../../components/IconButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#b3e5fc", "#4fc3f7"]} style={styles.container}>
      <Text style={styles.subText}>Welcome to</Text>
      <Text style={styles.appNam}>ASPA App</Text>
      <TouchableOpacity>
        <TextButton
          title="Continue"
          width={Dimensions.get("window").width * 0.56153846}
          height={Dimensions.get("window").height * 0.06812796}
          bgHex="transparent"
          contentHex={"black"}
          borderRadius={
            Dimensions.get("window").height * 0.06812796 * 0.30434783
          }
          borderColor={"black"}
          borderWidth={1}
          fontWeight={"700"}
          textSize={
            Platform.isPad
              ? Dimensions.get("window").width * 0.46153846 * 0.08
              : Dimensions.get("window").width * 0.46153846 * 0.10555556
          }
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  appNam: {
    fontSize: 50,
    fontWeight: "600",
    color: "black",
    marginTop: "20%",
    marginBottom: "70%",
  },
});
