const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080),
})

server.route({
    path: '/upload',
    method: 'POST',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
        },
    },
    handler: (req, rep) => {
        
        const file = req.payload.file

        let body = ''
        file.on('data', data => {
            body += data
        })
        file.on('end', () => {
            rep({
                description: req.payload.description,
                file: {
                    data: body,
                    filename: file.hapi.filename,
                    headers: file.hapi.headers,
                },
            })
        })
    },
})

server.start()
    .then(err => {

        if (err)
            throw err

        server.log('info', 'Server running at: ' + server.info.uri)
    })
