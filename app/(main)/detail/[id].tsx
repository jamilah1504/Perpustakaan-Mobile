import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import books from "@/data/books";

function getDueDate(days = 7) {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const book = books.find((b) => b.id.toString() === id);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Buku tidak ditemukan.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBorrow = () => {
    setShowModal(true);
  };

  const confirmBorrow = () => {
    setShowModal(false);
    router.push({
      pathname: "/property/daftarPinjaman",
      params: {
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        image: book.image.uri || JSON.stringify(book.image),
      },
    });
  };

  const borrowDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/(main)/(tabs)/explore")}
          style={styles.backButtonTop}
        >
          <Ionicons name="arrow-back" size={24} color="#213448" />
        </TouchableOpacity>

        <Image source={book.image} style={styles.image} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>oleh {book.author}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#f1c40f" />
          <Text style={styles.ratingText}>{book.rating}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>
            {book.description || "Tidak ada deskripsi."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.genreContainer}>
            {book.genres?.map((genre, index) => (
              <Text key={index} style={styles.genreChip}>
                {genre}
              </Text>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
          <Text style={styles.borrowButtonText}>Pinjam Buku</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Konfirmasi Peminjaman</Text>
            <Text style={styles.modalText}>Judul: {book.title}</Text>
            <Text style={styles.modalText}>Penulis: {book.author}</Text>
            <Text style={styles.modalText}>Tanggal Pinjam: {borrowDate}</Text>
            <Text style={styles.modalText}>
              Batas Pengembalian: {getDueDate()}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmBorrow}
              >
                <Text style={styles.modalButtonText}>Konfirmasi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: "#213448" }]}>
                  Batal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  backButtonTop: { marginBottom: 10, alignSelf: "flex-start" },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#213448" },
  author: { fontSize: 16, color: "#666", marginBottom: 8 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  ratingText: { marginLeft: 6, fontSize: 14, color: "#444" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, color: "#555", lineHeight: 22 },
  genreContainer: { flexDirection: "row", flexWrap: "wrap" },
  genreChip: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  errorText: { fontSize: 16, color: "red", marginBottom: 16 },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#213448",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  backText: { color: "white", marginLeft: 8 },
  borrowButton: {
    backgroundColor: "#213448",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  borrowButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#213448",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    backgroundColor: "#213448",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
});
