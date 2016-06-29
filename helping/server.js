const Hapi   = require('hapi')
const Vision = require('vision')

const Path = require('path')

const Handlebars = require('handlebars')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.register(Vision)
    .then(err => {

        if (err)
            throw err

        server.views({
            engines: {html: Handlebars},
            path: Path.join(__dirname, 'templates'),
            helpersPath: Path.join(__dirname, 'helpers'),
        })

        server.route({
            path: '/',
            method: 'GET',
            handler: {view: 'index.html'},
        })

        return server.start()
    })
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
