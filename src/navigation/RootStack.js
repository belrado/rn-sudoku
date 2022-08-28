import React, { useCallback, useEffect } from 'react';
import MainScreen from '../screen/MainScreen';
import SudokuScreen from '../screen/SudokuScreen';
import SettingScreen from '../screen/SettingScreen';

const {
    createNativeStackNavigator,
} = require('@react-navigation/native-stack');
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Sudoku" component={SudokuScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
    );
};

export default RootStack;
