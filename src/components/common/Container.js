import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Header from './Header';

const Container = ({ goBack, children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header goBack={goBack} />
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Container;
