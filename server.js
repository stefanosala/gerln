var connect = require('connect');
console.log('Starting server with port: ' + process.env.PORT);
connect.createServer(connect.static(__dirname + '/public')).listen(process.env.PORT || 3000);