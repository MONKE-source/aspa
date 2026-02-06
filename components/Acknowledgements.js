import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";

const AcknowledgementsModal = ({ visible, onClose }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Platform.isPad || (Platform.OS === "android" && Math.min(width, height) >= 600);
  const shortDim = Math.min(width, height);
  const scaledFontSize = (size) => size * (shortDim / 375);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {
          maxWidth: isLandscape ? Math.min(width * 0.6, 600) : width * 0.9,
          maxHeight: isLandscape ? height * 0.85 : undefined,
        }]}>
          <Text style={[styles.modalTitle, { fontSize: scaledFontSize(23) }]} allowFontScaling={false}>
            Preface
          </Text>
          <Text style={[styles.modalText, { fontSize: scaledFontSize(17.5) }]} allowFontScaling={false}>
            Asian Society of Paediatric Anaesthesia (ASPA) is about sharing. The
            ASPA app is created with the vision to share knowledge and practical
            tips on perioperative management of children in Asia. There may be
            differences in resources and workflow but the broad principles will
            be similar in all countries. We hope this app will help to provide
            better, safer care for all the children. ~ Agnes Ng
          </Text>
          <Button title="Accept" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 30,
    paddingHorizontal: 10,
  },
  modalTitle: {
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AcknowledgementsModal;
