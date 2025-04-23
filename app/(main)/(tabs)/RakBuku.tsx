import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

const menuItems = [
  {
    title: "Katalog Buku",
    icon: <FontAwesome5 name="book" size={20} color="#213448" />,
    route: "/property/katalog",
  },
  {
    title: "Riwayat Peminjaman",
    icon: <Entypo name="book" size={20} color="#213448" />,
    route: "/property/pengembalian",
  },
  {
    title: "Daftar Pinjaman",
    icon: <Ionicons name="heart" size={20} color="#213448" />,
    route: "/property/daftarPinjaman",
  },
];

export default function RakBuku() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rak Buku Digital</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#213448" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#213448" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "#213448",
  },
  menuContainer: {
    marginBottom: 30,
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
  iconContainer: {
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
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginTop: "auto",
    marginBottom: 30,
  },
  profileText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 15,
  },
});
