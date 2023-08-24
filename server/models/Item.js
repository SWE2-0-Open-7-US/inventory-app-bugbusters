const { Sequelize } = require('sequelize')
const { sequelize } = require('../db')

let Item = sequelize.define('Item', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    category: Sequelize.STRING,
    image: Sequelize.STRING
});

module.exports = {
    db: sequelize,
    Item,
};