import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ProfileScreen;
