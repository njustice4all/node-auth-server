const defaultConfig = {
  PORT: process.env.PORT || 8000,
};

const config = {
  development: {
    DB_URL: 'mongodb://localhost/user-authentication-dev',
    JWT_SECRET: 'helloworld',
  },
  production: {
    DB_URL: 'mongodb://localhost/user-authentication-prod',
  },
};

const getEnv = env => config[env];

export default {
  ...defaultConfig,
  ...getEnv(process.env.NODE_ENV),
};
