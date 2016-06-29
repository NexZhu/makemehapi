const Hapi  = require('hapi')
const Inert = require('inert')

const Path = require('path')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.register(Inert)
    .then(err => {

        if (err)
            throw err

        server.route({
            path: '/foo/bar/baz/{name?}',
            method: 'GET',
            handler: {
                directory: {
                    path: Path.join(__dirname, 'public'),
                    listing: true,
                },
            },
        })

        return server.start()
    })
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
