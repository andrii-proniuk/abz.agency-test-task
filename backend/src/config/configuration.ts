export default () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT) || 4200,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  aes: {
    key: Buffer.from(process.env.AES_KEY, 'hex'),
    expiration: parseInt(process.env.AES_EXPIRATION) || 1000 * 60 * 40, // default - 40 minutes
  },
  tinify: {
    apiKey: process.env.TINIFY_API_KEY,
  },
});
