const {Sequelize, DataTypes, Model, where} = require('sequelize')

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_INSTANCE = process.env.DB_INSTANCE;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: `/cloudsql/${process.env.DB_INSTANCE}`,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: `/cloudsql/${DB_INSTANCE}`,
  },
})
console.log({DB_NAME, DB_USER, DB_PASS, DB_INSTANCE})
// // 連接 ＤＢ
// const sequelize = new Sequelize('wheel', 'root', 'abcd1234', {
//   dialect: 'mysql',
//   host: '35.221.241.20'
// })
// const sequelize = new Sequelize('WheelDB', 'root', 'abcd1234', {
//   dialect: 'mysql',
//   host: 'localhost'
// })

try{
  sequelize.authenticate().then(_ => console.log('auth success.'))
}catch(err){
  console.error('auth error', err)
}

module.exports = sequelize