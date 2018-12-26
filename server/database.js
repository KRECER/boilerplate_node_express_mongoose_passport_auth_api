import mongoose from 'mongoose'
import config from '../config/db'

mongoose.promise = global.Promise
mongoose.set('useCreateIndex', true);

const mongoOpt = {
    useNewUrlParser: true
}

const isProduction = ( config.mode === 'development' ) ?
    false :
    true

mongoose.connect(config.url, mongoOpt)
mongoose.set('bufferCommands', false)

if (!isProduction) {
    mongoose.set('debug', true)
}

const { connection:database } = mongoose

export default database
