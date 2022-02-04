const fs = require('fs');
const index = fs.readFileSync( './src/index.html');
const mongooseLoader = require('./Loader/mongo.js');

const SerialPort = require('serialport');
const {User, UserSchema} = require("./Models/User");
const {Badging} = require("./Models/badging");
const parsers = SerialPort.parsers;

mongooseLoader();

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

const http = require('http'),
    WebSocketServer = require('ws').Server,
    port = 3000,
    host = 'localhost';

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var wss = new WebSocketServer({
    server: server
});

wss.on('connection', function (client) {
    client.on('message', function (message) {
        let msg = JSON.parse(message);

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
                badging.save();
                portSerial.write( "1" );
                break;
        }
    });
});

// TODO tester si ca marche
parser.on('data', function(data) {
    if (data.includes('ok')) {
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({type: 'ok'}));
        });
        return;
    }
    const badge = data.replaceAll(' ', '');

    User.findOne({badge: badge}).then(user => {
        if (user === null) {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({type: 'data', data: badge}));
            });
        } else {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({type: 'user', data: user}));
            });
            let badging = new Badging({
                user: user
            })
            badging.save();
            portSerial.write("1");
        }
    })

});

server.listen(3000);