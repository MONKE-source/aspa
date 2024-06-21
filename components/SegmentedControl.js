import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function SegmentedControl({
  titleArray,
  width,
  height,
  fontSize,
  color1,
  color2,
  optionStore,
  optionUpdate,
}) {
  const [segmentIndex, setSegIndex] = useState(false);
  function update() {
    setSegIndex(!segmentIndex);
    optionUpdate(!optionStore);
    console.log(optionStore);
    console.log(segmentIndex);
    return;
  }
  return (
    <View style={[styles.content, { width: width, height: height }]}>
      <TouchableOpacity
        style={[
          styles.container1,
          { backgroundColor: segmentIndex === false ? color2 : color1 },
        ]}
        activeOpacity={0.8}
        onPress={() => update()}
      >
        <Text style={[styles.segmentStyle, { fontSize: fontSize }]}>
          {titleArray[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.container2,
          { backgroundColor: segmentIndex === false ? color1 : color2 },
        ]}
        activeOpacity={0.8}
        onPress={() => update()}
      >
        <Text style={[styles.segmentStyle, { fontSize: fontSize }]}>
          {titleArray[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    marginTop: 30,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: "50%",
    height: "100%",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    width: "50%",
    height: "100%",
  },
  segmentStyle: {
    fontWeight: "600",
    color: "#fff",
  },
});

export default SegmentedControl;
