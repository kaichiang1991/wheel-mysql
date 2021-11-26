const {Sequelize, DataTypes, Model, where} = require('sequelize')
const sequelize = new Sequelize('WheelDB', 'root', 'abcd1234', {
  dialect: 'mysql',
  host: 'localhost'
})
class List extends Model{}
List.init({
  title: {type: DataTypes.STRING, unique: true}
}, {sequelize, tableName: 'List'})
List.sync()

/**
 * 取得所有的list
 * @returns {Array<List>}
 */
const getAllList = async () => await List.findAll()

/**
 * 創建一個新的list
 * @param {string} title List 的名稱
 * @returns 
 */
const createList = async (title) => {
  let error
  const newList = await List.create({title}).catch(err => error = err.name)
  return error || newList
}

/**
 * 刪除一個指定的 list
 * @param {string} title List 的名稱
 * @returns {[code: number, count: number]}
 */
const deleteList = async (title) => {
  const count = await List.destroy({where: {title}})
  // ToDo 刪除 prize 裡面符合的獎項
  return {code: 0, count}
}

module.exports = {
  List,
  getAllList,
  createList,
  deleteList
}