const express = require("express");
const server = express();
const cardinalNumbers = require('v-number-to-words');
const nodemailer = require('nodemailer');

const port = 8000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

server.get('/:value/', function(request, response) {
    response.send("the value is " + request.params.value);
});

server.get('/:value1/plus/value2/is/', function(request, response) {
    const {value1, value2} = request.params;
    const total = Number(value1) + Number(value2);
    response.send("the total is set to " + `${total}`);
});

server.get("/:value1/plus/:value2/is", (request, response) => {
    const {value1, value2} = request.params;
    const total = Number(value1) + Number(value2);
    const words = cardinalNumbers.numberToWords(total);
    response.send("the total is set to " + `${words}`);
});




  

