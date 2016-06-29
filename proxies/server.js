const Hapi = require('hapi')
const H2o2 = require('h2o2')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.register(H2o2)
    .then(err => {

        if (err)
            throw err

        server.route({
            path: '/proxy',
            method: '*',
            handler: {
                proxy: {
                    host: '127.0.0.1',
                    port: 65535,
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
