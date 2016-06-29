const Hapi = require('hapi')
const Joi  = require('joi')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.route({
    path: '/chickens/{breed}',
    method: 'GET',
    config: {
        validate: {
            params: {
                breed: Joi.string().required(),
            },
        },
    },
    handler: (req, rep) => {
        rep('You asked for the chicken ' + encodeURIComponent(req.params.breed))
    },
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
