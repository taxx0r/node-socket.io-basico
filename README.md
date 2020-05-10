# Ejemplo básico de socket.io

Este ejemplo utiliza 2 archivos:
    1 - public/index.html (cliente)
    2 - server/server.js (servidor)

Resumo brevemente el funcionamiento importante

La inicialización del servidor utiliza las siguientes líneas:

```
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
````

Con eso declaramos todas las librerías que necesitamos utilizar.

Ahora elegimos el puerto que vamos a utilizar, el indicado en la variable de entorno o el 3000 si no hay ninguno configurado y ponemos el servidor a escuchar en ese puerto.

```
const port = process.env.PORT || 3000;

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
```

Una vez hecho esto, debemos poder acceder a la siguiente dirección:

http://localhost:3000/socket.io/socket.io.js

Si podemos ver un archivo javascript es que hemos realizado la configuración del servidor correctamente. Ahora debemos referenciar ese script en la parte del cliente (archivo index.html) antes del </body>.

````
<script src="socket.io/socket.io.js"></script>
````

El resumen del funcionamiento del ejemplo es que con los métodos 'on' escuchamos y con los métodos 'emit' enviamos.

Cuando desde cliente (javascript) enviamos un mensaje al servidor, por ejemplo con:

````
socket.emit('enviarMensaje', {
    usuario: 'Luis',
    mensaje: 'Hola'
}, function(resp) {
    console.log(resp);
});
```

Le pasamos 3 argumentos:
    1 - 'enviarMensaje' que es nombre que debemos escuchar en el servidor
    2 - el mensaje que estamos enviando, en este caso es un objeto con 2 propiedades (usuario y mensaje)
    3 - una función de callback para la retroalimentación, así el servidor nos puede decir si ha podido procesar correctamente el mensaje.


En ejemplo, si el objeto enviado como segundo parámetro incluye la propiedad usuario el servidor enviará un 'Todo salió bien!' en el callback y si no enviará un 'Todo salió maaal!'.

Veamos ahora esta parte en el servidor. 

```
client.on('enviarMensaje', (message, callback) => {

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
```

Como hemos dicho anteriormente el servidor también escuchará los eventos utilizando 'on' y el nombre del evento que quiere escuchar. No hay nada más que explicar en el código anterior pero hay que tener cuidado de ejecutar solo un callback, ya que esa llamada no detiene la ejecución del programa y podríamos enviar varios, dando lugar a confusión.

Todos los eventos que escucha el servidor o que envía a un cliente están dentro de:

```
io.on('connection', (client) => {
}
````


Para instalar y poder utilizar el ejemplo hay que hacer

```
npm install
```

Y ejecutarlo con 
```
node server/server 
```
o 
```
nodemon server/server
```


Más información en la documentación oficial de socket.io:

https://www.npmjs.com/package/socket.io