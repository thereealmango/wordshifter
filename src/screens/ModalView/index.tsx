import React from "react";
import {
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import BlurredBackground from "../../components/BlurredBackground";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useModalViewAnimation } from "../../hooks/useModalViewAnimation";
import { saveFolder, editFolder } from "../../store/folder/folderSlice";

interface ModalContentT {
  [name: string]: React.FC<BottomSheetProps>;
}

const ModalContent: ModalContentT = {
  bottomSheet: BottomSheet,
};

const ModalView: false | Element = () => {
  const show = useSelector((state: RootState) => state.modal.show);
  const contentName = useSelector(
    (state: RootState) => state.modal.contentName
  );
  const editId = useSelector((state: RootState) => state.modal.id);

  const { animatedStyle, closeModal, translateY } = useModalViewAnimation(show);
  const dispatch = useDispatch();

  if (!contentName) {
    return false;
  }

  const onSavePressed = (text?: string) => {
    Keyboard.dismiss();
    if (text?.length) {
      if (editId) {
        dispatch(editFolder({ name: text, id: editId }));
      } else {
        console.log("text::");
        console.log(text);
        console.log("Save to store");
        dispatch(saveFolder({ name: text }));
      }
    }

    closeModal();
  };

  const onBGPressed = () => {
    onSavePressed();
  };

  const Content = ModalContent[contentName];
  return (
    <BlurredBackground show={show} animatedStyle={animatedStyle}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.keyboardContainer}
      >
        <Pressable style={styles.closeSheet} onPress={onBGPressed} />

        <Content onClose={onSavePressed} translateY={translateY} />
      </KeyboardAvoidingView>
    </BlurredBackground>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  closeSheet: {
    width: "100%",
    height: "100%",
  },
  keyboardContainer: {
    width: "100%",
  },
});
