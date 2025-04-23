import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import books from "@/data/books";

const { width } = Dimensions.get("window");
const GENRES_PER_ROW = 3;
const GENRE_BUTTON_WIDTH =
  (width - 16 * 2 - 10 * (GENRES_PER_ROW - 1)) / GENRES_PER_ROW;

const allGenres = [
  "Semua",
  "Pemrograman",
  "Mobile Dev",
  "Flutter",
  "Software Eng",
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

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Semua");
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterBooks(text, selectedGenre);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    filterBooks(searchQuery, genre);
  };

  const filterBooks = (query: string, genre: string) => {
    let results = books;

    if (query) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (genre !== "Semua") {
      results = results.filter((book) => book.genres.includes(genre));
    }

    setFilteredBooks(results);
  };

  const renderGenreButton = (item: string) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.genreButton,
        selectedGenre === item && styles.selectedGenreButton,
      ]}
      onPress={() => handleGenreSelect(item)}
    >
      <Text
        style={[
          styles.genreText,
          selectedGenre === item && styles.selectedGenreText,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderBookItem = ({ item }: { item: (typeof books)[0] }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Image
        source={item.image}
        style={styles.bookImage}
        resizeMode="contain"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <View style={styles.genrePillContainer}>
            {item.genres.slice(0, 2).map((genre, index) => (
              <View key={index} style={styles.genrePill}>
                <Text style={styles.genrePillText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const genreRows = [];
  for (let i = 0; i < allGenres.length; i += GENRES_PER_ROW) {
    genreRows.push(allGenres.slice(i, i + GENRES_PER_ROW));
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari buku atau penulis..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => handleSearch("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.genreSection}>
          <Text style={styles.sectionTitle}>Pilih Kategori</Text>
          <View style={styles.genreGrid}>
            {genreRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.genreRow}>
                {row.map((genre) => renderGenreButton(genre))}
                {row.length < GENRES_PER_ROW &&
                  Array(GENRES_PER_ROW - row.length)
                    .fill(null)
                    .map((_, index) => (
                      <View
                        key={`empty-${index}`}
                        style={[styles.genreButton, styles.emptyGenreButton]}
                      />
                    ))}
              </View>
            ))}
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.resultsTitle]}>
          {filteredBooks.length > 0
            ? selectedGenre === "Semua"
              ? "Semua Buku"
              : `Buku ${selectedGenre}`
            : "Tidak ada hasil"}
        </Text>

        <View style={styles.resultsContainer}>
          {filteredBooks.map((book) => (
            <View key={book.id.toString()}>
              {renderBookItem({ item: book })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    margin: 16,
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: "#333",
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  genreSection: {
    marginBottom: 20,
  },
  genreGrid: {
    marginBottom: 10,
  },
  genreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genreButton: {
    width: GENRE_BUTTON_WIDTH,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    margin: 4,
  },
  emptyGenreButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  selectedGenreButton: {
    backgroundColor: "#213448",
    borderColor: "#213448",
  },
  genreText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  selectedGenreText: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#213448",
  },
  resultsTitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  bookCard: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  genrePillContainer: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
    gap: 5,
  },
  genrePill: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genrePillText: {
    fontSize: 10,
    color: "#555",
  },
  resultsContainer: {
    marginBottom: 20,
  },
});
