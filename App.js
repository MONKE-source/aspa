import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { StatusBar } from "expo-status-bar";
import CalcScreen from "./screens/CalcScreen";
import Main from "./screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import CrisisNavigator from "./screens/Crisis";
import {
  DarkModeProvider,
  DarkModeContext,
  useDarkMode,
} from "./components/DarkModeContext";
import Info from "./screens/Info";
const Tab = createBottomTabNavigator();
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Settings from "./screens/Settings";
import Logo from "./screens/logo";

function MyTabs() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <DarkModeProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: isDarkMode ? "rgba(34,36,40,1)" : "#F2EDEB",
            position: "absolute",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="Calculator"
          component={CalcScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5
                name="calculator"
                style={{ fontSize: 30, color: "#F3EDC8" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Guidelines"
          component={Main}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5
                name="clipboard-list"
                style={{ fontSize: 30, color: "#5F8670" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Crisis"
          component={CrisisNavigator}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5
                name="bolt"
                style={{ fontSize: 30, color: "gold" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Logo"
          component={Info}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5
                name="hospital"
                style={{ fontSize: 30, color: "#F3EDC8" }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </DarkModeProvider>
  );
}

export default function App() {
  return (
    <>
      <DarkModeProvider>
        {/* <StatusBar style="light" /> */}
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </DarkModeProvider>
    </>
  );
}
