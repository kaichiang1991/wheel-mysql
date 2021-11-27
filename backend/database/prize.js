const { DataTypes, Model} = require('sequelize')
const sequelize = require('./')

// 製作 Table
class Prize extends Model{}
Prize.init({
  name: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER},
  origCount: {type: DataTypes.INTEGER},
  list_name: {type: DataTypes.STRING}
}, {sequelize, tableName: 'Prize'})
Prize.sync()

/**
 * 取得所有的 prize
 * @returns {Array<Prize>}
 */
const getAllPrize = async () => await Prize.findAll()

/**
 * 根據 list 名稱取得對應獎項
 * @param {string} list_name list 的名稱
 * @returns {Array<Prize>}
 */
const getPrizeByListName = async (list_name) => await Prize.findAll({where: {list_name}})

/**
 * 新增或更新一個獎項
 * @param {*} req.body 
 * @returns 
 */
const createOrUpdatePrize = async ({name, count, origCount, list_name}) => {
  const [prize, isCreated] = await Prize.findOrCreate({where: {name, list_name}})
  await prize.update({count, origCount})
  return {prize, isCreated}
}

/**
 * 刪除一個指定的 list
 * @param {string} title List 的名稱
 * @returns {[code: number, count: number]}
 */
const deletePrizeByList = async ({list_name}) => {
   const count = await Prize.destroy({where: {list_name}})
   return {code: 0, count}
}

const deletePrize = async ({name, list_name}) => {
  const count = await Prize.destroy({where: {name, list_name}})
  return {code: 0, count}
}

module.exports = {
  getAllPrize,
  getPrizeByListName,
  createOrUpdatePrize,
  deletePrizeByList,
  deletePrize
}