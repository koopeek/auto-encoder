import * as Utils from './Utils.js';

const LEARNING_CONST = 0.1;

class Perceptron {

    constructor(number, wages) {
        this.number = number;
        this.wages = [...wages];
    }

    teachPerceptron(examples) {
        let pocket_record = {
            record: 0,
            wages: this.wages
        };

        let iterationsWithoutError = 0;

        let pocket = Object.assign({}, pocket_record);

        for (let i = 0; i < 10000; i++) {
            let example_number  = Utils.getRandomInt(10) + 1;
            let values          = examples[example_number];
            let correctAnswer   = values[this.number] === 1 ? 1 : -1;
            let ERR             = correctAnswer - this.getTresholdFunctionResult('learn', example_number, examples);

            if (ERR === 0) {
                pocket.record++;
                iterationsWithoutError++;
                if (iterationsWithoutError > 1000) {

                    if (pocket.record > pocket_record.record) {
                        Object.assign(pocket_record, pocket);
                    }

                    break;
                }
            } else {
                this.updateWages(ERR, examples, example_number);

                //Pocket replace after error for better performance
                if (pocket.record > pocket_record.record) {
                    Object.assign(pocket_record, pocket);
                }

                pocket.record  = 0;
                pocket.wages   = this.wages;
                iterationsWithoutError = 0;
            }
        }
        this.wages = pocket_record.wages;
    }

    updateWages(ERR, examples, example_number) {
        let values = examples[example_number];

        for (let j = 0; j <= 2500; j++) {
            this.wages[j] = this.wages[j] + (0.1 * ERR * values[j]);
        }
    }

    checkResultFromDisplay(examples, displayValues_rightArea, displayValues_leftArea) {
        let flag = false;
        if (this.getTresholdFunctionResult('check', null, examples, displayValues_leftArea) === 1) {
            flag = true;
        }

        const cells_RightArea = document.getElementsByClassName('grid-item-result');

        let self = this;
        Array.from(cells_RightArea).forEach(cell => {
            cell.classList.forEach(function(className) {
                if (className.startsWith('number')) {
                    let tmp_num = parseInt(className.substring(className.indexOf('-') + 1));
                    if (tmp_num === self.number) {
                        if (flag) {
                            displayValues_rightArea[tmp_num] = 1;
                            cell.style = 'background-color: pink;';
                        } else {
                            displayValues_rightArea[tmp_num] = 0;
                            cell.style = 'background-color: black;';
                        }
                       
                    }
                }
            });
        });

    }

    recursion(displayValues_rightArea) {
        for (let i = 1; i <= 3; i++) {
            let flag = false;
            if (this.getTresholdFunctionResultForRecursion(displayValues_rightArea) === 1) {
                flag = true;
            }
    
            const cells_RightArea = document.getElementsByClassName('grid-item-result');
            let self = this;
            Array.from(cells_RightArea).forEach(cell => {
                cell.classList.forEach(function(className) {
                    if (className.startsWith('number')) {
                        let tmp_num = parseInt(className.substring(className.indexOf('-') + 1));
                        if (tmp_num === self.number) {
                            if (flag) {
                                displayValues_rightArea[tmp_num] = 1;
                                cell.style = 'background-color: pink;';
                            } else {
                                displayValues_rightArea[tmp_num] = 0;
                                cell.style = 'background-color: black;';
                            }
                           
                        }
                    }
                });
            });
    
        }
    }

    getTresholdFunctionResult(action, example_number, examples, displayValues_leftArea) {
        let summary = 0.0;
        let values = examples[example_number];
        for (let s = 0; s <= 2500; s++) {
            if (action === 'learn') {
                summary += (this.wages[s] * values[s]);
            } else {
                summary += (this.wages[s] * displayValues_leftArea[s]);
            }
        }
        return (summary < 0 ? -1 : 1);
    }

    getTresholdFunctionResultForRecursion(displayValues_rightArea) {
        let summary = 0.0;
        for (let s = 0; s <= 2500; s++) {
            summary += (this.wages[s] * displayValues_rightArea[s]);
        }
        return (summary < 0 ? -1 : 1);
    }
}

export default Perceptron;