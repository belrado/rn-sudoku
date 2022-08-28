import React, { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    Vibration,
    View,
} from 'react-native';
import SudokuScreen from './src/screen/SudokuScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStack from './src/navigation/RootStack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
