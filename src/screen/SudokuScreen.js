import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import Loading from '../components/Loading';
import Sudoku from '../lib/Sudoku';
import { ONE_SECOND_IN_MS } from '../config';
import { sleep } from '../lib/utils';
import { shallowEqual, useSelector } from 'react-redux';
import Container from '../components/common/Container';
import { Colors, commonStyles } from '../assets/style';
import BtnBlock from '../components/sudokuBtn/BtnBlock';

const sudoku = new Sudoku(3);

const SudokuScreen = () => {
    const [loading, setLoading] = useState(true);
    const [sudokuNum, setSudokuNum] = useState([]);
    const [step, setStep] = useState([]);
    const [viewSudoKuNum, setViewSudokuNum] = useState([]);
    const [buildTime, setBuildTime] = useState(0);
    const [button, setButton] = useState([]);
    const [hint, setHint] = useState(false);
    const [numClick, setNumClick] = useState({
        clickId: '',
        status: false,
    });

    const { block, level } = useSelector(state => state.sudoku, shallowEqual);

    const setViewNumberHandler = useCallback(number => {
        const viewNumberSet = number.map(i =>
            i.map(v => ({
                id: v.id,
                type: v.num === '' ? 'input' : 'fixed',
                num: v.num === '' ? '' : v.num,
                hide: v.hide,
                selected: false,
                error: false,
                color: '',
            })),
        );
        setViewSudokuNum([...viewNumberSet]);
    }, []);

    const settingHandler = useCallback(async max => {
        setLoading(true);
        try {
            sudoku.max = max;
            sudoku.level = max;
            const response = await sudoku.createNumber(max);
            const temp = response.map(i => i.map(v => v));
            const viewNumber = sudoku.createViewNumber(temp);
            setSudokuNum([...response]);
            setViewNumberHandler(viewNumber);
            setButton(sudoku.number);
            setBuildTime(sudoku.time);
            setStep([]);
            // await sleep(100);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }, []);

    const hintHandler = useCallback(() => {
        setHint(!hint);
    }, [hint]);

    const allClearHandler = useCallback(() => {
        setViewNumberHandler(sudoku.viewSudokuNumber);
    }, []);

    const numberClickHandler = useCallback(
        item => {
            console.log(viewSudoKuNum, item);
            if (item.type === 'input') {
                if (numClick.clickId === item.id) {
                    setNumClick({
                        clickId: '',
                        status: false,
                    });
                } else {
                    setNumClick({
                        clickId: item.id,
                        status: true,
                    });
                }

                setViewSudokuNum(
                    viewSudoKuNum.map(i =>
                        i.map(v => {
                            if (
                                v.id === item.id &&
                                numClick.clickId !== item.id
                            ) {
                                return {
                                    ...v,
                                    selected: true,
                                };
                            } else {
                                return {
                                    ...v,
                                    selected: false,
                                };
                            }
                        }),
                    ),
                );
            }
        },
        [viewSudoKuNum, numClick],
    );
    const numberOutHandler = useCallback(() => {}, []);

    const setNumberHandler = useCallback(
        num => {
            if (numClick.status) {
                const selectNum = viewSudoKuNum
                    .find(i => i.find(v => v.selected))
                    .find(i => i.selected);
                const checkNumPosition = selectNum.id
                    .replace(/^id_/, '')
                    .split('_');
                const checkNum = sudoku.checkPossibleNumber(
                    parseInt(checkNumPosition[0]),
                    parseInt(checkNumPosition[1]),
                    num,
                    viewSudoKuNum,
                );

                setViewSudokuNum(
                    viewSudoKuNum.map(i =>
                        i.map(v => {
                            if (v.selected) {
                                return {
                                    ...v,
                                    num: num,
                                    error: !checkNum,
                                    color: !checkNum ? 'pink' : '',
                                };
                            } else {
                                if (!checkNum && v.num === num) {
                                    return {
                                        ...v,
                                        color: 'pink',
                                        error: false,
                                    };
                                } else {
                                    return {
                                        ...v,
                                        color: '',
                                        error: false,
                                    };
                                }
                            }
                        }),
                    ),
                );

                const checkStepIndex = step.findIndex(
                    i => i === selectNum.id.replace(/^id_/, ''),
                );
                if (checkStepIndex === -1) {
                    setStep(prevState => [
                        ...prevState,
                        selectNum.id.replace(/^id_/, ''),
                    ]);
                } else {
                    step.splice(checkStepIndex, 1);
                    setStep(step.concat(selectNum.id.replace(/^id_/, '')));
                }

                if (!checkNum) {
                    Vibration.vibrate(ONE_SECOND_IN_MS / 5);
                }
            } else {
                Alert.alert('', '숫자를 입력할 칸을 선택해 주세요.');
            }
        },
        [viewSudoKuNum, numClick.status, step],
    );

    const historyBackHandler = useCallback(() => {
        Alert.alert('기능 미구현', '되돌아가기는 다음버전에 구현예정입니다.');
    }, [step, viewSudoKuNum]);

    useEffect(() => {
        settingHandler(block).then(() => {});
        return () => {
            // promise.abort();
            setSudokuNum([]);
            setButton([]);
            setViewSudokuNum([]);
            setStep([]);
        };
    }, []);

    useEffect(() => {
        if (viewSudoKuNum.length > 0) {
            let allCheck = true;
            for (let i = 0; i < viewSudoKuNum.length; i++) {
                for (let j = 0; j < viewSudoKuNum[i].length; j++) {
                    if (
                        viewSudoKuNum[i][j].error ||
                        viewSudoKuNum[i][j].num === ''
                    ) {
                        console.log('errororororo', viewSudoKuNum[i][j]);
                        allCheck = false;
                        break;
                    }
                }
            }
            console.log('allChweck', allCheck);
            if (allCheck) {
                Alert.alert('Sudoku end', '아직 최종 검증은 안만들었다');
            }
        }
    }, [viewSudoKuNum]);

    /*useEffect(() => {
        settingHandler(block).then(() => {});
    }, [block]);*/

    useEffect(() => {
        console.log('step', step);
    }, [step]);

    return (
        <>
            <Loading visible={loading} />
            {!loading && (
                <Container goBack={true}>
                    <Text style={styles.buildTime}>
                        setting time:{buildTime} sec
                    </Text>
                    <View
                        style={[
                            commonStyles.pageRow,
                            { height: Dimensions.get('window').width },
                        ]}>
                        <View style={{ flex: 1, borderWidth: 1.5 }}>
                            {viewSudoKuNum.map((row, idx) => (
                                <View key={idx} style={[styles.numRow]}>
                                    {row.map((item, idy) => (
                                        <Pressable
                                            key={idy}
                                            style={({ pressed }) => [
                                                styles.numBox,
                                                idx % block === 0 &&
                                                    idx !== 0 &&
                                                    styles.topBorderLine,
                                                (idy + 1) % block === 0 &&
                                                    idy !== block * block - 1 &&
                                                    styles.rightBorderLine,
                                                ,
                                                item.type === 'fixed' &&
                                                    styles.fixedBox,
                                                item.color !== '' &&
                                                    styles.sameBox,
                                                item.selected &&
                                                    styles.selectedBox,
                                            ]}
                                            onPress={() =>
                                                numberClickHandler(item)
                                            }>
                                            <View
                                                style={[
                                                    styles.innerBox,
                                                    item.error &&
                                                        styles.errorBox,
                                                ]}>
                                                <Text style={styles.number}>
                                                    {hint && item.hide}
                                                    {!hint && item.num}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonWrap}>
                        <BtnBlock
                            number={button}
                            blockNum={block}
                            numClick={numClick}
                            setNumberHandler={setNumberHandler}
                            hintHandler={hintHandler}
                            allClearHandler={allClearHandler}
                            settingHandler={settingHandler}
                            historyBackHandler={historyBackHandler}
                            hint={hint}
                        />
                    </View>
                </Container>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
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
    fixedBox: {
        backgroundColor: '#eee',
    },
    selectedBox: {
        backgroundColor: 'rgb(210, 230, 255)',
    },
    sameBox: {
        backgroundColor: 'pink',
    },
    innerBox: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorBox: {
        borderWidth: 4,
        borderColor: 'red',
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    controller: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        marginBottom: 15,
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
    buttonWrap: {
        borderTopWidth: 1.5,
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 2,
        flex: 1,
        backgroundColor: Colors.Web,
        /*backgroundColor: Colors.sunflowerYellow,*/
    },
    topBorderLine: {
        borderTopWidth: 1.5,
    },
    rightBorderLine: {
        borderRightWidth: 1.5,
    },
});

export default SudokuScreen;
