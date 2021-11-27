// 連接 ＤＢ
const {Sequelize, DataTypes, Model, where} = require('sequelize')
const sequelize = new Sequelize('WheelDB', 'root', 'abcd1234', {
  dialect: 'mysql',
  host: 'localhost'
})

try{
  sequelize.authenticate().then(_ => console.log('auth success.'))
}catch(err){
  console.error('auth error', err)
}

module.exports = sequelize