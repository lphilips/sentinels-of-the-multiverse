var http = require('http'),
	express = require('express'),
    cloudtypes = require('cloudtypes').Server;

var cloudTypes = cloudtypes.createServer(),
	app = express(),
	server = http.createServer(app);

// Express settings

app.use(express.static(__dirname + '/../client'));
['css', 'img', 'js'].forEach(function (dir){
    app.use(express.static('/'+dir ,__dirname+'/../client/'+dir));
});
app.use(app.router);



function declareSentinelsHeroes(server) {
	return server
			.declare('Hero', new cloudtypes.CEntity([{name: 'string'}], {counter : 'CInt'}));
}

cloudTypes.declare('counter', cloudtypes.CInt);

server.listen(8080);
declareSentinelsHeroes(cloudTypes);
cloudTypes.publish(server);
