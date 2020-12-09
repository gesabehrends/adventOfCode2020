const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { day } = argv;
const inputFile = `input_day_${day}`;

let inputData = "";

fs.readFile(inputFile, function(err, data) {
    inputData = data.toString();
    const { solution } = require(`./day_${day}.js`);
    solution(inputData.split('\n'));
});
