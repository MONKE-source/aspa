import React, { useState, useContext } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import { WeightContext } from "../components/WeightContext";
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

export default function Basiclifesupport() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { weight } = useContext(WeightContext);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const shortDim = Math.min(width, height);
  const isTablet =
    Platform.isPad || (Platform.OS === "android" && shortDim >= 600);
  const scaleFactor = 1 + (shortDim / 375 - 1) * 0.3;

  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Open airway", completed: false },
    { id: 2, text: "Check for spontaneous breathing", completed: false },
    {
      id: 3,
      text: "Check pulse (femoral & brachial preferable in children) for not more than 10 seconds",
      completed: false,
    },
    {
      id: 4,
      text: "Lone rescuer: complete 2 minutes (5 cycles) of CPR before calling EMS",
      completed: false,
    },
    {
      id: 5,
      text: "Send someone to call EMS immediately if not alone",
      completed: false,
    },
    // Add more checklist items here
  ]);

  const [nonShockableChecklist, setNonShockableChecklist] = useState([
    { id: 1, text: "Start CPR immediately", completed: false },
    { id: 2, text: "Place backboard behind patient", completed: false },
    { id: 3, text: "Aim for etCO2 > 15mmHG", completed: false },
    {
      id: 4,
      text: "Push FAST: at least 100/ minute\nAllow FULL RECOIL",
      completed: false,
    },
    { id: 5, text: "Push HARD: 1/3 AP diameter", completed: false },
    { id: 6, text: "Recheck pulse every 2 minutes", completed: false },
    {
      id: 7,
      text: "Minimise interruptions to chest compressions",
      completed: false,
    },
  ]);

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleToggleNonShockable = (itemId) => {
    setNonShockableChecklist((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);

  // Calculate weight-based drug doses
  const calculateAdrenalineDose = () => {
    if (!weight)
      return { micro: "N/A", ml: "N/A", ettMicro: "N/A", ettMl: "N/A" };
    const microDose = Math.round(weight * 10);
    const mlDose = (weight * 0.1).toFixed(2);
    const ettMicroDose = Math.round(weight * 100);
    const ettMlDose = (weight * 1).toFixed(1);
    return {
      micro: microDose,
      ml: mlDose,
      ettMicro: ettMicroDose,
      ettMl: ettMlDose,
    };
  };

  const calculateShockDose = () => {
    if (!weight) return "N/A";
    return Math.round(weight * 4);
  };

  const adrenalineDose = calculateAdrenalineDose();
  const shockDose = calculateShockDose();
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flex: 1,
      }}
    >
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed1(!collapsed1)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  fontSize: 23 * scaleFactor,
                },
              ]}
              allowFontScaling={false}
            >
              Basic Life Support Checklist
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25 * scaleFactor,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed1 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed1}>
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
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => setCollapsed2(!collapsed2)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  fontSize: 23 * scaleFactor,
                },
              ]}
              allowFontScaling={false}
            >
              Rescue Breathing
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25 * scaleFactor,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed2 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed2} style={{}}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: Platform.isPad ? 30 : 25,
                  color: isDarkMode ? "white" : "black",
                },
              ]}
              allowFontScaling={false}
            >
              1. One breath 1 breath every 3 seconds
              {"\n"}
              {"\t"} - breathe a thousand, 2 a thousand, 3 a thousand then
              repeat cycle
            </Text>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: Platform.isPad ? 30 : 25,

                  color: isDarkMode ? "white" : "black",
                  marginTop: "2%",
                },
              ]}
              allowFontScaling={false}
            >
              2. Recheck pulse every 2 minutes
            </Text>
          </Collapsible>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              marginVertical: "3%",
            }}
            onPress={() => setCollapsed3(!collapsed3)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  marginTop: "1%",
                  marginBottom: "1%",
                  fontSize: 23 * scaleFactor,
                },
              ]}
              allowFontScaling={false}
            >
              Cardiopulmonary {"\n"}Resuscitation
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25 * scaleFactor,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed3 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed3}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: Platform.isPad ? 30 : 25,

                  color: isDarkMode ? "white" : "black",
                },
              ]}
              allowFontScaling={false}
            >
              1. SINGLE RESCUER: 30 compressions : 2 breaths
              {"\n"}
              2. HEALTHCARE PROVIDER, TEAM RESUSCITATION:
              {"\n"}
              {"\t"}a. No advanced airway- 15 compressions : 2 breaths
              {"\n"}
              {"\t"}b. Advanced airway (LMA/ ETT)- provide 100 compressions & 10
              ventilations per minute
              {"\n"}
              {"\t"}c. Push hard push fast
              {"\n"}
              {"\t"}d. Minimise interruptions to compressions
              {"\n"}
              {"\t"}e. Rotate roles to avoid fatigue
              {"\n"}
              {"\t"}f. Recheck pulse every 2 minutes
            </Text>
          </Collapsible>

          {/* Non-Shockable Cardiac Arrest */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              marginVertical: "3%",
            }}
            onPress={() => setCollapsed4(!collapsed4)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  marginTop: "1%",
                  marginBottom: "1%",
                  fontSize: 23 * scaleFactor,
                },
              ]}
              allowFontScaling={false}
            >
              Non-Shockable {"\n"}(Asystole/PEA)
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25 * scaleFactor,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed4 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed4}>
            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                CPR Protocol
              </Text>
              {nonShockableChecklist.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleToggleNonShockable(item.id)}
                  style={styles.checklistItem}
                >
                  <View style={styles.checkbox}>
                    {item.completed && (
                      <Text style={styles.tick}>&#x2713;</Text>
                    )}
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

            <View style={[styles.sectionBox, { marginTop: 15 }]}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                Administering Adrenaline
              </Text>
              <View
                style={[
                  styles.doseBox,
                  { backgroundColor: isDarkMode ? "#1a4d5c" : "#2C7A8F" },
                ]}
              >
                <Text
                  style={[
                    styles.doseTitle,
                    { fontSize: Platform.isPad ? 20 : 16 },
                  ]}
                  allowFontScaling={false}
                >
                  IV / IO: Administer
                </Text>
                <Text
                  style={[
                    styles.doseValue,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  {adrenalineDose.micro} MICROgrams
                </Text>
                <Text
                  style={[
                    styles.doseValue,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  {adrenalineDose.ml}ML 1:10 000
                </Text>
              </View>
              <View
                style={[
                  styles.doseBox,
                  {
                    backgroundColor: isDarkMode ? "#1a4d5c" : "#2C7A8F",
                    marginTop: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.doseTitle,
                    { fontSize: Platform.isPad ? 20 : 16 },
                  ]}
                  allowFontScaling={false}
                >
                  ETT: Administer
                </Text>
                <Text
                  style={[
                    styles.doseValue,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  {adrenalineDose.ettMicro} MICROgrams
                </Text>
                <Text
                  style={[
                    styles.doseValue,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  {adrenalineDose.ettMl}ML 1:1000
                </Text>
              </View>
            </View>

            <View style={[styles.sectionBox, { marginTop: 15 }]}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                Exclude H's and T's
              </Text>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? "white" : "black",
                    lineHeight: Platform.isPad ? 30 : 25,
                  },
                ]}
                allowFontScaling={false}
              >
                • HypoVolaemia{"\n"}• Hypoxia{"\n"}• Hydrogen Ion (Acidosis)
                {"\n"}• HypoKalaemia{"\n"}• HypoGlycaemia{"\n"}• HypoThermia
                {"\n"}• Trauma{"\n"}• Toxins{"\n"}• Tamponade{"\n"}• Tension
                Pneumothorax{"\n"}• Thrombosis (Pulmonary or Coronary)
              </Text>
            </View>
          </Collapsible>

          {/* Shockable Cardiac Arrest (Defillibration) */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              marginVertical: "3%",
            }}
            onPress={() => setCollapsed5(!collapsed5)}
          >
            <Text
              style={[
                styles.title,
                {
                  color: isDarkMode ? "white" : "black",
                  marginTop: "1%",
                  marginBottom: "1%",
                  fontSize: 23 * scaleFactor,
                },
              ]}
              allowFontScaling={false}
            >
              Shockable (VF/VT) {"\n"}Defillibration
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25 * scaleFactor,
                color: isDarkMode ? "#F3EDC8" : "black",
                marginLeft: "auto",
                transform: [
                  {
                    rotate: collapsed5 ? "0deg" : "180deg",
                  },
                ],
              }}
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsed5}>
            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.shockTitle,
                  { color: isDarkMode ? "#B8E6F3" : "#1A5F7A" },
                ]}
                allowFontScaling={false}
              >
                1st Shock - 4J/kg
              </Text>
              <View
                style={[
                  styles.doseBox,
                  { backgroundColor: isDarkMode ? "#1a4d5c" : "#2C7A8F" },
                ]}
              >
                <Text
                  style={[
                    styles.doseTitle,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  Administer {shockDose} JOULES
                </Text>
                <Text
                  style={[
                    styles.doseSubtext,
                    { fontSize: Platform.isPad ? 18 : 14 },
                  ]}
                  allowFontScaling={false}
                >
                  (Resume CPR immediately without checking rhythm)
                </Text>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Text
                style={[
                  styles.arrowText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                ↓
              </Text>
            </View>

            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.shockTitle,
                  { color: isDarkMode ? "#B8E6F3" : "#1A5F7A" },
                ]}
                allowFontScaling={false}
              >
                CPR : 1 - 2 minutes
              </Text>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? "white" : "black",
                    lineHeight: Platform.isPad ? 30 : 25,
                  },
                ]}
                allowFontScaling={false}
              >
                (Minimise time between shock & CPR){"\n"}
                (Check rhythm → VF/VT : SHOCK immediately after chest
                compression)
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              <Text
                style={[
                  styles.arrowText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                ↓
              </Text>
            </View>

            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.shockTitle,
                  { color: isDarkMode ? "#B8E6F3" : "#1A5F7A" },
                ]}
                allowFontScaling={false}
              >
                2nd Shock - 4J/kg
              </Text>
              <View
                style={[
                  styles.doseBox,
                  { backgroundColor: isDarkMode ? "#1a4d5c" : "#2C7A8F" },
                ]}
              >
                <Text
                  style={[
                    styles.doseTitle,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  Administer {shockDose} JOULES
                </Text>
                <Text
                  style={[
                    styles.doseSubtext,
                    { fontSize: Platform.isPad ? 18 : 14 },
                  ]}
                  allowFontScaling={false}
                >
                  (Resume CPR immediately without checking rhythm)
                </Text>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Text
                style={[
                  styles.arrowText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                ↓
              </Text>
            </View>

            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.shockTitle,
                  { color: isDarkMode ? "#B8E6F3" : "#1A5F7A" },
                ]}
                allowFontScaling={false}
              >
                CPR : 1 - 2 minutes
              </Text>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? "white" : "black",
                    lineHeight: Platform.isPad ? 30 : 25,
                  },
                ]}
                allowFontScaling={false}
              >
                (Minimise time between shock & CPR){"\n"}
                (Check rhythm → VF/VT : SHOCK immediately after chest
                compression)
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              <Text
                style={[
                  styles.arrowText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                ↓
              </Text>
            </View>

            <View style={[styles.sectionBox, { marginTop: 0 }]}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                Adrenaline IO/IV
              </Text>
              <View
                style={[
                  styles.doseBox,
                  { backgroundColor: isDarkMode ? "#1a4d5c" : "#2C7A8F" },
                ]}
              >
                <Text
                  style={[
                    styles.doseTitle,
                    { fontSize: Platform.isPad ? 20 : 16 },
                  ]}
                  allowFontScaling={false}
                >
                  Give {adrenalineDose.micro} MG ({adrenalineDose.micro}{" "}
                  MICROgram/kg)
                </Text>
                <Text
                  style={[
                    styles.doseValue,
                    { fontSize: Platform.isPad ? 22 : 18 },
                  ]}
                  allowFontScaling={false}
                >
                  Give {adrenalineDose.ml} ML (1: 10 000 DILUTION)
                </Text>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Text
                style={[
                  styles.arrowText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                ↓
              </Text>
            </View>

            <View style={styles.sectionBox}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
                allowFontScaling={false}
              >
                Continue Cycle
              </Text>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? "white" : "black",
                    lineHeight: Platform.isPad ? 30 : 25,
                  },
                ]}
                allowFontScaling={false}
              >
                • Continue CPR for 2 minutes{"\n"}• Give Shock (4J/kg){"\n"}•
                Give Adrenaline every 3-5 minutes{"\n"}• Consider Amiodarone
                5mg/kg after 3rd shock{"\n"}• Exclude reversible causes (H's and
                T's)
              </Text>
            </View>
          </Collapsible>
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
    fontSize: Platform.isPad ? 30 : 23,
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
    fontSize: Platform.isPad ? 30 : 20,
    color: "green",
  },
  checklistText: {
    flex: 1,
    fontSize: Platform.isPad ? 24 : 18,
  },
  subText: {
    fontSize: Platform.isPad ? 20 : 14,
    marginLeft: "4%",
  },
  sectionBox: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  sectionTitle: {
    fontSize: Platform.isPad ? 22 : 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shockTitle: {
    fontSize: Platform.isPad ? 24 : 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  doseBox: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  doseTitle: {
    color: "white",
    fontWeight: "600",
    marginBottom: 5,
  },
  doseValue: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 2,
  },
  doseSubtext: {
    color: "white",
    fontStyle: "italic",
    marginTop: 5,
  },
  arrowContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  arrowText: {
    fontSize: Platform.isPad ? 40 : 30,
    fontWeight: "bold",
  },
});
