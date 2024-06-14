const http = require('http');
const websocket = require('websocket');

const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

const wsServer = new websocket.server({
  httpServer: server,
  autoAcceptConnections: false
});

const rooms = {}; // Store connected clients for each room

wsServer.on('request', function(request) {
  const roomID = request.resourceURL.pathname.substring(1); // Extract room ID from URL path
  if (!rooms[roomID]) {
    rooms[roomID] = [];
  }

  const connection = request.accept(null, request.origin);
  rooms[roomID].push(connection); // Store the connection in the appropriate room

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received: ' + message.utf8Data);

      // Broadcast the message to all clients in the same room
      rooms[roomID].forEach(function(client) {
        if (client !== connection && client.readyState === websocket.OPEN) {
          client.sendUTF(message.utf8Data);
        }
      });
    }
  });

  connection.on('close', function(reasonCode, description) {
    const index = rooms[roomID].indexOf(connection);
    if (index !== -1) {
      rooms[roomID].splice(index, 1);
    }
  });
});

server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});
