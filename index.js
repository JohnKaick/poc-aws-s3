'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server()
server.connection({ port: 9090 })

server.register({ register: require('inert') }, function (err) {
    if (err) {
        console.error('ERROR: ' + err)
    } else {
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'client/',
                    redirectToSlash: true,
                    index: true
                }
            },
            config: {
                auth: false
            }
        })

        server.route({
            method: 'POST',
            path: '/arquivo',
            config: {
                payload: {
                    timeout: false,
                    maxBytes: 2097150200,
                    output: 'file'
                },
                timeout: {
                    server: false,
                    socket: false
                },
                handler: require('./server/index')
            }
        });
    }
})

require('dotenv').config()

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});