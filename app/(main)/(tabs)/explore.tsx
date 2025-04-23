import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import books from "@/data/books";
import BookCard from "@/components/BookCard";
import { useFavorites } from "@/components/FavoriteContext";

const allGenres = [
  "Semua",
  "Pemrograman",
  "Mobile Development",
  "Flutter",
  "Software Engineering",
  "Best Practices",
  "Non Fiksi",
  "Pendidikan",
  "Sejarah",
  "Filsafat",
  "Antropologi",
  "Penelitian",
  "Fiksi",
  "Fantasi",
  "Petualangan",
  "Drama",
  "Magical Realism",
  "Romance",
  "Coming of Age",
  "Fiksi Indonesia",
  "Keuangan",
  "Bisnis",
  "Psikologi",
  "Pengembangan Diri",
  "Produktivitas",
];

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Semua");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filterBooks = () => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "Semua" ||
        (book.genres && book.genres.includes(selectedGenre));
      return matchesSearch && matchesGenre;
    });
  };

  const getRecommendedBooks = () => {
    return [...books].sort((a, b) => b.rating - a.rating).slice(0, 5);
  };

  const filteredBooks = filterBooks();
  const recommendedBooks = getRecommendedBooks();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>
          <Text style={{ color: "#213448" }}>Per</Text>
          <Text style={{ color: "#94B4C1" }}>JTIK</Text>
        </Text>
        <Ionicons name="menu" size={24} />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Cari Buku"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="filter" size={20} color="#888" />
      </View>

      <View style={styles.genreRow}>
        <Text style={styles.sectionTitle}>Rekomendasi Untuk Anda</Text>
        <Ionicons name="arrow-forward" size={18} color="#213448" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bookScroll}
      >
        {recommendedBooks.map((book) => (
          <Pressable key={book.id} style={styles.bookWrapper2}>
            <BookCard
              book={book}
              isFavorite={isFavorite(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.genreRow}>
        <Text style={styles.sectionTitle}>Cari Berdasarkan Genre</Text>
        <Ionicons name="arrow-forward" size={18} color="#213448" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreScroll}
      >
        {allGenres.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.genreChip,
              selectedGenre === genre && { backgroundColor: "#213448" },
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={selectedGenre === genre && { color: "white" }}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.genreRow}>
        <Text style={styles.sectionTitle}>
          {selectedGenre === "Semua" ? "Semua Buku" : `Genre: ${selectedGenre}`}
        </Text>
      </View>
      {filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.booksContainer}
          renderItem={({ item }) => (
            <View style={styles.bookWrapper}>
              <BookCard
                book={item}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Tidak ada buku yang ditemukan</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  logo: { width: 40, height: 40 },
  appName: { fontSize: 20, fontWeight: "bold" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: { flex: 1, marginHorizontal: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  genreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  bookWrapper2: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  booksContainer: {
    paddingBottom: 20,
  },
  bookWrapper: {
    width: "30%", // Lebih konsisten untuk 3 kolom
    marginHorizontal: 5,
    marginBottom: 16,
  },
  genreScroll: { marginBottom: 20 },
  genreChip: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  bookScroll: { marginBottom: 16 },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#888",
    fontStyle: "italic",
  },
});

export default ExploreScreen;
