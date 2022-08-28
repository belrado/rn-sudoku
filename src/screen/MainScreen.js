import React, { useCallback } from 'react';
import {
    Text,
    Image,
    Pressable,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Container from '../components/common/Container';
import { SUDOKU_BLOCK, SUDOKU_LEVEL } from '../config';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Colors, commonStyles } from '../assets/style';
import { setBlock } from '../features/sudokuSlice';
import resource from '../lib/resource';

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { block, level } = useSelector(state => state.sudoku, shallowEqual);
    const selectBlockHandler = useCallback(num => {
        dispatch(setBlock(num));
    }, []);
    const playSudokuHandler = useCallback(() => {
        navigation.navigate('Sudoku');
    }, []);
    const settingHandler = useCallback(() => {
        navigation.navigate('Setting');
    }, []);
    return (
        <Container>
            <View style={[commonStyles.pageRow, { flex: 1 }]}>
                <View style={{ marginBottom: 20 }}>
                    {SUDOKU_BLOCK.map(num => (
                        <Pressable
                            key={num}
                            style={[
                                styles.blockBtn,
                                block === num && styles.btnActive,
                            ]}
                            onPress={() => selectBlockHandler(num)}>
                            <Text
                                style={[
                                    styles.blockText,
                                    block === num && styles.textActive,
                                ]}>
                                Block {num * num} x {num * num}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View style={{ marginBottom: 20 }}>
                    {SUDOKU_LEVEL.map(num => (
                        <Pressable
                            key={num}
                            style={[
                                styles.blockBtn,
                                num === level
                                    ? styles.btnActive
                                    : styles.lockBtn,
                            ]}>
                            {num !== level && (
                                <Image
                                    source={resource.icon.lockLine}
                                    style={{ marginRight: 5 }}
                                />
                            )}
                            <Text
                                style={[
                                    styles.blockText,
                                    level === num
                                        ? styles.textActive
                                        : styles.lockText,
                                ]}>
                                Level {num}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.blockBtn, styles.playBtn]}
                    onPress={playSudokuHandler}>
                    <Text style={[styles.blockText, styles.playText]}>
                        Play
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.blockBtn, styles.settingBtn]}
                    onPress={settingHandler}>
                    <Text style={styles.blockText}>Setting</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    blockBtn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.sunflowerYellow,
        backgroundColor: Colors.sunflowerYellow,
        marginBottom: 10,
    },
    blockText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkGreyBlue,
    },
    btnActive: {
        backgroundColor: Colors.Grape,
        borderColor: Colors.Grape,
        height: 50,
    },
    textActive: {
        color: Colors.Wff,
    },
    levelBtn: {},
    lockBtn: {
        flexDirection: 'row',
        backgroundColor: Colors.Web,
        borderColor: Colors.Web,
    },
    lockText: {
        fontWeight: 'normal',
    },
    playBtn: {
        flex: 1,
    },
    playText: {
        fontSize: 40,
    },
    settingBtn: {
        marginBottom: 0,
    },
});

export default MainScreen;
