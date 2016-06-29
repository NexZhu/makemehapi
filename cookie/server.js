const Hapi = require('hapi')
const Boom = require('boom')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.state('session', {
    path: '/',
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost',
})

server.route({
    path: '/set-cookie',
    method: 'GET',
    config: {
        state: {
            parse: true,
            failAction: 'log',
        },
    },
    handler: (req, rep) => {
        return rep({message: 'success'})
            .state('session', {key: 'makemehapi'})
    },
})

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: (req, rep) => {

        const session = req.state.session

        let result = {}
        if (session && session.key)
            result = {user: 'hapi'}
        else
            result = Boom.unauthorized('Missing authentication')

        return rep(result)
    },
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
