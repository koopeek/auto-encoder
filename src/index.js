import Perceptron from './Perceptron.js';
import * as Utils from './Utils.js';
import examples from './Examples.js';


let Perceptrons                 = [];
let displayValues_leftArea      = [];
let displayValues_rightArea     = [];
let currentExample_number       = 0;

const currentExample            = [];

//Initialize array with Perceptrons
for (let i = 1; i <= 2500; i++) {
    Perceptrons[i] = new Perceptron(i, Utils.getRandomWages());
}

//Initialize grid with pixels
setTimeout(function() {
    Utils.generateGrid(50, 50);
    initializeGridValues();
    loadExamples();
    addEventListeners();
}, 200);

function addEventListeners() {
    const cells_leftArea             = document.getElementsByClassName('grid-item');
    const leranButton                = document.getElementById('button-learn');
    const nextExample                = document.getElementById('nextExample');
    const previousExample            = document.getElementById('previousExample');
    const checkResultButton          = document.getElementById('button-check');
    const recursionButton            = document.getElementById('button-recursion');

    Array.from(cells_leftArea).forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            cell.classList.forEach(function(className) {
                if (className.startsWith('number')) {
                    updateGridValuesAndColor(className.substring(className.indexOf('-') + 1), cell);
                }
            });
        });
    });

    leranButton.addEventListener('click', function() {
        for (let i = 1; i <= 2500; i++) {
            Perceptrons[i].teachPerceptron(examples);
        }
        window.alert("Learning has ended.")
    });

    checkResultButton.addEventListener('click', function() {
        for (let i = 1; i <= 2500; i++) {
            Perceptrons[i].checkResultFromDisplay(examples, displayValues_rightArea, displayValues_leftArea);
        }
    });

    recursionButton.addEventListener('click', function() {
        for (let i = 1; i <= 2500; i++) {
            Perceptrons[i].recursion(displayValues_rightArea);
        }
    });

    previousExample.addEventListener('click', function() {
        if (currentExample_number - 1 < 1) {
            window.alert('There is no more examples.');
        } else {
            currentExample_number = currentExample_number - 1;
            setDisplayValues(examples[currentExample_number]);
            updateDisplayExampleNumber(currentExample_number);
        }
    });

    nextExample.addEventListener('click', function() {
        if (currentExample_number + 1 > 11) {
            window.alert('There is no more examples.');
        } else {
            currentExample_number = currentExample_number + 1;
            setDisplayValues(examples[currentExample_number]);
            updateDisplayExampleNumber(currentExample_number);
        }
    });
} 

function loadExamples() {
    for (let i = 1; i <= 11; i++) {
        let tmp_values = [];
        const values = examples[i.toString()];
        values.forEach(value => tmp_values.push(parseInt(value)));
        examples[i] = tmp_values;
    }
    currentExample_number = 5;
    setDisplayValues(examples[5]);
    updateDisplayExampleNumber(5);
}

function setDisplayValues(values) {
    const cells_leftArea  = document.getElementsByClassName('grid-item');
    Array.from(cells_leftArea).forEach(cell => {
        cell.classList.forEach(function(className) {
            if (className.startsWith('number')) {
                const num                       = className.substring(className.indexOf('-') + 1);
                displayValues_leftArea[num]     = values[num];

                if (values[num] === 1) {
                    cell.style = 'background-color: pink;';
                } else {
                    cell.style = 'background-color: black;';
                }
            }
        });
    });
}

function updateDisplayExampleNumber(number) {
    const element = document.getElementById('currentExampleNumber');
    element.textContent = `Example number: ${number}`;
}

function initializeGridValues() {
    for (let i = 1; i <= 2500; i++) {
        displayValues_leftArea[i] = 0;
        displayValues_rightArea[i] = 0;
    }
    displayValues_leftArea[0] = 1;
    displayValues_rightArea[0] = 1;
}

function updateGridValuesAndColor(number, cell) {
    if (displayValues_leftArea[number] === 0) {
        displayValues_leftArea[number] = 1;
        cell.style = 'background-color: pink;';
    } else {
        displayValues_leftArea[number] = 0;
        cell.style = 'background-color: black;';
    }
}
