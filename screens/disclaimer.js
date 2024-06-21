import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Switch, StyleSheet, Text, View, Dimensions, Pressable,onPress } from "react-native";
import TextInputButton from "../components/TextInputButton";

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Disclaimer</Text>
      </Pressable>

      {/* Add some margin between the buttons */}
      <Pressable style={[styles.button, { marginTop: 20 }]} onPress={onPress}>
        <Text style={styles.text}>More Info</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(30, 30, 32)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: 'black',
    width: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
