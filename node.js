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

server.get("/:value1/plus/:value2/is", (request, response) => {
    const {value1, value2} = request.params;
    const total = Number(value1) + Number(value2);
    const words = cardinalNumbers.numberToWords(total);
    if (isNaN(value1) || isNaN(value2)) {
        return response.send('please enter a Number');
    } else {
        return response.send("the total is set to " + `${words}`); 
    }
});

server.get('/send/:mail/', function(request, response) {
    const {mail} = request.params;
    let transporter = nodemailer.createTransport({
        host: 'outlook.live.com',
        port: 8000,
        secure: false, 
        auth: {
            user: 'mahmoud.techguy@hotmail.com', 
            pass: '*****' 
        }
    });
    
    let mailOptions = {
        from: '"Mahmoud Abdo" <mahmoud.techguy@hotmail.com>', 
        to: 'mahmoud.techguy@hotmail.com', 
        subject: 'Node JS', 
        text: 'Hello world'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        response.send("the mail has been sent");
    });
    
});    
