const {Sequelize} = require('sequelize')

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_INSTANCE = process.env.DB_INSTANCE;
const prod = process.env.NODE_ENV == 'production'

const option = {
  dialect: 'mariadb'
}

console.log('option', JSON.stringify(option))
// 連接 ＤＢ
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, option)

try{
  sequelize.authenticate().then(_ => console.log('auth success.'))
}catch(err){
  console.error('auth error', err)
}

module.exports = sequelize