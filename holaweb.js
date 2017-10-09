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
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results){
        let msj = results.response;
        session.send(`hola ${msj}`);

        session.beginDialog('/preguntarLugar');
    }
]);

bot.dialog('/preguntarLugar', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿De Donde Eres?');
    },
    function (session, results){
        let lugar = results.response;
        session.endConversation(`Que bonita ciudad ${lugar}`);
        session.beginDialog('/preguntarComida');
    }
]);

bot.dialog('/preguntarComida', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cuál es tu comida favorita?');
    },
    function (session, results){
        let comida = results.response;
        session.endConversation(`${comida} también es mi comida favorita`);
        session.beginDialog('/preguntarAños');
    }
]);

bot.dialog('/preguntarAños', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cuantos Años tienes?');
    },
    function (session, results){
        let Años = results.response;
        session.endConversation(`uyyy ${Años} eres muy joven`);
        session.beginDialog('/preguntarDeporte');
    }
]);

bot.dialog('/preguntarDeporte', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cuál es tu deporte favorito?');
    },
    function (session, results){
        let deporte = results.response;
        session.endConversation(` el ${deporte}?, uno de los mejores deportes`);
        session.beginDialog('/preguntarEquipofavorito');
    }
]);

bot.dialog('/preguntarEquipofavorito', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, '¿Cuál es tu equipo favorito en colombia?');
    },
    function (session, results){
        let equipo = results.response;
        session.endConversation(` del ${equipo}?, el equipo mas ganador en colombia`);
        session.beginDialog('/preguntarEquipofavorito');
    }

]);