import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { openGitPDF } from "../Main";
import TextButton from "../../components/TextButton";

const Terms = ({ navigation }) => {
  const [fontSize, setFontSize] = useState(18);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: "0%" }}>
        <Image
          source={require("../../assets/blackaspa.png")}
          style={styles.Image}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30,
            padding: 25,
            alignSelf: "center",
            marginTop: "-8%",
          }}
        >
          DISCLAIMER
        </Text>
        <Text
          style={{
            color: "black",
            paddingLeft: 25,
            paddingRight: 25,
            fontSize: fontSize,
          }}
        >
          This app is a resource for doctors working under the Asian Society of
          Paediatric Anaesthesiologists. The guidelines presented are based on
          department and international practice guidelines. They are not meant
          to be comprehensive and may not be all inclusive. The use of these
          guidelines must be individualized to the patient's needs. {"\n"}The
          authors of each chapter have ensured that the information is current
          and correct at the time of writing. Asian Society of Paediatric
          Anaesthesiologists does not assume responsibility for the correctness,
          sufficiency or completeness of such information or recommendations.
          The user is advised to check drug dosages and protocols carefully and
          refer to the latest updates posted by the relevant anesthesia bodies.
        </Text>
        <View style={styles.linebreak}></View>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30,
            padding: 25,
            alignSelf: "center",
            marginTop: "1%",
          }}
        >
          Preface
        </Text>
        <Text
          style={{
            color: "black",
            paddingLeft: 25,
            paddingRight: 25,
            fontSize: fontSize,
          }}
        >
          Asian Society of Paediatric Anaesthesia (ASPA) is about sharing.
          {"\n"}
          The ASPA app is created with the vision to share knowledge and
          practical tips on perioperative management of children in Asia.
          {"\n"}
          There may be differences in resources and workflow but the broad
          principles will be similar in all countries.
          {"\n"}
          We hope this app will help to provide better, safer care for all the
          children.
          {"\n"}
          {"\n"}~
          <Text
            style={{
              color: "black",
              paddingLeft: 25,
              paddingRight: 25,
              fontSize: fontSize,
              fontStyle: "italic",
            }}
          >
            Agnes Ng
          </Text>
        </Text>
        <Text
          style={{
            padding: 25,
            color: "black",
            fontWeight: "bold",
            marginTop: "5%",
          }}
        >
          2024 © Caleb Han, Aathithya Jegatheesan, Ted Goh, Arth Aggarwal,
          Darryan Lim
        </Text>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => navigation.navigate("Main")}
        >
          <TextButton
            title="Accept"
            width={Dimensions.get("window").width * 0.46153846}
            height={Dimensions.get("window").height * 0.06812796}
            bgHex="#72A8DA"
            contentHex={"white"}
            borderColor={"transparent"}
            borderWidth={1}
            borderRadius={
              Dimensions.get("window").height * 0.06812796 * 0.30434783
            }
            fontWeight={"700"}
            textSize={
              Platform.isPad
                ? Dimensions.get("window").width * 0.46153846 * 0.08
                : Dimensions.get("window").width * 0.46153846 * 0.10555556
            }
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  Image: {
    width: "90%",
    alignSelf: "center",
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: "7.5%",
    marginHorizontal: 25,
  },
});

export default Terms;
