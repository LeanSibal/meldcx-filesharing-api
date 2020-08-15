const {
  MONGO_HOST: host,
  MONGO_PORT: port,
  MONGO_USER: user,
  MONGO_PASSWORD: password,
  MONGO_DATABASE: database
} = process.env;
const config = {
  name: 'db',
  connector: 'mongodb',
  url: '',
  host: host || 'localhost',
  port: port || 27017,
  user: user || '',
  password: password || '',
  database: database || 'file-sharing'
};
