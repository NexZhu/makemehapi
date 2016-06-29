const Hapi   = require('hapi')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.route({
    path: '/',
    method: 'GET',
    handler: (req, rep) => {
        rep('Hello hapi')
    },
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
