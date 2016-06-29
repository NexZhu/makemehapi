const Hapi = require('hapi')

const Fs   = require('fs')
const Path = require('path')

const rot13 = require('rot13-transform')()

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.route({
    path: '/',
    method: 'GET',
    handler: (req, rep) => {
        rep(Fs.createReadStream(Path.join(__dirname, 'content')).pipe(rot13))
    }
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
