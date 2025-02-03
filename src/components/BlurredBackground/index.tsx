import React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated from 'react-native-reanimated';

interface Props {
    children: React.ReactNode;
    show: boolean;
    animatedStyle: ViewStyle;
}

const BlurredBackground = ({ children, animatedStyle, show }: Props) => {
    if (!show) {
        return;
    }

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <BlurView
                style={styles.absolute}
                blurType={'light'}
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
            />

            {children}
            <Pressable onPress={() => console.log('onpress BG')} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    closeLayer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 3,
    },
});

export default BlurredBackground;
