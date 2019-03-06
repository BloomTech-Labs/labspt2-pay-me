// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
<<<<<<< HEAD
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    }
=======
      filename: './data/payMe.db'
    },
    useNullAsDefault:true,
    migrations:{
      directory:'./data/migrations'
    },
    seeds:{
      directory:'./data/seeds'
    },
>>>>>>> 755489c63ea4ed27cabb4c9b79038747070f48de
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
