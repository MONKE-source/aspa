import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";

const AcknowledgementsModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Preface</Text>
          <Text style={styles.modalText}>
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
    fontSize: 17.5 * (Dimensions.get("window").width / 375),
    fontWeight: "400",
    lineHeight: 30,
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 23 * (Dimensions.get("window").width / 375),
    marginBottom: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AcknowledgementsModal;
