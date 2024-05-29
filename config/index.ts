import 'dotenv/config';

const { NODE_ENV } = process.env;
const env = NODE_ENV || 'development';

export const applicationConfig = {
  isProduction: env === 'base',
  isDevelopment: env === 'development',
  app: {
    port: process.env.PORT || 3000,
  },

  db: {
    dbDialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
