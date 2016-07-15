module.exports = {
    development: {
        isProduction: false,
        port: process.env.SERVER_PORT,
        app: {
            name: 'Server Development'
        }
    },
    production: {
        isProduction: true,
        port: process.env.SERVER_PORT,
        app: {
            name: 'Server Production'
        }
    }
}[process.env.NODE_ENV || 'development'];
