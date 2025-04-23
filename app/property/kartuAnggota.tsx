import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

type MemberData = {
  name: string;
  memberId: string;
  joinDate: string;
  expiryDate: string;
  photo?: any;
};

const KartuAnggota = () => {
  const router = useRouter();
  const [memberData, setMemberData] = React.useState<MemberData>({
    name: "Alya Maratun Jamilah",
    memberId: "LIB20230001",
    joinDate: "15 Januari 2023",
    expiryDate: "15 Januari 2025",
    photo: require("@/assets/images/profile.png"),
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Kartu Anggota Perpustakaan Digital\n\nNama: ${memberData.name}\nID Anggota: ${memberData.memberId}\nBerlaku hingga: ${memberData.expiryDate}`,
      });
    } catch (error) {
      Alert.alert("Error", "Gagal membagikan kartu anggota");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kartu Anggota</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Membership Card */}
        <LinearGradient
          colors={["#213448", "#2d4a63"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={styles.logoContainer}>
              <Ionicons name="library" size={24} color="#fff" />
              <Text style={styles.cardTitle}>Perpustakaan Digital</Text>
            </View>
            <Text style={styles.cardSubtitle}>Kartu Anggota Premium</Text>
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            {memberData.photo && (
              <Image source={memberData.photo} style={styles.profileImage} />
            )}
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{memberData.name}</Text>
              <Text style={styles.memberId}>ID: {memberData.memberId}</Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>AKTIF</Text>
              </View>
            </View>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Bergabung</Text>
                <Text style={styles.infoValue}>{memberData.joinDate}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Berlaku Hingga</Text>
                <Text style={styles.infoValue}>{memberData.expiryDate}</Text>
              </View>
            </View>
          </View>

          {/* Barcode */}
          <View style={styles.barcodeContainer}>
            <Ionicons name="barcode" size={80} color="rgba(255,255,255,0.8)" />
            <Text style={styles.barcodeText}>{memberData.memberId}</Text>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.actionButton, styles.downloadButton]}
            onPress={handleShare}
          >
            <Ionicons name="share-social" size={20} color="#213448" />
            <Text style={styles.buttonText}>Bagikan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleShare}
          >
            <Ionicons name="download" size={20} color="#fff" />
            <Text style={[styles.buttonText, { color: "#fff" }]}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    backgroundColor: "#213448",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
    marginLeft: -24,
  },
  headerRight: {
    width: 40,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30,
  },
  cardHeader: {
    marginBottom: 25,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
    marginRight: 20,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  memberId: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: "rgba(46, 204, 113, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(46, 204, 113, 0.5)",
  },
  statusText: {
    color: "#2ecc71",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardFooter: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginBottom: 4,
  },
  infoValue: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  barcodeContainer: {
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    marginTop: 10,
  },
  barcodeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    letterSpacing: 2,
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
  },
  downloadButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#213448",
  },
  saveButton: {
    backgroundColor: "#213448",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#213448",
  },
});

export default KartuAnggota;
