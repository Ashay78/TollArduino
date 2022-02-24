const moment = require('moment');

// ######################
// Import Mongoose Models
// ######################
const mongooseLoader = require('./Loader/mongo.js');
const { User } = require("./Models/User");
const { Badging } = require("./Models/badging");
mongooseLoader();

// #####################
// Init websocket server
// #####################
const WebSocketServer = require('ws').Server;
const port = 3001;

const http = require('http');
const server = http.createServer(function (_, _) { });
var wss = new WebSocketServer({
    server: server
});

// On connection add an event listener for message reception
wss.on('connection', function (client) {
    client.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        switch (msg.type) {
            case 'registration':
                let user = new User({
                    firstname: msg.data.firstname,
                    lastname: msg.data.lastname,
                    badge: msg.data.badge
                })
                user.save();

                let badging = new Badging({
                    user: user
                })
                badging.save().then(elem => {
                    wss.clients.forEach(function each(client) {
                        sendInformation(client);
                        client.send(JSON.stringify({ type: 'changeState', data: 'green' }));
                    });
                    portSerial.write("1");

                });
                break;
            case 'informationRequest':
                sendInformation(client);
                break;
        }
    };
});

function sendInformation(client) {
    User.find().then(users => {
        client.send(JSON.stringify({ type: 'users', data: users }));
    });

    Badging.find({
        'date': {
            $gte: moment().subtract(0, 'day').startOf('day'),
            $lte: moment().subtract(0, 'day').endOf('day')
        }
    }).then(badgings => {
        client.send(JSON.stringify({ type: 'badges', data: badgings }));
    });

    var weeklyStat = []
    for(let i = 7; i >= 0; i--){
        Badging.count({
            'date': {
                $gte: moment().subtract(i, 'day').startOf('day'),
                $lte: moment().subtract(i, 'day').endOf('day')
            }
        }).then(count => {
            weeklyStat[6-i] = count;
            if(!weeklyStat.includes(null)){
                client.send(JSON.stringify({
                    type: 'weeklyStat', data: weeklyStat
                }));
            }
        })
    }
}

// ##############################
// Init transactions with arduino
// ##############################
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

const portSerial = new SerialPort('/dev/cu.usbmodem11401',{
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

portSerial.pipe(parser);

parser.on('data', function (data) {
    if (data.includes('ok')) {
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({ type: 'changeState', data: 'red' }));
        });
        return;
    }
    const badge = data.replaceAll(' ', '');

    User.findOne({ badge: badge }).then(user => {
        if (user === null) {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ type: 'registrationNeeded', data: badge }));
            });
        } else {
            let badging = new Badging({
                user: user
            });
            badging.save().then(elem => {
                wss.clients.forEach(function each(client) {
                    sendInformation(client);
                    client.send(JSON.stringify({ type: 'changeState', data: 'green' }));
                });
                portSerial.write("1");
            });
        }
    })
});



server.listen(port);
console.log(`Listening on port ${port}`);