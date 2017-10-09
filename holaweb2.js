var restify = require('restify'); //web server restify
var builder = require('botbuilder');

//Crear servidor
var server = restify.createServer();

//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port || 
    process.env.PORT || 
    3978, function(){
        console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

// Diálogos

bot.dialog('/',[// Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session){// objeto llamado sesiòn
        session.send('\nHola Mundo\n'); //este objeto es la manera de conectar con los usuarios
    }
]);