import mysql from 'mysql'
import { config } from 'dotenv';
config();
//npm i dotenv
const pool  = mysql.createPool({
    "user":process.env.USER_DATABASE,
    "password":process.env.PASSWORD_DATABASE,
    "database":process.env.DATABASE,
    "host":process.env.HOST_DATABASE,
    "port": Number(process.env.PORT_DATABASE)
})

export {pool};