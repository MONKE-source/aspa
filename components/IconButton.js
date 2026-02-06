import React from "react";
import { View, StyleSheet, Text, useWindowDimensions, Platform } from "react-native";

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
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Platform.isPad || (Platform.OS === "android" && Math.min(width, height) >= 600);

  const btnWidth = isTablet
    ? Math.max(width * 0.3, 280)
    : isLandscape
      ? Math.min(width * 0.3, 280)
      : width * 0.43;
  const btnHeight = isTablet
    ? Math.max(height * 0.06, 65)
    : isLandscape
      ? Math.min(height * 0.1, 56)
      : height * 0.06516588;

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
          width: btnWidth,
          height: btnHeight,
        },
      ]}
    >
      <Text
        style={[styles.buttonText, { color: contentHex, fontSize: textSize }]}
        allowFontScaling={false}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 17.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default IconButton;
