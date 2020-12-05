module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://bridgette:Renly2357@localhost/phonebook",
  jwtSecret: process.env.jwtSecret || 'jwtSecret',
  AWSAccessKeyId: process.env.AWSAccessKeyId || 'AWSAccessKeyId',
  AWSSecretKey: process.env.AWSSecretKey || "AWSSecretKey",
  Bucket: process.env.Bucket || "Bucket"
};
