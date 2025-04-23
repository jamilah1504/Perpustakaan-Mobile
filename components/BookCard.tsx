import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
}: {
  book: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/detail/${book.id}`);
  };

  const handleHeartPress = (e: any) => {
    e.stopPropagation(); // Critical line!
    onToggleFavorite();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={book.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={styles.footer}>
          <Text style={styles.rating}>⭐ {book.rating}</Text>
          <TouchableOpacity
            onPress={handleHeartPress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // Area klik lebih besar
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heartButton: {
    padding: 4, // Area tap yang lebih besar
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 12,
    color: "#444",
  },
});
