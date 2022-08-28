import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Container from '../components/common/Container';
import { commonStyles } from '../assets/style';

const SettingScreen = () => {
    return (
        <Container goBack={true}>
            <View style={commonStyles.pageRow}>
                <Text>Sudoku</Text>
                <View style={styles.optionBox}>
                    <Text>Vibration</Text>
                    <Pressable>
                        <Text>On</Text>
                    </Pressable>
                    <Pressable>
                        <Text>Off</Text>
                    </Pressable>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    optionBox: {
        flexDirection: 'row',
    },
});

export default SettingScreen;
