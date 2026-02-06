import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  PlatformColor,
  useWindowDimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { downloadAllPdfs } from "../../utils/pdfManager";
import useResponsive from "../../components/useResponsive";

export default function WelcomeScreen({ navigation }) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [totalPdfs, setTotalPdfs] = useState(0);
  const [isDownloadingPdfs, setIsDownloadingPdfs] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadSize, setDownloadSize] = useState(0);
  const { width, height, isLandscape, isTablet, wp, hp, ms, fs } = useResponsive();

  const imageWidth = isLandscape
    ? Math.min(width * 0.35, 400)
    : (isTablet ? width * 0.8 : width * 0.63);
  const imageLength = isLandscape
    ? Math.min(height * 0.45, 350)
    : (isTablet ? height * 0.6 : height * 0.35);
  const gapLength = isLandscape
    ? Math.min(width * 0.15, 150)
    : width * 0.25;

  useEffect(() => {
    // Check if PDFs have been downloaded before
    const checkPdfDownloaded = async () => {
      try {
        const pdfsDownloaded = await AsyncStorage.getItem("pdfsDownloaded");
        if (pdfsDownloaded === "true") {
          setDownloadComplete(true);
        }
      } catch (error) {
        Alert.alert("Error checking if PDFs were downloaded:", error);
      }
    };

    checkPdfDownloaded();
  }, []);

  const handleDownloadPdfs = async () => {
    if (downloadComplete) {
      // If PDFs are already downloaded, just navigate to Terms
      navigation.navigate("Terms");
      return;
    }

    if (isDownloadingPdfs) {
      // If already downloading, do nothing
      return;
    }

    try {
      setIsDownloadingPdfs(true);
      setDownloadStarted(true);

      const result = await downloadAllPdfs((downloaded, total, size) => {
        setDownloadProgress(downloaded);
        setTotalPdfs(total);
        setDownloadSize(size); // Update download size
      });

      if (result.success) {
        // Mark PDFs as downloaded
        await AsyncStorage.setItem("pdfsDownloaded", "true");
        await AsyncStorage.setItem("hasLaunched", "true");
        setDownloadComplete(true);

        // Navigate to Terms screen
        navigation.navigate("Terms");
      } else {
        console.warn("Some PDFs failed to download:", result.failedDownloads);
        Alert.alert(
          "Download Incomplete",
          "Some resources couldn't be downloaded. You may experience issues in offline mode.",
          [
            {
              text: "Continue Anyway",
              onPress: () => navigation.navigate("Terms"),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error downloading PDFs:", error);
      Alert.alert(
        "Download Error",
        "There was an error downloading resources. You may experience issues in offline mode.",
        [
          {
            text: "Continue Anyway",
            onPress: () => navigation.navigate("Terms"),
          },
        ]
      );
    } finally {
      setIsDownloadingPdfs(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/ASPA_logo.png")}
          resizeMode="cover"
          style={{ height: imageLength, width: imageWidth }}
        />
        <Text
          style={[styles.subText, { marginTop: "2.25%", fontSize: fs(20) }]}
          allowFontScaling={false}
        >
          Welcome to ASPA App!
        </Text>
        <Text
          style={[styles.subText, { marginTop: "1.5%", fontWeight: "400" }]}
          allowFontScaling={false}
        >
          Your all-in-one guide to help you through {"\n"}paediatric
          anaesthesia!
        </Text>

        {downloadStarted && !downloadComplete && (
          <View style={styles.downloadContainer}>
            <ActivityIndicator size="large" color="#5092CD" />
            <Text style={styles.downloadText} allowFontScaling={false}>
              Downloading resources for offline use: {downloadProgress}/
              {totalPdfs} ({(downloadSize / 1024 / 1024).toFixed(2)} MB / 18.35
              MB)
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            width: isLandscape ? Math.min(wp(60), 500) : "86%",
            marginTop: isLandscape ? "3%" : (isTablet ? "5%" : "15%"),
            top: isLandscape ? "3%" : (isTablet ? "5%" : "25%"),
            height: isLandscape ? Math.min(hp(12), 60) : "7%",
          },
          isDownloadingPdfs && { backgroundColor: "#A0A0A0" },
        ]}
        onPress={handleDownloadPdfs}
        disabled={isDownloadingPdfs}
      >
        <Text
          style={[styles.subText, { color: "#FFF" }]}
          allowFontScaling={false}
        >
          {downloadComplete
            ? "Proceed"
            : downloadStarted
            ? "Downloading..."
            : "Download & Proceed"}
        </Text>
        <View style={styles.iconContainer}>
          <AntDesign name="right" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EFEFF0",
    justifyContent: "center",
  },
  subText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    padding: 5,
  },
  nextButton: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 300,
    backgroundColor: "#5092CD",
    alignSelf: "center",
    gap: 12,
  },
  iconContainer: {
    height: "50%",
    justifyContent: "center",
  },
  downloadContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
