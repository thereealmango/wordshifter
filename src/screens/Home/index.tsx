import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Colors from '../../themes/colors';
import t from '../../../content/index.json';
import Button from '../../components/Button';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import { removeFolder, removeFolders } from '../../store/folder/folderSlice';
import Folder from '../../components/Folder';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

function isNumber(value?: number) {
    return typeof value === 'number';
}

const HomeScreen: React.FC = () => {
    const folders = useSelector((state: RootState) => state.folder.folders);
    const [selectedFolders, setSelectedFolder] = useState<number[]>([]);
    const [showSettingsId, setShowSettingsId] = useState<number | undefined>(undefined);
    const [favorites, setFavorites] = useState<number[]>([]);

    const opacityFolderValue = useSharedValue(0);
    const animatedFolderStyle = useAnimatedStyle(() => ({
        opacity: opacityFolderValue.value,
    }));

    console.log('FOLDERS::');
    console.log(folders);
    const dispatch = useDispatch();
    const openAddModal = () => {
        dispatch(openModal({ show: true, contentName: 'bottomSheet' }));
    };

    const openSettings = (id: number) => {
        setShowSettingsId(id);
    };

    const onBluredSettingsAnimationComplete = () => {
        setShowSettingsId(undefined);
    };

    useEffect(() => {
        opacityFolderValue.value = withTiming(1, { duration: 300 });
    }, [showSettingsId]);

    const closeSettings = () => {
        opacityFolderValue.value = withTiming(0, { duration: 300 }, (finished) => {
            if (onBluredSettingsAnimationComplete && finished) {
                runOnJS(onBluredSettingsAnimationComplete)();
            }
        });
    };

    const onFavoritePress = (id: number) => {
        setFavorites((old) => {
            if (old.includes(id)) {
                return old.filter((i) => i != id);
            }
            return [...favorites, id];
        });
    };

    const onSelectPress = (id: number) => {
        setSelectedFolder((old) => {
            if (old.includes(id)) {
                return old.filter((i) => i != id);
            }
            return [...old, id];
        });
    };

    const renderBlurredBGSettings = () => {
        if (!isNumber(showSettingsId)) {
            console.log('return null bluredBG!!!');
            return;
        }

        return (
            <>
                <Animated.View style={[styles.blurContainer, animatedFolderStyle]}>
                    <BlurView
                        style={styles.blurAbsolute}
                        blurType="light"
                        blurAmount={5}
                        reducedTransparencyFallbackColor="white"
                    />
                </Animated.View>
                <TouchableOpacity style={styles.closeSettings} onPress={closeSettings} />
            </>
        );
    };

    const onRemoveFolder = (id: number) => {
        console.log('========onremove press--');
        dispatch(removeFolder(id));

        closeSettings();
    };

    const onEditFolder = (id: number) => {
        console.log('==========onedit press--');
        dispatch(openModal({ show: true, contentName: 'bottomSheet', id }));
    };

    const renderFolders = () => {
        return (
            <View style={isNumber(showSettingsId) ? styles.listConteinerAbsolute : styles.listContainer}>
                {renderBlurredBGSettings()}
                {folders?.map((item) => (
                    <Pressable
                        key={item.id}
                        style={showSettingsId == item.id ? styles.folder : styles.focusedFolder}
                        onLongPress={() => openSettings(item.id)}
                        pointerEvents="box-none"
                    >
                        <Folder
                            editFolder={() => onEditFolder(item.id)}
                            removeFolder={() => onRemoveFolder(item.id)}
                            isFocused={isNumber(showSettingsId) && showSettingsId == item.id}
                            isSelected={selectedFolders.includes(item.id)}
                            isFavorite={favorites.includes(item.id)}
                            folderName={item.name}
                            setFavorite={() => onFavoritePress(item.id)}
                            selectFolder={() => onSelectPress(item.id)}
                        />
                    </Pressable>
                ))}
            </View>
        );
    };

    const removeSelectedFolders = () => {
        dispatch(removeFolders(selectedFolders));

        setSelectedFolder([]);
    };

    console.log(showSettingsId);

    return (
        <View style={styles.container}>
            {folders.length ? (
                <>{renderFolders()}</>
            ) : (
                <View style={styles.textContainer}>
                    <Text style={styles.emptyCollections}>{t.home.emptyCollections}</Text>
                    <Text style={styles.emptyCollections}>{t.home.smile}</Text>
                </View>
            )}
            <Button
                style={styles.buttonContainer}
                text={selectedFolders.length > 0 ? t.home.removeSelectedFolders : t.home.createSetButton}
                onPress={selectedFolders.length > 0 ? removeSelectedFolders : openAddModal}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    closeSettings: {
        width: '100%',
        height: '100%',
        // flex: 1,
        position: 'absolute',
        // zIndex: 2,
    },
    focusedFolder: {
        position: 'static',
        zIndex: 6,
        // top: 200,
    },
    folder: {
        // position: 'absolute',
        // zIndex: 40,
    },

    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 0,
    },
    blurAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    listContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    listConteinerAbsolute: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 10,

        position: 'absolute',
        zIndex: 4,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        // backgroundColor: 'lavander',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.vintageWhite,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyCollections: {
        fontFamily: 'OpenDyslexic Nerd Font',
        fontSize: 20,
        color: Colors.lightGray,
        textAlign: 'center',
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 35,
        width: '89%',
    },
});
