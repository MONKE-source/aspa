import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useDarkMode } from "../components/DarkModeContext";

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/aspaImage.png")}
        style={styles.Image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: "100%",
  },
});
