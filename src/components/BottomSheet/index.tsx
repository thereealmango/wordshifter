import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Button from '../Button';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../../themes/colors';
import t from '../../../content/index.json';
import { useSharedValue } from 'react-native-reanimated';

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

const validateFolderName = (input: string) => {
    if (input.length && !input.match(/^[a-zA-Z0-9 ]{1,}$/)) {
        return 'Invalid folder name format';
    } else {
        return ''; // No error
    }
};

export interface BottomSheetProps {
    translateY: any;
    onClose: (text: string) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ translateY, onClose }) => {
    const [text, onChangeText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const prevTranslationY = useSharedValue(0);

    const onSave = () => {
        console.log('onSave::::::');
        console.log(text);

        if (!errorMessage.length) {
            onClose(text.trim());
        }
    };

    const handleInputChange = (textInput: string) => {
        onChangeText(textInput);
        setErrorMessage(validateFolderName(textInput));
    };

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationY.value = translateY.value;
        })
        .onUpdate((event) => {
            const maxTranslateY = 250;

            translateY.value = clamp(prevTranslationY.value + event.translationY, 0, maxTranslateY);
        })
        .runOnJS(true)
        .onEnd(() => {
            if (translateY.value > prevTranslationY.value) {
                onClose('');
            }
        });

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.sheetContainer, { transform: [{ translateY }] }]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t.home.enterFolderName}</Text>
                    </View>

                    <View>
                        <TextInput style={styles.input} onChangeText={handleInputChange} value={text} maxLength={45} />

                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            text={t.home.save}
                            onPress={onSave}
                            disabled={!text.trim().length || errorMessage.length}
                        />
                    </View>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cross: {
        fontSize: 28,

        color: Colors.brownBlack,
    },
    title: {
        fontFamily: 'OpenDyslexic Nerd Font',
        fontSize: 16,
        color: Colors.brownBlack,
    },
    errorMessage: {
        position: 'absolute',
        fontFamily: 'OpenDyslexic Nerd Font',
        fontSize: 12,
        bottom: 2,
        color: Colors.pink,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 25,

        backgroundColor: Colors.darkGrayBeige,
        borderColor: Colors.darkGrayBeige,
        borderRadius: 10,
        marginHorizontal: -2,
    },
    sheetContainer: {
        position: 'absolute',
        backgroundColor: Colors.grayBeige,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 250,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 7,
        paddingHorizontal: 20,
        paddingTop: 20,
        // paddingBottom: 20,

        gap: 14,
    },
    container: {
        width: '100%',
    },
    buttonContainer: {
        // flex: 0.1,
        // flexDirection: 'row',
        // paddingHorizontal: 15,
        // paddingBottom: 50,
    },
});
