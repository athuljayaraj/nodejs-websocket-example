var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510});

var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var express = require("express");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
    switch (message) {
    	case "connected":
    		ws.send('Positive');
    		break;
    	case "send data":
    		sendData(ws);
    		break;
		case "send meta":
    		sendMeta(ws);
    		break;
		default:
			ws.send("What do you want?")
			break;
    }
  });
});


var csv = require('csv');
var filePath = '/home/athul/git/getting-started-nodejs/data/data.csv';

function sendData(ws) {
	var obj = csv();
	var MyData = [];

	ws.send("Data following...")

	obj.from.path(filePath).to.array(function (data) {
	    for (var index = 0; index < data.length; index++) {
	        MyData.push(data[index]);
	        ws.send(data[index].join());
	    }		
		console.log('Data sent');
		return MyData;
	});
}

function sendMeta(ws) {
	var obj = csv();
	var MyData = [];

	var meta = genMeta();

    ws.send(JSON.stringify(meta));
 	console.log('Meta sent');
 	return meta;	
};


function genMeta() {
	return {
		state: 'state1',
		event: 'event1'
	};
}