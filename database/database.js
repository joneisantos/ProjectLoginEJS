const Sequelize = require("sequelize");

const connection = new Sequelize('joneiLocal','root','Master1910',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;