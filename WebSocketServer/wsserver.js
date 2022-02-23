const {User, UserSchema} = require("./Models/User");
const {Badging} = require("./Models/badging");

const mongooseLoader = require('./Loader/mongo.js');

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const WebSocketServer = require('ws').Server;
const port = 3001;

mongooseLoader();

const http = require('http')
const server = http.createServer(function (_, _) { });

var wss = new WebSocketServer({
    server: server
});

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

wss.on("message", function (event) {
    console.log(event);
})

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
                badging.save();
                //portSerial.write("1");
                break;
        }
    };
});

parser.on('data', function (data) {
    if (data.includes('ok')) {
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({ type: 'ok' }));
        });
        return;
    }
    const badge = data.replaceAll(' ', '');

    User.findOne({ badge: badge }).then(user => {
        if (user === null) {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ type: 'data', data: badge }));
            });
        } else {
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ type: 'user', data: user }));
            });
            let badging = new Badging({
                user: user
            })
            badging.save();
            //portSerial.write("1");
        }
    })
});

server.listen(port);
console.log(`Listening on port ${port}`);