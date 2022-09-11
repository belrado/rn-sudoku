import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../assets/style';

const BtnBlock = ({
    number,
    blockNum,
    numClick,
    hint,
    setNumberHandler,
    hintHandler,
    allClearHandler,
    settingHandler,
    historyBackHandler,
}) => {
    const [button, setButton] = useState([]);
    useEffect(() => {
        setButton([]);
        let Arr = new Array(Math.ceil(number.length / blockNum));
        for (let i = 0; i < Arr.length; i++) {
            Arr[i] = [];
            for (let j = 0; j < blockNum; j++) {
                Arr[i][j] = '';
            }
        }
        for (let i = 0; i < number.length; i++) {
            Arr[Math.floor(i / blockNum)][i % blockNum] = number[i];
        }
        setButton(Arr);
        return () => {
            setButton([]);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.numberBox}>
                {button.map((row, rIdx) => (
                    <View style={styles.numberRow} key={rIdx}>
                        {row.map((num, idx) => (
                            <Pressable
                                style={({ pressed }) => [
                                    styles.btn,
                                    pressed &&
                                        numClick.status &&
                                        styles.pressedBtn,
                                ]}
                                key={idx}
                                onPress={() => setNumberHandler(num)}>
                                <Text style={styles.blockText}>{num}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.controllerBox}>
                <Pressable
                    style={[
                        styles.btn,
                        styles.controller,
                        hint && styles.btnActive,
                    ]}
                    onPress={hintHandler}>
                    <Text style={[styles.blockText, hint && styles.textActive]}>
                        Hint
                    </Text>
                </Pressable>
                <TouchableOpacity
                    style={[styles.btn, styles.controller]}
                    onPress={historyBackHandler}>
                    <Text style={[styles.blockText]}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.controller]}
                    onPress={allClearHandler}>
                    <Text style={[styles.blockText]}>clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.controller]}
                    onPress={() => settingHandler(blockNum)}>
                    <Text style={[styles.blockText]}>reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    numberBox: {
        flex: 3,
    },
    numberRow: {
        flex: 1,
        flexDirection: 'row',
    },
    controllerBox: {
        flex: 1,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 1,
        borderRadius: 4,
        backgroundColor: Colors.Wff,
    },
    controller: {
        backgroundColor: Colors.sunflowerYellow,
    },
    pressedBtn: {
        backgroundColor: 'rgb(210, 230, 255)',
    },
    blockText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.darkGreyBlue,
    },
    btnActive: {
        backgroundColor: Colors.Grape,
        borderColor: Colors.Grape,
    },
    textActive: {
        color: Colors.Wff,
    },
});

export default BtnBlock;
