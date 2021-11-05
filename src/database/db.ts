const Sequelize = require('sequelize');

const BD_NAME = 'actividad9';
const BD_USER = 'grupo4';
const BD_PASS = 'Grupo4.123';

export const database = new Sequelize(
    BD_NAME,
    BD_USER,
    BD_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
database.sync({forse: true})
    .then(function(){
        console.log('HA FUNCIONADO CORRECTAMENTE')
    }

    )