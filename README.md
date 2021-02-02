# BASIC AUTH BACKEND Simple project
## API | express with sequelize

### Configuration
Config based enviroment setup
1. please create this file
`.env`
```
NODE_ENV=development #or production

SERVER_PORT="3000"

MYSQL_DB = basic_auth
MYSQL_HOST = localhost
MYSQL_USERNAME = shukri
MYSQL_PASSWORD = 123456

ACCESS_TOKEN_SECRET=1615b2e116e991095...
REFRESH_TOKEN_SECRET=6b8169c22668ff539...
```

2. DB used MySQL with [Sequelize ORM](https://sequelize.org/)
Just do this command
```sh
npx sequelize db:create 
npx sequelize db:migrate
```

3. To run local
```sh
$ yarn start
```
