const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Define the folder and file paths
const folderPath = path.join(__dirname, 'config');
const filePath = path.join(folderPath, 'config.json');

// Create the config object
const config = {
  development: {
    username: !process.env.MYSQL_DEV_USER ? "root" : process.env.MYSQL_DEV_USER,
    password: !process.env.MYSQL_DEV_PASSWORD ? null : process.env.MYSQL_DEV_PASSWORD,
    database: !process.env.MYSQL_DEV_DB ? "default_db" : process.env.MYSQL_DEV_DB,
    host: !process.env.MYSQL_DEV_HOST ? "127.0.0.1" : process.env.MYSQL_DEV_HOST,
    dialect: 'mysql',
  },
  test: {
    username: !process.env.MYSQL_TEST_USER ? "root" : process.env.MYSQL_TEST_USER,
    password: !process.env.MYSQL_TEST_PASSWORD ? null : process.env.MYSQL_TEST_PASSWORD,
    database: !process.env.MYSQL_TEST_DB ? "default_db" : process.env.MYSQL_TEST_DB,
    host: !process.env.MYSQL_TEST_HOST ? "127.0.0.1" : process.env.MYSQL_TEST_HOST,
    dialect: 'mysql',
  },
  production: {
    username: !process.env.MYSQL_PROD_USER ? "root" : process.env.MYSQL_PROD_HOST,
    password: !process.env.MYSQL_PROD_PASSWORD ? null : process.env.MYSQL_PROD_PASSWORD,
    database: !process.env.MYSQL_PROD_DB ? "default_db" : process.env.MYSQL_PROD_DB,
    host: !process.env.MYSQL_PROD_HOST ? "127.0.0.1" : process.env.MYSQL_PROD_HOST,
    dialect: 'mysql',
  },
};

// Create the folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Write the config object to config.json
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
