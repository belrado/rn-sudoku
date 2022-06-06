import { sleep } from "./utils";

class Sudoku {
    time;
    max;
    number;

    constructor(max = 2) {
        this.time = new Date();
        this.max = max;
        this.setNumber();
        //git this.number = Array(Math.floor(this.max * this.max)).fill().map((val, idx) => idx + 1);
    }

    setNumber() {
        this.number = Array(Math.floor(this.max * this.max)).fill().map((val, idx) => idx + 1);
    }

    createNumber(max) {
        return new Promise( async (resolve, reject) => {
            try {
                await sleep(10);
                const time = new Date();
                this.max = max ?? this.max;
                this.setNumber();
                const loopMaxNum = Math.floor(this.max * this.max)
                const sudokuNumber = [];
                sudokuNumber[0] = this.createFistLineNumber();

                for (let i = 1; i < loopMaxNum; i++) {
                    let back = false;
                    let boxBack = false;
                    let boxAllBack = false;

                    sudokuNumber.push([]);
                    for (let j = 0; j < loopMaxNum; j++) {
                        let rowNumber = this.number;

                        for (let k = 0; k < sudokuNumber.length-1; k++) {
                            rowNumber = rowNumber.filter(num => num !== sudokuNumber[k][j]);
                        }

                        for (let k = 0; k < sudokuNumber[i].length; k++) {
                            rowNumber = rowNumber.filter(num => num !== sudokuNumber[i][k]);
                        }

                        // box number
                        let boxX = Math.floor(i / this.max) * this.max;
                        let boxY = Math.floor(j / this.max) * this.max;
                        for (let k = boxX; k < boxX + this.max; k++) {
                            for (let h = boxY; h < boxY + this.max; h++) {
                                try {
                                    rowNumber = rowNumber.filter(num => num !== sudokuNumber[k][h]);
                                } catch(e) {}
                            }
                        }

                        const fixNum = Math.floor(Math.random() * rowNumber.length);
                        if (rowNumber[fixNum] === undefined) {
                            boxBack = true;
                            break;
                        }
                        sudokuNumber[i].push(rowNumber[fixNum]);
                        if ((i+1)% this.max === 0 && i !== 0 && (j+1)% this.max === 0 && j !== 0) {
                            if (!this.checkBox(i, j, sudokuNumber)) {
                                boxAllBack = true;
                                break;
                            }
                        }
                    }
                    if (back) {
                        sudokuNumber.splice(-1, 1);
                        i--;
                    }
                    if (boxBack) {
                        const boxX = Math.floor(i / this.max) * this.max;
                        const clear = i - boxX;
                        if (clear > 0) {
                            sudokuNumber.splice(-(clear), clear);
                            i -= clear;
                        } else {
                            sudokuNumber.splice(-1, 1);
                            i--;
                        }
                    }
                    if (boxAllBack) {
                        sudokuNumber.splice(-(this.max), this.max);
                        i -= this.max;
                    }
                }
                this.checkRunTime(time, new Date());
                resolve(sudokuNumber);
            } catch (e) {
                reject(e);
            }
            //return sudokuNumber;
        });
    }

    createFistLineNumber() {
        let firstTemp = this.number;
        let firstRow = [];
        for (let i = 0; i < Math.floor(this.max * this.max); i++) {
            const fixNum = Math.floor(Math.random() * firstTemp.length);
            if (firstRow.indexOf(firstTemp[fixNum]) === -1) {
                firstRow.push(firstTemp[fixNum]);
                firstTemp = firstTemp.filter(num => num !== firstTemp[fixNum]);
            } else {
                i--;
            }
        }
        return firstRow;
    }

    checkBox(x, y, sudokuNumber) {
        let checkNum = [];
        for (let i = x-(this.max-1); i < this.max-(this.max-1) + x; i++) {
            for (let j = y-(this.max-1); j < this.max-(this.max-1) + y; j++) {
                checkNum.push(sudokuNumber[i][j]);
            }
        }
        const set = new Set(checkNum);
        if (set.size < checkNum.length) {
            return false;
        } else {
            return true;
        }
    }

    checkRunTime(time, time2) {
        const t = time2.getTime() - time.getTime();
        const rt = parseInt(t) / 1000;
        console.log(rt + ' sec');
        this.time = rt;
        return rt;
    }
}

export default Sudoku;
