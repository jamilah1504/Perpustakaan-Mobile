// src/components/GenreChip.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface GenreChipProps {
  genre: string;
  isSelected: boolean;
  onPress: () => void;
}

const GenreChip: React.FC<GenreChipProps> = ({
  genre,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={isSelected ? styles.selectedText : styles.text}>
        {genre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: "#5D8736",
  },
  text: {
    color: "#333",
  },
  selectedText: {
    color: "white",
  },
});

export default GenreChip;
