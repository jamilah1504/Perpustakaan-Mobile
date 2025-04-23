import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BookRequestsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: "", author: "" });

  const [requests, setRequests] = useState([
    { id: "1", title: "Meminta buku 'Laskar Pelangi'", status: "Diterima" },
    { id: "2", title: "Meminta buku 'Atomic Habits'", status: "Diproses" },
  ]);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleAddRequest = () => {
    console.log("Permintaan Baru:", newRequest);
    const newId = (requests.length + 1).toString();
    setRequests([
      ...requests,
      {
        id: newId,
        title: `Meminta buku '${newRequest.title}'`,
        status: "Diproses",
      },
    ]);
    setModalVisible(false);
    setNewRequest({ title: "", author: "" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Permintaan Buku</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Ionicons
              name="book-outline"
              size={24}
              color="#213448"
              style={{ marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.requestTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.requestStatus,
                  item.status === "Diterima" ? styles.accepted : styles.pending,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Ajukan Permintaan Baru</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajukan Permintaan Buku</Text>
            <TextInput
              style={styles.input}
              placeholder="Judul Buku"
              value={newRequest.title}
              onChangeText={(text) =>
                setNewRequest({ ...newRequest, title: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Penulis"
              value={newRequest.author}
              onChangeText={(text) =>
                setNewRequest({ ...newRequest, author: text })
              }
            />

            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button title="Kirim Permintaan" onPress={handleAddRequest} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Batal"
                  color="#B8001F"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 22,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#213448",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  backButton: {
    padding: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 12,
    marginTop: 6,
    borderRadius: 10,
    marginBottom: 10,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  requestStatus: {
    fontSize: 14,
    marginTop: 4,
  },
  accepted: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#213448",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#213448",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
  buttonWrapper: {
    marginVertical: 6,
    borderRadius: 10,
    overflow: "hidden",
  },
});
