let mongoose = require('mongoose')
let config = require('config')
let dbUri = config.database.uri
let options = config.database.options

mongoose.connect(dbUri, options);

mongoose.connection.on('connected', function () {
    console.log('MongoDB connected')
})

mongoose.connection.on('error', function () {
    console.log('error while connecting to mongodb')
})

mongoose.connection.on('disconnected', function () {
    console.log('MongoDB disconnected')
})

mongoose.connection.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('DB connection terminated by application')
        process.exit(0)
    });
})