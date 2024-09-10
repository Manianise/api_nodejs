## DOCUMENTATION ##

![NodeJS](https://img.shields.io/badge/NodeJS-100%25-5FA04E?logo=nodedotjs)
![Sequelize](https://img.shields.io/badge/Sequelize-MySQL-blue?logo=sequelize)

#### Implement simple token based NodeJS API with login and signup route + POST, GET, DELETE and PATCH requests

***

#### Prerequisites

- Have a node environment installed
- Have a MySQL database available

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

Run the regular commands :

```
docker build . -t <NAME_OF_LOCAL_IMG> 
```

Or:

```
docker pull mechameleon/api_nodejs:latest
```

```
docker run --env-file <ENV_FILE_IN_DIR> --name <CONTAINER> --network <CUSTOM_NETWORK> -dp 3000:3000 mechameleon/api_nodejs:latest
```

