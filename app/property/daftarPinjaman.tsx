import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { storeData, getData } from "@/store/storageService";

export default function DaftarPinjaman() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const loadBorrowedBooks = async () => {
      const savedBooks = await getData("borrowedBooks");
      if (savedBooks) {
        setBorrowedBooks(savedBooks);
      }
    };
    loadBorrowedBooks();
  }, []);

  useEffect(() => {
    if (params.id && !borrowedBooks.some((book) => book.id === params.id)) {
      const newBook = {
        id: params.id,
        title: params.title,
        author: params.author,
        cover: params.image,
        borrowedDate: new Date().toISOString(),
        dueDate: getDueDate(),
        fine: 0,
        status: "Belum Dikembalikan",
      };

      const updatedBooks = [...borrowedBooks, newBook];
      setBorrowedBooks(updatedBooks);
      storeData("borrowedBooks", updatedBooks);
    }
  }, [params]);

  function getDueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    return dueDate.toISOString();
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleReturn = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const confirmReturn = async () => {
    try {
      const returnedBook = {
        ...selectedBook,
        returnedDate: new Date().toISOString(),
      };

      const history = (await getData("returnHistory")) || [];
      await storeData("returnHistory", [...history, returnedBook]);

      const updatedBooks = borrowedBooks.filter(
        (book) => book.id !== selectedBook.id
      );
      setBorrowedBooks(updatedBooks);
      await storeData("borrowedBooks", updatedBooks);

      setModalVisible(false);
      Alert.alert(
        "Pengembalian Berhasil",
        `Buku "${selectedBook.title}" telah berhasil dikembalikan`,
        [{ text: "OK", onPress: () => router.push("/(main)/(tabs)/explore") }]
      );
    } catch (error) {
      console.error("Error during return process:", error);
      Alert.alert("Error", "Gagal menyimpan data pengembalian");
    }
  };

  const renderItem = ({ item }) => {
    const isLate = new Date(item.dueDate) < new Date();
    const status = isLate ? "Terlambat" : "Belum Dikembalikan";
    const fine = isLate ? calculateFine(item.dueDate) : 0;

    return (
      <View style={styles.bookItem}>
        <Image
          source={
            typeof item.cover === "string" ? { uri: item.cover } : item.cover
          }
          style={styles.bookCover}
        />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>Penulis: {item.author}</Text>

          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color="#213448" />
            <Text style={styles.dateText}>
              Dipinjam: {formatDate(item.borrowedDate)}
            </Text>
          </View>

          <View style={styles.dueDateContainer}>
            <Ionicons
              name="calendar"
              size={16}
              color={isLate ? "#d32f2f" : "#213448"}
            />
            <Text
              style={[
                styles.dueDate,
                { color: isLate ? "#d32f2f" : "#213448" },
              ]}
            >
              Batas Pengembalian: {formatDate(item.dueDate)}
            </Text>
          </View>

          {isLate && (
            <View style={styles.fineContainer}>
              <MaterialIcons name="money-off" size={16} color="#d32f2f" />
              <Text style={styles.fineText}>
                Denda: Rp {fine.toLocaleString()}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.returnButton,
              {
                backgroundColor: isLate ? "#d32f2f" : "#213448",
              },
            ]}
            onPress={() => handleReturn({ ...item, fine, status })}
          >
            <Text style={styles.returnButtonText}>Kembalikan Buku</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateFine = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 5000 : 0; // Denda Rp 5000/hari
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(main)/(tabs)/RakBuku")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Pinjaman</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Daftar Buku */}
      <FlatList
        data={borrowedBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="library-outline" size={60} color="#213448" />
            <Text style={styles.emptyText}>
              Tidak ada buku yang sedang dipinjam
            </Text>
          </View>
        }
      />

      {/* Modal Konfirmasi */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons
              name="help-circle"
              size={60}
              color="#213448"
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Konfirmasi Pengembalian</Text>
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin mengembalikan buku "{selectedBook?.title}
              "?
            </Text>

            {selectedBook?.fine > 0 && (
              <Text style={styles.fineWarning}>
                Anda akan dikenakan denda sebesar Rp{" "}
                {selectedBook?.fine.toLocaleString()}
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmReturn}
              >
                <Text style={styles.confirmButtonText}>Ya, Kembalikan</Text>
              </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  dueDate: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: "500",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  dateText: {
    fontSize: 13,
    marginLeft: 4,
    color: "#495057",
    fontWeight: "500",
  },
  fineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFEBEE",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  fineText: {
    fontSize: 13,
    color: "#d32f2f",
    marginLeft: 5,
    fontWeight: "500",
  },
  returnButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 15,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "85%",
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#213448",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  fineWarning: {
    fontSize: 14,
    color: "#213448",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    color: "#555",
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: "#213448",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
