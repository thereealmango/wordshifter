import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

const Modal: React.FC = () => {
    const opacity = useSharedValue(1);
    return (
        <Animated.View style={[styles.background, { opacity }]}>
            <Text>MODAL</Text>
        </Animated.View>
    );
};

export default Modal;

const styles = StyleSheet.create({
    background: {
        opacity: 1,
    },
});
