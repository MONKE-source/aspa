import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

function TopBar({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Platform.isPad || (Platform.OS === "android" && Math.min(width, height) >= 600);

  const barSize = isLandscape
    ? Math.min(width * 0.06, 50)
    : (isTablet ? width * 0.085 : width * 0.1);
  const searchWidth = isLandscape
    ? Math.min(width * 0.65, 600)
    : width * 0.85;
  const searchHeight = isLandscape
    ? Math.min(width * 0.06, 50)
    : (isTablet ? width * 0.085 : width * 0.1);

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: barSize,
      width: barSize,
      borderRadius: barSize / 2,
      overflow: "hidden",
      backgroundColor: "rgb(49, 49, 53)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
    },
    settingIcon: {
      height: isTablet ? "52.5%" : barSize * 0.55,
      width: isTablet ? "52.5%" : barSize * 0.55,
      tintColor: "#EAEAEB",
    },
    searchContainer: {
      backgroundColor: "rgb(49, 49, 53)",
      borderRadius: searchHeight / 2,
      marginHorizontal: 7.5,
      width: searchWidth,
      height: searchHeight,
      flexDirection: "row",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: width * 0.035,
    },
    searchIcon: {
      height: isTablet ? width * 0.03 : Math.min(width * 0.04, 20),
      width: isTablet ? width * 0.03 : Math.min(width * 0.04, 20),
      tintColor: "#818188",
    },
    searchInput: {
      paddingHorizontal: width * 0.03,
      fontWeight: "600",
      fontSize: isLandscape
        ? Math.min(width * 0.025, 18)
        : (isTablet ? width * 0.034 : width * 0.045),
      color: "white",
      width: "100%",
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: width,
        marginTop: 5,
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <TouchableOpacity
        style={dynamicStyles.settingsView}
        onPress={() => navigation.navigate("")}
      >
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
          allowFontScaling={false}
        />
      </View>
    </View>
  );
}

export default TopBar;
