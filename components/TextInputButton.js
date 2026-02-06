import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Platform,
} from "react-native";
import { DarkModeContext, useDarkMode } from "../components/DarkModeContext";

function TextInputButton({
  title,
  unit,
  height,
  width,
  backgroundColor,
  store,
  action,
}) {
  const inputRef = useRef(null);
  const { width: dimW, height: dimH } = useWindowDimensions();
  const shortDim = Math.min(dimW, dimH);
  const fontScale = 1 + (shortDim / 375 - 1) * 0.3;
  const handleInputChange = (text) => {
    action(text);
  };

  const handleTextInputBlur = () => {
    Keyboard.dismiss();
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <TouchableWithoutFeedback onPress={handleTextInputBlur}>
      <View style={styles.buttonContainer}>
        <Text
          style={[styles.title, { color: isDarkMode ? "white" : "black", fontSize: 18 * fontScale }]}
          allowFontScaling={false}
        >
          {title}
        </Text>
        <View style={styles.buttonRow}>
          <TextInput
            ref={inputRef}
            style={[
              styles.inputField,
              {
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                fontSize: 20 * fontScale,
              },
            ]}
            placeholder="0.0"
            placeholderTextColor="#818188"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={handleTextInputBlur}
            onChangeText={handleInputChange}
            value={store}
            allowFontScaling={false}
          />
          <Text
            style={[styles.unit, { color: isDarkMode ? "white" : "black", fontSize: 18 * fontScale }]}
            allowFontScaling={false}
          >
            {unit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  inputField: {
    color: "white",
    borderRadius: 13,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "500",
    marginRight: 7.5,
  },
  unit: {
    fontWeight: "500",
    fontSize: 18,
  },
});

export default TextInputButton;
