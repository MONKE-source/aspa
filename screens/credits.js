import React from "react";
import { ScrollView, Text, StyleSheet, Button, View } from "react-native";
import { useDarkMode } from "../components/DarkModeContext";

const AcknowledgementsScreen = () => {
  const { isDarkMode } = useDarkMode();

  const handlePress = () => {
    console.log(isDarkMode);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <Text style={styles.title}>Acknowledgement</Text>
      <Text
        style={([styles.content], { color: isDarkMode ? "white" : "black" })}
      >
        Special thanks to those who contributed to the content and creation of
        the “ASPA App”
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
      >
        KKH Department of Paediatric Anaesthesia
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Bong, Chooi Looi
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Davies, Lucy
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Fabila, Teddy
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Lee, Shu Ying
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Lim, Evangeline
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Lim, Serene
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        A/Prof Lim, Suan Ling
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Long, Melody
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        A/Prof Ng, Agnes
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Satish, Reddy
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Shahani, JM
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Siow, Yew Nam
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Tan, Angela
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Tan, Josephine
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Tan, Tracy
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Tham, Shu Qi
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Wijeweera, Olivia
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Yeo, Angela
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
      >
        Asian Society of Paediatric Anaesthesiologists
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Jacob, Rebecca
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Ponde, Vrushali
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Yuen, Vivian
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Naik, Vibhavari
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Khan, Fauzia
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Lim, Felicia
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Nair, Usha
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Dr Ramian, Andi AdeWijaya
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
      >
        School of Science and Technology, Singapore
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Aathithya, Jegatheesan
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Arth, Aggarwal
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Goh, Min Wen Ted
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Han, Jeong Seu Caleb
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Lim, Yuan Sheng Darryan
      </Text>
      <Text style={[styles.content, { color: isDarkMode ? "white" : "black" }]}>
        Yeo, Aurelius
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3366ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default AcknowledgementsScreen;
