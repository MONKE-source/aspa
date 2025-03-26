import React from "react";
import { ScrollView, Text, StyleSheet, Button, View } from "react-native";
import { useDarkMode } from "../components/DarkModeContext";

const AcknowledgementsScreen = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB" },
      ]}
    >
      <Text style={styles.title} allowFontScaling={false}>
        Acknowledgement
      </Text>
      <Text
        style={([styles.content], { color: isDarkMode ? "white" : "black" })}
        allowFontScaling={false}
      >
        Special thanks to those who contributed to the content and creation of
        the “ASPA App”
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        KKH Department of Paediatric Anaesthesia
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Bong, Chooi Looi
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Davies, Lucy
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Fabila, Teddy
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Lee, Shu Ying
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Lim, Evangeline
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Lim, Serene
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        A/Prof Lim, Suan Ling
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Long, Melody
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        A/Prof Ng, Agnes
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Satish, Reddy
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Shahani, JM
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Siow, Yew Nam
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Tan, Angela
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Tan, Josephine
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Tan, Tracy
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Tham, Shu Qi
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Wijeweera, Olivia
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Yeo, Angela
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Asian Society of Paediatric Anaesthesiologists
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Jacob, Rebecca
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Ponde, Vrushali
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Yuen, Vivian
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Naik, Vibhavari
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Khan, Fauzia
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Lim, Felicia
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Nair, Usha
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Dr Ramian, Andi AdeWijaya
      </Text>
      <Text
        style={[styles.subTitle, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        School of Science and Technology, Singapore
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Aathithya, Jegatheesan
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Arth, Aggarwal
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Goh, Min Wen Ted
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Han, Jeong Seu Caleb
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
        Lim, Yuan Sheng Darryan
      </Text>
      <Text
        style={[styles.content, { color: isDarkMode ? "white" : "black" }]}
        allowFontScaling={false}
      >
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
