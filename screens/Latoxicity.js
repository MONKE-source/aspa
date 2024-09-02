import React, { useState } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function LA() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "STOP INJECTING LA", completed: false },
    { id: 2, text: "Call for HELP", completed: false },
    {
      id: 3,
      text: "Maintain & secure AIRWAY (hyperventilation useful to ↑ plasma PH)",
      completed: false,
    },
    { id: 4, text: "Give 100% OXYGEN", completed: false },
    { id: 5, text: "Establish IV access", completed: false },
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
            style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
          >
            LA Toxicity
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
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
            ]}
          >
            Signs
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
          >
            Sudden altertaion in mental status: {"\n"}
            {"\t"} 1. Severe Agitation {"\n"}
            {"\t"} 2. loss of consciousness {"\n"}
            Cardiovascular Collapse: {"\n"}
            {"\t"} 1. sinus bradycardia {"\n"}
            {"\t"} 2. conduction block {"\n"}
            {"\t"} 3. ventricular Tachyarrhythmias {"\n"}
            {"\t"} 4. Asystole {"\n"}
          </Text>
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
    height: "100%",
    paddingBottom: "100",
  },
  title: {
    fontSize: 30,
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
    borderColor: useDarkMode ? "#D3D3D3" : "black",
  },
  tick: {
    fontSize: 20,
    color: "green",
  },
  checklistText: {
    flex: 1,
    fontSize: 18,
  },
});
