export const configs = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  dbURI: process.env.MONGODB_CONNECTION_STRING,
  database: process.env.DATABASE,
  accessTokenJwtSecret: process.env.JWT_SECRET,
  accessTokenExpiry: process.env.JWT_EXPIRY,
});
