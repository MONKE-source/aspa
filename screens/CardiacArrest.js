import React, { useState } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import Collapsible from "react-native-collapsible";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";

export default function CardiacArrest({ navigation }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { width, height } = useWindowDimensions();
  const shortDim = Math.min(width, height);
  const isTablet = Platform.isPad || (Platform.OS === "android" && shortDim >= 600);
  const scaleFactor = 1 + (shortDim / 375 - 1) * 0.3;
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Check patient's responsiveness", completed: false },
    { id: 2, text: "Call emergency services", completed: false },
    { id: 3, text: "Open the patient's airway", completed: false },
    // Add more checklist items here
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: isDarkMode ? "white" : "black", fontSize: 25 * scaleFactor }]}
            allowFontScaling={false}
          >
            Cardiac Arrest
          </Text>
          {checklistItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleToggleComplete(item.id)}
              style={styles.checklistItem}
            >
              <View style={styles.checkbox}>
                {item.completed && <Text style={styles.tick}>&#x2713;</Text>}
              </View>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? "white" : "black",
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
                allowFontScaling={false}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 50,
    paddingBottom: 100,
  },
  title: {
    fontSize: Platform.isPad ? 30 : 25,
    marginBottom: 20,
    fontWeight: "bold",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D3D3D3",
  },
  tick: {
    fontSize: 20,
    color: "green",
  },
  checklistText: {
    flex: 1,
    fontSize: Platform.isPad ? 25 : 18,
  },
});
