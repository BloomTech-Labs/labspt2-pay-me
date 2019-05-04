if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`\n** Server is listening on port: ${PORT} **\n`);
});
