import React, { useState } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Hyper() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Perform ECG immediately when possible", completed: false },
    { id: 2, text: "Review all medications/infusions", completed: false },
    { id: 3, text: "Exclude: Burn or Crush injury", completed: false },
    { id: 4, text: "Exclude: Rhabdomyolysis", completed: false },
    { id: 5, text: "Exclude: Succinylchholine", completed: false },
    { id: 6, text: "Exclude: Malignant Hyperthermia", completed: false },
    { id: 7, text: "Exclude: Renal Failure", completed: false },
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const tableData = [
    {
      range: "5.5 - 6.0",
      initialTreatment:
        "Salbutamol nebuliser (if possible)\nconsider Dextrose/Insulin",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.0:\n→ rpt salbutamol\nstart IV Dextrose/Insulin",
      notImproving: "reevaluate cause\nif K+ > 6, escalate level of Mx",
    },
    {
      range: "6.1 - 6.9",
      initialTreatment:
        "Salbutamol nebuliser (if possible)\nIV Dextrose/Insulin\nconsider NaHCO3 (if PH < 7.2)",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.9:\n→ rpt salbutamol\n→ rpt IV Dextrose/Insulin",
      notImproving: "reevaluate cause\nif K+ > 6.9, escalate level of Mx",
    },
    {
      range: "> 7.0",
      initialTreatment:
        "Calcium Chloride or Calcium Gluconate\nSalbutamol nebuliser (if possible)\nIV Dextrose/Insulin\nconsider NaHCO3 (if PH < 7.2)",
      improving:
        "1. continue monitoring\n2. if K+ still 5.5-6.9:\n→ rpt salbutamol\n→ rpt IV Dextrose/Insulin",
      notImproving:
        "reevaluate cause\nif ECG changes persist:\n→ rpt Calcium\n→ consider CRRT",
    },
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flexGrow: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
          >
            Hyperkalemia
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
            Inclusion Criteria
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
          >
            Term NEONATE ({">"} 1 month age): serum K+ {">"} 6 mmol/L {"\n"}
            Children {">"} 1 month age: serum K+ {">"}5.5 mmol/L
          </Text>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
            ]}
          >
            Exclusion Criteria
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "1%",
              },
            ]}
          >
            Premature Neonates
          </Text>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
            ]}
          >
            Management Algoritihm
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "1%",
              },
            ]}
          >
            Perform ECG immediately when possible {"\n"}
            Review all medications/ infusions {"\n"}
            Exclude: {"\n"}
            {"\t"} - Burn or Crush injury {"\n"}
            {"\t"} - Rhabdomyolysis {"\n"}
            {"\t"} - Succinylchholine {"\n"}
            {"\t"} - Malignant Hyperthermia {"\n"}
            {"\t"} - Renal Failure
          </Text>
          {tableData.map((row, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                borderWidth: 1,
                borderColor: isDarkMode ? "white" : "black",
                borderRadius: 8,
                padding: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  borderBottomWidth: 1,
                  borderColor: isDarkMode ? "white" : "black",
                  paddingBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "25%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  serum K+ (mmol/L)
                </Text>
                <Text
                  style={{
                    width: "25%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {row.range}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "25%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  Initial Treatment
                </Text>
                <Text
                  style={{
                    width: "25%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {row.initialTreatment}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  borderBottomWidth: 1,
                  borderColor: isDarkMode ? "white" : "black",
                  paddingBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "50%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  Review: K+ improving
                </Text>
                <Text
                  style={{
                    width: "50%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {row.improving}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "50%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  Review: K+ NOT improving
                </Text>
                <Text
                  style={{
                    width: "50%",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {row.notImproving}
                </Text>
              </View>
            </View>
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
