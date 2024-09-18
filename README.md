## DOCUMENTATION ##

![NodeJS](https://img.shields.io/badge/NodeJS-100%25-5FA04E?logo=nodedotjs)
![Sequelize](https://img.shields.io/badge/Sequelize-MariaDB-blue?logo=sequelize)

#### Implement simple token based NodeJS API with login and signup route + POST, GET, DELETE and PATCH requests

***

#### Prerequisites

- Have a node environment installed
- Have a MariaDB database available


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
docker run --name <CONTAINER> -e MARIADB_HOST=<MARIA_DB_CONTAINER_IP> --network <CUSTOM_NETWORK> -dp 5134:5134 mechameleon/api_nodejs:latest
```


