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
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDarkMode } from "../../components/DarkModeContext";
import TextInputButton from "../../components/TextInputButton";
import TextButton from "../../components/TextButton";
import IconButton from "../../components/IconButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
