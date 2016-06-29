const Hapi = require('hapi')
const Joi  = require('joi')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.route({
    path: '/login',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean().required(),
                username: Joi.string().when('isGuest', {
                    is: false,
                    then: Joi.required(),
                }),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum(),
            })
                .options({allowUnknown: true})
                .without('password', 'accessToken'),
        },
    },
    handler: (req, rep) => {
        rep('login successful')
    },
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
