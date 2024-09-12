import React, { useState } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import Collapsible from "react-native-collapsible";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Basiclifesupport() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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

  const handleToggleComplete = (itemId) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "rgb(30, 30, 32)" : "#F2EDEB",
        flexGrow: 1,
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
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              Basic Life Support Checklist
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
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
                },
              ]}
            >
              Rescue Breathing
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
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
          <Collapsible collapsed={collapsed2}>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                },
              ]}
            >
              1. One breath 1 breath every 3 seconds
              {"\n"}
              {"\t"} - breathe a thousand, 2 a thousand, 3 a {"\t"} thousand
              then repeat cycle
            </Text>
            <Text
              style={[
                styles.checklistText,
                {
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                  marginTop: "2%",
                },
              ]}
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
                },
              ]}
            >
              Cardiopulmonary Resuscitation
            </Text>
            <FontAwesome5
              name="chevron-down"
              style={{
                fontSize: 25,
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
                  lineHeight: 25,
                  color: isDarkMode ? "white" : "black",
                },
              ]}
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
              {"\t"}c. Push Hard Push Fast
              {"\n"}
              {"\t"}d. Minimise interruptions to compressions
              {"\n"}
              {"\t"}e. Rotate roles to avoid fatigue
              {"\n"}
              {"\t"}f. Recheck pulse every 2 minutes
            </Text>
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
  subText: {
    fontSize: 14,
    marginLeft: "4%",
  },
});
