## DOCUMENTATION ##

### Implement simple token based and login NodeJS API ###

![NodeJS](https://img.shields.io/badge/NodeJS-100%25-5FA04E?logo=nodedotjs)
![Sequelize](https://img.shields.io/badge/Sequelize-MySQL-blue?logo=sequelize)

#### Prerequisites

- Have a node environment installed
- Have a MySQL database available

#### Setup MySQL

To set up the database, run the following commands :

```
sequelize init --force
sequelize model:generate --name Member --attributes userId:integer,name:string,lastName:string,phone:string,email:string,url:string
sequelize model:generate --name User --attributes name:string,email:string,password:string
sequelize db:migrate

```

> Configuration and credentials from your database can be found in the config.json file. 

For more information about how sequelize works, you can find their documentation [here](https://sequelize.org/)

#### Run app

```
npm run start
```



