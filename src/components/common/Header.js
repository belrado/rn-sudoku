import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { APP_HEADER_NAME } from '../../config';
import resources from '../../lib/resource';
import { useNavigation } from '@react-navigation/native';

const Header = ({ goBack }) => {
    const navigation = useNavigation();
    const goBackHandler = useCallback(() => {
        navigation.goBack();
    }, []);
    return (
        <View style={styles.header}>
            <Text style={styles.h1}>{APP_HEADER_NAME}</Text>
            {goBack && (
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={goBackHandler}>
                    <Image source={resources.icon.closeWhite} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: 'rgb(99, 53, 180)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    h1: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    closeBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header;
