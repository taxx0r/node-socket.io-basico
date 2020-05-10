const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Servidor',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('enviarMensaje', (message, callback) => {
        console.log(message);

        if (message.usuario) {
            callback({
                resp: 'Todo salió bien!'
            });
        } else {
            callback({
                resp: 'Todo salió maaal!'
            });
        }
    });
});

const path = require('path');

const publicPath = path.resolve(__dirname, '../public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});