require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql",
    "logging": false,
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    }
  }
};