## DOCUMENTATION ##

![NodeJS](https://img.shields.io/badge/NodeJS-100%25-5FA04E?logo=nodedotjs)
![Sequelize](https://img.shields.io/badge/Sequelize-MySQL-blue?logo=sequelize)

#### Implement simple token based NodeJS API with login and signup route + POST, GET, DELETE and PATCH requests

***

#### Prerequisites

- Have a node environment installed
- Have a MariaDB database available

#### A bit of configuration

- Write a .env file and write the corresponding environment variables located in the config files <strong>(leave empty for testing)</strong> 

>
> .env file must have a JWT_KEY and a __DEV__ variable
>

- Run the following command to initiate config directory :

```
node config.js
```
#### Setup MySQL

- To set up the database, run the following command :

```
sequelize db:migrate
```

> Configuration and credentials from your database can be found in the config.json file. 

For more information about how sequelize works, you can find their documentation [here](https://sequelize.org/)

#### Run app

```
npm run start
```

### Using Docker

### You can have a test environment with MySQL installed directly [here](https://github.com/Manianise/api_nodejs_mysql)

```
docker pull mechameleon/api_nodejs:latest
```

```
docker run --env-file <ENV_FILE_IN_DIR> --name <CONTAINER> --network <CUSTOM_NETWORK> -dp 3000:3000 mechameleon/api_nodejs:latest
```
***
### Possible Env variables :

> Default credentials are root | null | default_db | 127.0.0.1

MYSQL_DEV_USER | MYSQL_DEV_PASSWORD | MYSQL_DEV_DB | MYSQL_DEV_HOST
:---------------:|:---------------:|:---------------:|:---------------:|
***
MYSQL_TEST_USER | MYSQL_TEST_PASSWORD | MYSQL_TEST_DB | MYSQL_TEST_HOST
:---------------:|:---------------:|:---------------:|:---------------:|
***
MYSQL_PROD_HOST | MYSQL_PROD_PASSWORD | MYSQL_PROD_DB | MYSQL_PROD_HOST
:---------------:|:---------------:|:---------------:|:---------------:|

