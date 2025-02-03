import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Profile } from '../screens';
import Colors from '../themes/colors';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="COLLECTIONS"
                component={Home}
                options={{ headerTitleStyle: styles.headerTitleStyle, headerStyle: styles.headerStyle }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerTitleStyle: styles.headerTitleStyle, headerStyle: styles.headerStyle }}
            />
        </Stack.Navigator>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontFamily: 'OpenDyslexicAlt Nerd Font Bold',
        fontWeight: 600,
    },
    headerStyle: {
        backgroundColor: Colors.vintageWhite,
        shadowOpacity: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 0,
    },
});
