
require('dotenv').config();

module.exports = {
   "type": "postgres",
   "host": process.env.HOST_URL ||  "localhost",
   "port": parseInt(process.env.PORT_DATABASE) || 5432,
   "username": process.env.USER_DATABASE || "postgres",
   "password": process.env.PASSWORD_DATABASE || "123",
   "database": process.env.DATABASE_NAME || "financeData",
   "logging": false,
   "entities": ["src/entity/*.ts", "./build/src/entity/*.js", "src/*.entity.ts"],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}