import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasBookRequests, setHasBookRequests] = useState(true);

  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <FontAwesome name="user" size={40} color="#fff" />
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>Alya Maratun Jamilah</Text>
        <Text style={styles.userEmail}>alyamaraatunjamilah@gmail.id</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/property/notifications")}
        >
          <View style={styles.menuIcon}>
            <Ionicons name="notifications" size={24} color="#213448" />
          </View>
          <Text style={styles.menuText}>Notifikasi</Text>
          {hasBookRequests && <View style={styles.badge} />}
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/property/kartuAnggota")}
        >
          <View style={styles.menuIcon}>
            <FontAwesome name="id-card" size={24} color="#213448" />{" "}
          </View>
          <Text style={styles.menuText}>Kartu Keanggotaan</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/property/book-requests")}
        >
          <View style={styles.menuIcon}>
            <Ionicons name="book" size={24} color="#213448" />
          </View>
          <Text style={styles.menuText}>Permintaan Buku</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Ionicons name="moon" size={24} color="#213448" />
          </View>
          <Text style={styles.menuText}>Mode Gelap</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#213448" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#213448",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#213448",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#213448",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  menuContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    backgroundColor: "#94B4C1",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    marginRight: 15,
  },
});
