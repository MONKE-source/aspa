import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

function TopBar({navigation}) {
  const windowWidth = useWindowDimensions().width;

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      width: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      borderRadius: (windowWidth * 0.1) / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
    },
    settingIcon: {
      height: Platform.isPad ? "52.5%" : windowWidth * 0.055,
      width: Platform.isPad ? "52.5%" : windowWidth * 0.055,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: windowWidth * 0.05,
      marginHorizontal: 7.5,
      width: windowWidth * 0.85,
      height: Platform.isPad ? windowWidth * 0.085 : windowWidth * 0.1,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: windowWidth * 0.035,
    },
    searchIcon: {
      height: Platform.isPad ? windowWidth * 0.03 : windowWidth * 0.04,
      width: Platform.isPad ? windowWidth * 0.03 : windowWidth * 0.04,
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: windowWidth * 0.03,
      fontWeight: "600",
      fontSize: Platform.isPad ? windowWidth * 0.034 : windowWidth * 0.045,
      color: "white",
      width: "100%",
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: Dimensions.get("window").width,
        marginTop: 5,
        alignItems: "center",
        alignContent: "center"
      }}
    >
      <TouchableOpacity style={dynamicStyles.settingsView} onPress={() => navigation.navigate("")}>
        <Image
          source={require("../assets/setting.png")}
          style={dynamicStyles.settingIcon}
        />
      </TouchableOpacity>
      <View style={dynamicStyles.searchContainer}>
        <Image
          source={require("../assets/search.png")}
          style={dynamicStyles.searchIcon}
        />
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#818188"
        />
      </View>
    </View>
  );
}

export default TopBar;
