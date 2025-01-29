import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalcScreen from "./screens/CalcScreen";
import Main from "./screens/Main";
import CrisisNavigator from "./screens/Crisis";
import Info from "./screens/Info";
import AcknowledgementsScreen from "./screens/credits";
import WelcomeScreen from "./screens/setup/first_screen";
import Terms from "./screens/setup/terms";
import { DarkModeProvider, useDarkMode } from "./components/DarkModeContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  const { isDarkMode } = useDarkMode();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "rgba(34,36,40,1)",
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
            <FontAwesome5 name="bolt" style={{ fontSize: 30, color: "gold" }} />
          ),
        }}
      />
      <Tab.Screen
        name="Disclaimer"
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
      <Tab.Screen
        name="Credits"
        component={AcknowledgementsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5
              name="clipboard-check"
              style={{ fontSize: 30, color: "#F3EDC8" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          await AsyncStorage.setItem("hasLaunched", "true");
          setInitialRoute("Welcome");
        } else {
          setInitialRoute("Main");
        }
      } catch (error) {
        console.error("Error checking first launch: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    // You can return a loading screen or null while determining the initial route
    return null;
  }

  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
}
