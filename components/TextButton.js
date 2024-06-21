import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function TextButton({
  title,
  width,
  height,
  bgHex,
  contentHex,
  borderRadius,
  fontWeight,
  textSize,
  borderColor,
  borderWidth,
}) {
  // Calculate dynamic styles based on the screen width
  const dynamicStyles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  });

  return (
    <View
      style={[
        dynamicStyles.buttonContainer,
        {
          width: width,
          height: height,
          backgroundColor: bgHex,
          borderRadius: borderRadius,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}>
      <Text
        style={{color: contentHex, fontWeight: fontWeight, fontSize: textSize}}>
        {title}
      </Text>
    </View>
  );
}

export default TextButton;
