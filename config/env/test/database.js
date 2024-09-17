module.exports = ({ env }) => ({
    connection: {
        client: 'sqlite',
        connection: {
        filename: env('testDB', '.tmp/test.db'),
        },
        useNullAsDefault: true,
        debug: false
    },
});