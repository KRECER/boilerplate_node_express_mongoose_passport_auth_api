import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import errorHandler from 'errorhandler'
import session from 'express-session'

import routes from '../app/routes/index'
import database from './database'
import config from '../config/db'
import passportManager from '../config/passport'

const server = express()

const isProduction = ( config.mode === 'development' ) ?
    false :
    true

server
    .use( bodyParser.json() )
    .use( bodyParser.urlencoded( { extended: false } ) )
    .use( morgan( 'dev' ) ) // TODO: change to tiny on prod
    .use( cors() )
    .use( helmet() )
    .use( session({
            secret: config.secret,
            cookie: { maxAge: config.maxAgeCookies },
            resave: false,
            saveUninitialized: false
        })
    )

if(!isProduction) {
    server.use( errorHandler() )
}


database.once('open', function() {
    routes(server)

    server.listen( config.port, () => console.log(`🚀 We are ready on port: ${config.port}`) )
})

server.use( passportManager.initialize() )

database.on('error', console.error.bind(console, 'connection error:'))