import React from 'react';
import { View, Text, StyleSheet, ViewBase } from 'react-native';
import { TouchableOpacity, Pressable } from 'react-native-gesture-handler';
import Colors from '../../themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    console.log('isFocused: ', isFocused);
    console.log('folderName: ', folderName);
    return (
        <View>
            <View style={styles.container}>
                <View style={[styles.row, styles.wraper]}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.check} onPress={selectFolder}>
                            <Text style={styles.checkText}>{isSelected ? '✔️' : ''}</Text>
                        </TouchableOpacity>
                        <Text style={styles.nameText}>{folderName}</Text>
                    </View>
                    <TouchableOpacity onPress={setFavorite} style={styles.heart}>
                        {isFavorite ? (
                            <Icon name="heart" size={16} color={Colors.pink} />
                        ) : (
                            <Icon name="heart-o" size={16} color={Colors.brownBlack} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {isFocused && (
                <View style={styles.settingsContainer}>
                    <TouchableOpacity hitSlop={10} style={styles.roundedQuadro} onPress={editFolder}>
                        <Icon name="pencil" size={16} color={Colors.brownBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={10} style={styles.roundedQuadro} onPress={removeFolder}>
                        <Icon name="trash" size={16} color={Colors.brownBlack} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'static',
        gap: 8,

        // right: 20,
        // top: 60,
        zIndex: 12,
    },
    roundedQuadro: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        // position: 'static',
        // position: "static",
        backgroundColor: Colors.beigeDark,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5.46,

        elevation: 9,
        // zIndex: 12,
    },
    container: {
        backgroundColor: Colors.beigeDark,
        width: '100%',
        height: 43,
        borderRadius: 10,
        marginVertical: 7,
        paddingHorizontal: 12,
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5.46,

        elevation: 9,
    },
    wraper: {
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
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
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heart: {
        paddingLeft: 15,
        paddingRight: 0,
    },
    nameText: {
        fontFamily: 'OpenDyslexic Nerd Font',
        fontSize: 12,
        color: Colors.brownBlack,
    },
});

export default Folder;
