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
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const imageWidth = Dimensions.get("window").width * 0.63;
const imageLength = Dimensions.get("window").height * 0.35;
const gapLength = Dimensions.get("window").width * 0.25;

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/ASPA_logo.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={[styles.subText, { marginTop: "2.25%", fontSize: 20 }]}>
          Welcome to ASPA App!
        </Text>
        <Text
          style={[styles.subText, { marginTop: "1.5%", fontWeight: "400" }]}
        >
          Your all-in-one guide to help you through {"\n"}paediatric
          anaesthesia!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Terms")}
      >
        <Text style={[styles.subText, { color: "#FFF" }]}>Proceed</Text>
        <View style={styles.iconContainer}>
          <AntDesign name="right" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EFEFF0",
    justifyContent: "center",
  },
  subText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    padding: 5,
  },
  image: {
    height: imageLength,
    width: imageWidth,
  },
  nextButton: {
    display: "flex",
    flexDirection: "row",
    paddingRight: "4%",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: gapLength,
    borderRadius: 300,
    backgroundColor: "#5092CD",
    width: "86%",
    marginTop: "20%",
    top: "25%",
    height: "7%",
  },
  iconContainer: {
    height: "50%",
    justifyContent: "center",
  },
});
