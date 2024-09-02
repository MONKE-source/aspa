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

export default function Hypertermina() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Call for help", completed: false },
    {
      id: 2,
      text: "STOP all triggers (turn OFF VOLATILE anaesthetics)",
      completed: false,
    },
    { id: 3, text: "Get MH Box with Dantrolene", completed: false },
    { id: 4, text: "Notify surgeon", completed: false },
    { id: 5, text: "Install clean breathing circuit", completed: false },
    { id: 6, text: "Hyperventilate with 100% oxygen", completed: false },
    {
      id: 7,
      text: "Maintain anaesthesia with IV anaesthetics",
      completed: false,
    },
    {
      id: 8,
      text: "Muscle relaxation with Non-Depolarising neuromuscular blockers",
      completed: false,
    },
    { id: 9, text: "Finish/abandon surgery ASAP", completed: false },
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
            style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
          >
            MALIGNANT HYPERTHERMIA
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
            Check Box
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
                textDecorationLine: "none",
              },
            ]}
          >
            MH BOX- ORANGE box (containing essential drugs & treatment
            algorithm) kept in: {`\n`}
            {"\t"}- MOT: check with your instituition {`\n`}
            {"\t"}- DSOT- check with your own instituition {`\n`}
            {"\n"}
            Please inform AU nurse if MH box has been opened and used.{`\n`}
            Please return box to respective OT locations if not used.
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "3%",
              },
            ]}
          >
            Recognition
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
          >
            Previous uneventful GA DOES NOT rule out MH
            {"\n"}
            {"\n"}
            Clinical:{"\n"}
            {"\t"}1. Unexplained increase in ETCO2 {"\n"}
            {"\t"}2. Unexplained Tachycardia {"\n"}
            {"\t"}3. Unexplained increase in Oxygen requirements {"\n"}
            {"\t"}4. Trunk or limb rigidity {"\n"}
            {"\t"}5. Masseter spasm (Trismus) {"\n"}
            {"\t"}6. Unstable or rising blood pressure {"\n"}
            {"\t"}7. Respiratory & Metabloic Acidosis {"\n"}
            {"\t"}8. Arrhythmias {"\n"}
            {"\t"}9. Temperature changes are a LATE sign
            {"\n"}
            {"\n"}
            Biochemical:{"\n"}
            {"\t"}1. increased PaCO2 {"\n"}
            {"\t"}2. decreased PH {"\n"}
            {"\t"}3. increased serum K {"\n"}
            {"\t"}4. decreased PaO2 {"\n"}
            {"\t"}5. increased creatine kinase {"\n"}
            {"\t"}6. myoglobinuria {"\n"}
          </Text>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "white" : "black", marginBottom: "1%" },
            ]}
          >
            Treatment{" "}
          </Text>
          <Text
            style={[
              styles.checklistText,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Dantrolene
            {"\n"}
            1. COOL patient if temp {">"} 39 degrees celsius{"\n"}
            2.Cold IV NS,ice saline lavage, surface ice packs{"\n"}
            3.Stop cooling when temp 38 degrees celsius and falling
            {"\n"}
            {"\n"}
            Treat HYPERKALAEMIA{"\n"}
            1. Treat ARRHYTHMIAS{"\n"}
            {"\t"} - Avoid Calcium channel blockers {"\n"}
            {"\t"} - can use Amiodarone {"\n"}
            2. Treat METABOLIC ACIDOSIS {"\n"}
            {"\t"} - Hyperventilate {"\n"}
            {"\t"} - NaHCO3 {"\n"}
            3. Treat MYOGLOBINURIA{"\n"}
            {"\t"} - forced alkaline diuresis (mannitol/frusemide+NaHCO3) {"\n"}
            {"\t"} - may require renal replacement therapy later {"\n"}
            4.Treat DIC (if present) {"\n"}
            {"\t"} - FFP, Cryoppt, Platelets {"\n"}
            {"\n"}
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "0%",
                marginTop: "-5%",
              },
            ]}
          >
            Monitor
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "0%",
              },
            ]}
          >
            1. Core & Peripheral TEMPERATURE{"\n"}
            2. ECG{"\n"}
            3. Invasive BP{"\n"}
            4. CVP{"\n"}
            5. ETCO2/ PaCO2{"\n"}
            6. SpO2/ PaO2{"\n"}
            7. serum CREATINE KINASE{"\n"}
            8. serum K{"\n"}
            9. coagulation profile
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? "white" : "black",
                marginBottom: "0%",
                marginTop: "5%",
              },
            ]}
          >
            DIFFERENTIAL DIAGNOSIS
          </Text>
          <Text
            style={[
              styles.checklistText,
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
          >
            1. Inadequate anaesthesia or analgesia{"\n"}
            2. Inappropriate breathing circuit, fresh gas flow or ventilation
            {"\n"}
            3. Infection or sepsis{"\n"}
            4. Tourniquet ischaemia{"\n"}
            5. Anaphylaxis{"\n"}
            5. Pheochromocytoma{"\n"}
            6. Thyroid storm
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
