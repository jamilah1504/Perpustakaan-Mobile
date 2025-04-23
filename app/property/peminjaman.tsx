import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import books from "@/data/books";

export default function PeminjamanScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButtonTop}
      >
        <Ionicons name="arrow-back" size={24} color="#213448" />
      </TouchableOpacity>

      <Text style={styles.title}>Konfirmasi Peminjaman</Text>

      <Image source={book.image} style={styles.image} />
      <Text style={styles.label}>Judul:</Text>
      <Text style={styles.text}>{book.title}</Text>

      <Text style={styles.label}>Penulis:</Text>
      <Text style={styles.text}>{book.author}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Konfirmasi Pinjam</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  backButtonTop: { marginBottom: 10, alignSelf: "flex-start" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: "cover",
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  button: {
    backgroundColor: "#213448",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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
});
