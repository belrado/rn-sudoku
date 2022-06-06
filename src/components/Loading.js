import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Modal } from 'react-native';

const Loading = ({ visible }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <ActivityIndicator size="large" color="rgb(99, 53, 180)" />
                <Text style={styles.text}>Loading</Text>
            </View>
            {/*<View style={styles.bg}></View>*/}
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    text: {
        fontSize: 16,
        paddingTop: 10,
        color: 'rgb(99, 53, 180)',
    },
    bg: {
        position: 'absolute',
        left: 0,
        top:0,
        right:0,
        bottom:0,
        backgroundColor: 'pink',
    }
});

export default Loading;
