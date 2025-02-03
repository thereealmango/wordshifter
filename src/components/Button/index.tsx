import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Colors from '../../themes/colors';

interface ButtonProps {
    onPress: () => void;
    text: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, text, disabled = false, style }) => {
    const containerStyle = disabled ? styles.disabledContainer : styles.container;

    return (
        <Pressable disabled={disabled} style={[containerStyle, style]} onPress={onPress}>
            <Text style={disabled ? styles.disabledText : styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        height: 61,
        width: '100%',
        borderRadius: 30,
        backgroundColor: Colors.green,
        justifyContent: 'center',
        elevation: 1,
        shadowColor: Colors.green,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    disabledContainer: {
        height: 61,
        width: '100%',
        borderRadius: 30,
        backgroundColor: Colors.darkGrayBeige,
        justifyContent: 'center',
        elevation: 1,
        shadowColor: Colors.darkGrayBeige,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    disabledText: {
        color: Colors.grayYellow,
        alignContent: 'center',
        justifyContent: 'center',
        fontFamily: 'OpenDyslexic Nerd Font',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    buttonText: {
        color: Colors.darkGreen,
        alignContent: 'center',
        justifyContent: 'center',
        fontFamily: 'OpenDyslexic Nerd Font',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
});
