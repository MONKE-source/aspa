import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useDarkMode } from "../components/DarkModeContext";
import useResponsive from "../components/useResponsive";

const acknowledgments = [
  {
    title: "KKH Department of Paediatric Anaesthesia",
    names: [
      "Dr Bong, Chooi Looi",
      "Dr Davies, Lucy",
      "Dr Fabila, Teddy",
      "Dr Lee, Shu Ying",
      "Dr Lim, Evangeline",
      "Dr Lim, Serene",
      "A/Prof Lim, Suan Ling",
      "Dr Long, Melody",
      "A/Prof Ng, Agnes",
      "Dr Satish, Reddy",
      "Dr Shahani, JM",
      "Dr Siow, Yew Nam",
      "Dr Tan, Angela",
      "Dr Tan, Josephine",
      "Dr Tan, Tracy",
      "Dr Tham, Shu Qi",
      "Dr Wijeweera, Olivia",
      "Dr Yeo, Angela",
    ],
  },
  {
    title: "Asian Society of Paediatric Anaesthesiologists",
    names: [
      "Dr Jacob, Rebecca",
      "Dr Ponde, Vrushali",
      "Dr Yuen, Vivian",
      "Dr Naik, Vibhavari",
      "Dr Khan, Fauzia",
      "Dr Lim, Felicia",
      "Dr Nair, Usha",
      "Dr Ramian, Andi AdeWijaya",
    ],
  },
  {
    title: "School of Science and Technology, Singapore",
    names: [
      "Aathithya, Jegatheesan",
      "Arth, Aggarwal",
      "Goh, Min Wen Ted",
      "Han, Jeong Seu Caleb",
      "Lim, Yuan Sheng Darryan",
      "Yeo, Aurelius",
    ],
  },
];

const AcknowledgementsScreen = () => {
  const { isDarkMode } = useDarkMode();
  const { width, height, isLandscape, isTablet, ms, fs } = useResponsive();
  const textColor = isDarkMode ? "white" : "black";
  const backgroundColor = isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB";

  const renderHeader = () => (
    <View>
      <Text style={styles.title} allowFontScaling={false}>
        Acknowledgement
      </Text>
      <Text
        style={[styles.content, { color: textColor }]}
        allowFontScaling={false}
      >
        Special thanks to those who contributed to the content and creation of
        the “ASPA App”
      </Text>
    </View>
  );

  const renderAcknowledgment = ({ item }) => (
    <View>
      <Text
        style={[styles.subTitle, { color: textColor }]}
        allowFontScaling={false}
      >
        {item.title}
      </Text>
      {item.names.map((name, index) => (
        <Text
          key={index}
          style={[styles.content, { color: textColor }]}
          allowFontScaling={false}
        >
          {name}
        </Text>
      ))}
    </View>
  );

  const renderFooter = () => (
    <Text
      style={{
        color: textColor,
        fontSize: isTablet ? ms(17.5, 0.4) : 17.5,
        fontWeight: "500",
        marginTop: 15,
        marginBottom: 5,
      }}
      allowFontScaling={false}
    >
      All resources and medical information in this application were provided by
      doctors from KKH Department of Paediatric Anaesthesia.
    </Text>
  );

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <FlatList
        data={acknowledgments}
        renderItem={renderAcknowledgment}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={[styles.container, {
          backgroundColor,
          maxWidth: isLandscape ? Math.min(width * 0.7, 700) : undefined,
          alignSelf: isLandscape ? "center" : undefined,
          paddingBottom: isLandscape ? 70 : 100,
        }]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: Platform.isPad ? 40 : 24,
    fontWeight: "bold",
    color: "#3366ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: Platform.isPad ? 30 : 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: Platform.isPad ? 24 : 16,
    marginBottom: 5,
  },
});

export default AcknowledgementsScreen;
