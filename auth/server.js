const Hapi  = require('hapi')
const Basic = require('hapi-auth-basic')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

users = {
    hapi: {
        username: 'hapi',
        password: 'auth',
    },
}

const validate = (req, username, password, cb) => {

    const user = users[username]

    if (!user || password !== user.password)
        return cb(null, false)

    return cb(null, true, {
        username: user.username,
    })
}

server.register(Basic)
    .then(err => {

        if (err)
            throw err

        server.auth.strategy('simple', 'basic', {
            validateFunc: validate,
        })

        server.route({
            path: '/',
            method: 'GET',
            config: {auth: 'simple'},
            handler: (req, rep) => {
                return rep({message: 'success'})
            },
        })

        return server.start()
    })
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
