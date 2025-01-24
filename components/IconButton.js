import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconButton({
  bgHex,
  title,
  iconPath,
  contentHex,
  borderColor,
  borderWidth,
  size,
  textSize,
}) {
  return (
    <View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: bgHex,
          borderColor: borderColor,
          borderWidth: borderWidth,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={[styles.buttonText, { color: contentHex, fontSize: textSize }]}
      >
        {title}
      </Text>
      {/* <MaterialCommunityIcons name={iconPath} color={contentHex} size={size} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 17.5,
    width: Dimensions.get("window").width * 0.43,
    height: Dimensions.get("window").height * 0.06516588,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default IconButton;
