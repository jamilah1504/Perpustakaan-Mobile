import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { FavoriteProvider } from "@/components/FavoriteContext";

export default function TabLayout() {
  return (
    <FavoriteProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 6,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarActiveTintColor: "#213448",
          tabBarInactiveTintColor: "#aaa",
        }}
      >
        <Tabs.Screen
          name="favorit"
          options={{
            title: "Favorit",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Kategori",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Beranda",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="RakBuku"
          options={{
            title: "Rak Buku",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Akun",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </FavoriteProvider>
  );
}
