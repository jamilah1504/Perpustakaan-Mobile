import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { storeData, getData } from "@/store/storageService";
import { LinearGradient } from "expo-linear-gradient";

export default function RiwayatPengembalian() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadHistory = async () => {
    setRefreshing(true);
    try {
      const savedHistory = await getData("returnHistory");
      if (savedHistory) {
        setHistory(savedHistory);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal memuat riwayat pengembalian");
      console.error("Error loading history:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleGoBack = () => {
    router.push("/(main)/(tabs)/RakBuku");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const updatedHistory = history.filter(
        (item) =>
          !(
            item.id === selectedItem.id &&
            item.returnedDate === selectedItem.returnedDate
          )
      );

      await storeData("returnHistory", updatedHistory);
      setHistory(updatedHistory);
      setShowDeleteModal(false);
      Alert.alert("Sukses", "Riwayat berhasil dihapus");
    } catch (error) {
      Alert.alert("Error", "Gagal menghapus riwayat");
      console.error("Error deleting history:", error);
    }
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={["#ffffff", "#f8f9fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(item)}
        >
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>

        <Image
          source={
            typeof item.cover === "string" ? { uri: item.cover } : item.cover
          }
          style={styles.coverImage}
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.author}>{item.author}</Text>

          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={16} color="#6c757d" />
              <Text style={styles.dateText}>
                {formatDate(item.borrowedDate)}
              </Text>
            </View>

            <MaterialIcons
              name="arrow-forward"
              size={16}
              color="#6c757d"
              style={styles.arrowIcon}
            />

            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={16} color="#6c757d" />
              <Text style={styles.dateText}>
                {formatDate(item.returnedDate)}
              </Text>
            </View>
          </View>

          {item.fine > 0 && (
            <View style={styles.fineBadge}>
              <MaterialIcons name="attach-money" size={16} color="#dc3545" />
              <Text style={styles.fineText}>
                Denda: Rp {item.fine.toLocaleString("id-ID")}
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#213448", "#1a2a3a"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Pengembalian</Text>
        <View style={styles.headerRightPlaceholder} />
      </LinearGradient>

      {/* Content */}
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.returnedDate}`}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadHistory}
            colors={["#213448"]}
            tintColor="#213448"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={80} color="#e9ecef" />
            <Text style={styles.emptyTitle}>Tidak Ada Riwayat</Text>
            <Text style={styles.emptyMessage}>
              Belum ada buku yang pernah Anda kembalikan
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hapus Riwayat?</Text>
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin menghapus riwayat pengembalian buku{" "}
              <Text style={{ fontWeight: "bold" }}>
                "{selectedItem?.title}"
              </Text>
              ?
            </Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteConfirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.deleteButtonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  headerRightPlaceholder: {
    width: 24,
  },
  // List Styles
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  // Card Styles
  cardContainer: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    backgroundColor: "#fff",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ffecec",
    zIndex: 1,
  },
  coverImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
    lineHeight: 22,
  },
  author: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 10,
    marginLeft: 6,
    color: "#495057",
    fontWeight: "500",
  },
  fineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff5f5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ffdddd",
  },
  fineText: {
    fontSize: 12,
    color: "#dc3545",
    marginLeft: 6,
    fontWeight: "600",
  },
  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#adb5bd",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#ced4da",
    textAlign: "center",
    lineHeight: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#212529",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#495057",
    lineHeight: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#f1f3f5",
  },
  cancelButtonText: {
    color: "#495057",
  },
  deleteConfirmButton: {
    backgroundColor: "#dc3545",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
