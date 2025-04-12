const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres'); // Set PostgreSQL as default

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL', 'postgresql://resume_builder_db_gocp_user:jThDI5U2zGAoSHEH0VeXU9vxnq8Hoi1J@dpg-cvsetbeuk2gs739tv45g-a:5432/resume_builder_db_goop'),
        host: env('DATABASE_HOST', 'dpg-cvsetbeuk2gs739tv45g-a'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'resume_builder_db_goop'),
        user: env('DATABASE_USERNAME', 'resume_builder_db_gocp_user'),
        password: env('DATABASE_PASSWORD', 'jThDI5U2zGAoSHEH0VeXU9vxnq8Hoi1J'),
        ssl: env.bool('DATABASE_SSL', true) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },

    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
