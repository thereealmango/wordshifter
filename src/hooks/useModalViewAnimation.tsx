import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modal/modalSlice';
import { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming } from 'react-native-reanimated';

export const useModalViewAnimation = (show: boolean) => {
    const dispatch = useDispatch();

    const opacityValue = useSharedValue(0);
    const translateY = useSharedValue(300);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacityValue.value,
    }));

    const onOpacityEndOnimationComplete = () => {
        dispatch(openModal({ show: false, contentName: '' }));
    };

    const onOpacityStartOnimationComplete = () => {
        translateY.value = withSpring(0, { damping: 80 });
    };

    const onBottomSheetAnimationEnd = () => {
        opacityValue.value = withTiming(0, { duration: 300 }, (finished) => {
            if (onOpacityEndOnimationComplete && finished) {
                runOnJS(onOpacityEndOnimationComplete)();
            }
        });
    };

    useEffect(() => {
        if (show) {
            opacityValue.value = withTiming(1, { duration: 300 }, (finished) => {
                if (onOpacityStartOnimationComplete && finished) {
                    runOnJS(onOpacityStartOnimationComplete)();
                }
            });
        }
    }, [show]);

    const closeModal = () => {
        translateY.value = withTiming(300, { duration: 300 }, (finished) => {
            if (onBottomSheetAnimationEnd && finished) {
                runOnJS(onBottomSheetAnimationEnd)();
            }
        });
    };

    return {
        animatedStyle,
        closeModal,
        translateY,
    };
};
