import React, { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import Sudoku from './src/lib/Sudoku';
import Loading from "./src/components/Loading";
import { sleep } from "./src/lib/utils";
const sudoku = new Sudoku(3);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [sudokuNum, setSudokuNum] = useState([]);
    const [maxNum, setMaxNum] = useState(3);
    const [buildTime, setBuildTime] = useState(0);
    const [button, setButton] = useState([]);

    const setMaxNumHandler = useCallback(async num => {
        setMaxNum(num);
    }, []);

    const settingHandler = useCallback(async max => {
        setLoading(true);
        try {
            const response = await sudoku.createNumber(max);
            setSudokuNum([...response]);
            setButton(sudoku.number);
            setBuildTime(sudoku.time);
            //await sleep(2000)
            setLoading(false);
        } catch(e) {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        settingHandler(maxNum).then(() => {
        });
        return () => {
            setSudokuNum([]);
            setButton([]);
        };
    }, []);

    useEffect(() => {
        settingHandler(maxNum).then(() => {
        });
    }, [maxNum]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.h1}>Belrado Sudoku</Text>
                <Text style={styles.ver}>Ver 1.0.0</Text>
            </View>
            <Text style={styles.buildTime}>setting time:{buildTime} sec</Text>
            <View style={[styles.sudokuWrap, { height: Dimensions.get('window').width, }]}>
                {sudokuNum.map((row, idx) => (
                    <View key={idx} style={styles.numRow}>
                        {row.map(num => (
                            <Pressable key={num} style={[styles.numBox]}>
                                <Text style={styles.number}>{num}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.controller}>
                <Pressable
                    style={[styles.maxBtn, maxNum === 2 && styles.activeMaxBtn]}
                    onPress={() => setMaxNumHandler(2)}>
                    <Text style={ maxNum === 2 && styles.activeText}>2</Text>
                </Pressable>
                <Pressable
                    style={[styles.maxBtn, maxNum === 3 && styles.activeMaxBtn]}
                    onPress={() => setMaxNumHandler(3)}>
                    <Text style={ maxNum === 3 && styles.activeText}>3</Text>
                </Pressable>
                <Pressable
                    style={[styles.maxBtn, maxNum === 4 && styles.activeMaxBtn]}
                    onPress={() => setMaxNumHandler(4)}>
                    <Text style={ maxNum === 4 && styles.activeText}>4</Text>
                </Pressable>
                <Pressable
                    style={styles.resetBtn}
                    onPress={() => settingHandler(maxNum)}>
                    <Text>Reset</Text>
                </Pressable>
            </View>
            <View style={styles.buttonWrap}>
                {button.map(num => (
                    <Pressable key={num}>
                        <Text>{num}</Text>
                    </Pressable>
                ))}
            </View>
            <Loading visible={loading} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: 'rgb(99, 53, 180)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    ver: {
        fontSize: 10,
        color: '#fff',
    },
    buildTime: {
        fontSize: 12,
        lineHeight: 16,
        paddingLeft: 10,
        paddingTop: 10,
    },
    sudokuWrap: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    numRow: {
        flexDirection: 'row',
        flex: 1,
    },
    numBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    controller: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maxBtn: {
        width: 40,
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    activeMaxBtn: {
        backgroundColor: 'rgb(99, 53, 180)',
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resetBtn: {
        borderWidth: StyleSheet.hairlineWidth,
        width: 140,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrap: {
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});

export default App;
