const config = {
    MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost/bestdata',
    secret: process.env.SECRET || 'thisismysupersecretkey',
    API_VERSION: process.env.API_VERSION || 'v1',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10
};

module.exports = config;
