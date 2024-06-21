import React, {useState, useEffect} from 'react';
// import { StatusBar } from "expo-status-bar";
import {SafeAreaView, Switch, StyleSheet, Text, View} from 'react-native';
// import AsyncStorage/ from "@react-native-async-storage/async-storage";
import {useDarkMode} from '../components/DarkModeContext';
export default function Settings() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  // useEffect(() => {
  //   // Retrieve the stored isDarkMode value from AsyncStorage when the component mounts
  //   retrieveDarkMode();
  // }, []);

  // useEffect(() => {
  //   // Save the current isDarkMode value to AsyncStorage whenever it changes
  //   storeDarkMode();
  // }, [isDarkMode]);

  // const retrieveDarkMode = async () => {
  //   try {
  //     const darkModeValue = await AsyncStorage.getItem("isDarkMode");
  //     setIsDarkMode(JSON.parse(darkModeValue) || false);
  //   } catch (error) {
  //     console.error("Error retrieving dark mode value:", error);
  //   }
  // };

  // const storeDarkMode = async () => {
  //   try {
  //     await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  //   } catch (error) {
  //     console.error("Error storing dark mode value:", error);
  //   }
  // };

  // const toggleDarkMode = () => {
  //   setIsDarkMode((prevMode) => !prevMode);
  // };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkMode : styles.lightMode,
      ]}>
      <Text
        style={[
          styles.settingsTitle,
          isDarkMode ? styles.darkText : styles.lightText,
        ]}>
        Settings
      </Text>
      <View style={styles.toggleContainer}>
        <Text
          style={[
            styles.label,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{false: 'red', true: 'green'}}
          thumbColor="white"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(30, 30, 32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  darkMode: {
    backgroundColor: 'rgb(30, 30, 32)',
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});
