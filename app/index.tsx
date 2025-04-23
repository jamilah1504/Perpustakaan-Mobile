import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";

const IndexScreen = ({ initialLoginStatus }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(main)/(tabs)/explore");
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>
        <Text style={{ color: "#213448" }}>Per</Text>
        <Text style={{ color: "#94B4C1" }}>JTIK</Text>
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#213448" }]}
        onPress={() => setIsLoggedIn(true)}
      >
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#547792" }]}
        onPress={() => router.push("/auth/sign-up")}
      >
        <Text style={[styles.buttonText, { color: "#ECEFCA" }]}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#94B4C1" }]}
        onPress={() => router.replace("/(main)/(tabs)/explore")}
      >
        <Text style={[styles.buttonText, { color: "#ECEFCA" }]}>
          Hanya Lihat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: { width: 150, height: 150, resizeMode: "contain", marginBottom: 30 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 30 },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, color: "#ffff" },
});

export default IndexScreen;
