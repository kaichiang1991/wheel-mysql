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
 * 取得指定的prize
 * @param {string} list_name List 名稱
 * @param {string} name 獎項名稱
 * @returns 
 */
const getOnePrize = async (list_name, name) => await Prize.findOne({where: {list_name, name}})

/**
 * 更新抽獎名單內的全部獎項
 * @param {*} 
 * @returns 
 */
const patchAllPrize = async ({list_name, lists}) => {
  // 找出全部該抽獎項的獎項
  const allPrize = await getPrizeByListName(list_name)
  const allResult = lists.map(async ({name, count, origCount}) => {
    let prize
    if(prize = allPrize.find(prize => prize.name === name)){    // 在原本資料庫中有找到
      return prize.update({count, origCount})
    }else{                                                      // 新增的資料
      return count === 0? null: Prize.create({name, count, origCount, list_name})
    }
  })

  return await Promise.all(allResult)
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
  getOnePrize,
  deletePrizeByList,
  deletePrize,
  patchAllPrize
}