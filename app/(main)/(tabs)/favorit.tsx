// src/screens/FavoriteScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import books from "@/data/books";
import BookCard from "@/components/BookCard";
import { useFavorites } from "@/components/FavoriteContext";

const FavoriteScreen = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoriteBooks = books.filter((book) => isFavorite(book.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buku Favorit Anda</Text>
        <Ionicons name="heart" size={24} color="#f44" />
      </View>

      {favoriteBooks.length > 0 ? (
        <FlatList
          data={favoriteBooks}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.row}
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
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>
            Anda belum menambahkan buku ke favorit
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#213448",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  bookWrapper: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    color: "#888",
    fontStyle: "italic",
    fontSize: 16,
  },
});

export default FavoriteScreen;
