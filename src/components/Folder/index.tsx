import React from "react";
import { View, Text, StyleSheet, ViewBase, Pressable } from "react-native";
import Colors from "../../themes/colors";
import Icon from "react-native-vector-icons/FontAwesome";

interface FolderProps {
  folderName: string;
  isSelected: boolean;
  isFavorite: boolean;
  isFocused: boolean;

  editFolder: () => void;
  removeFolder: () => void;
  setFavorite: () => void;
  selectFolder: () => void;
}

const Folder: React.FC<FolderProps> = ({
  folderName,
  isFocused,
  isSelected,
  isFavorite,
  selectFolder,
  setFavorite,
  editFolder,
  removeFolder,
}) => {
  console.log("isFocused: ", isFocused);
  console.log("folderName: ", folderName);
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.row, styles.wraper]}>
          <View style={styles.row}>
            <Pressable style={styles.check} onPress={selectFolder}>
              <Text style={styles.checkText}>{isSelected ? "✔️" : ""}</Text>
            </Pressable>
            <Text style={styles.nameText}>{folderName}</Text>
          </View>
          <Pressable onPress={setFavorite} style={styles.heart}>
            {isFavorite ? (
              <Icon name="heart" size={16} color={Colors.pink} />
            ) : (
              <Icon name="heart-o" size={16} color={Colors.brownBlack} />
            )}
          </Pressable>
        </View>
      </View>

      {isFocused && (
        <View style={styles.settingsContainer}>
          <Pressable style={styles.roundedQuadro} onPress={editFolder}>
            <Icon name="pencil" size={16} color={Colors.brownBlack} />
          </Pressable>
          <Pressable style={styles.roundedQuadro} onPress={removeFolder}>
            <Icon name="trash" size={16} color={Colors.brownBlack} />
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    gap: 8,

    right: 0,
    top: 60,
  },
  roundedQuadro: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // position: "static",
    backgroundColor: Colors.beigeDark,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5.46,

    elevation: 9,
    zIndex: 10,
  },
  container: {
    backgroundColor: Colors.beigeDark,
    width: "100%",
    height: 43,
    borderRadius: 10,
    marginVertical: 7,
    paddingHorizontal: 12,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5.46,

    elevation: 9,
  },
  wraper: {
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  check: {
    backgroundColor: Colors.darkGrayBeige,
    width: 13,
    height: 13,
    borderRadius: 2,
    marginRight: 12,
  },
  checkText: {
    fontSize: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    paddingLeft: 15,
    paddingRight: 0,
  },
  nameText: {
    fontFamily: "OpenDyslexic Nerd Font",
    fontSize: 12,
    color: Colors.brownBlack,
  },
});

export default Folder;
