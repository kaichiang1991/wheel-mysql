const express = require('express')
const router = express.Router()

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

// 製作 Table
class Prize extends Model{}
Prize.init({
  name: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER},
  origCount: {type: DataTypes.INTEGER},
  list_name: {type: DataTypes.STRING}
}, {sequelize, tableName: 'Prize'})
Prize.sync()

router.get('/', async (req, res) =>{
  const allPrize = await Prize.findAll()
  console.log(allPrize)
  res.json(allPrize)
})

router.get('/:name', async (req, res) =>{
  const {name} = req.params
  const findPrize = await Prize.findAll({where: {list_name: name}})
  res.json(findPrize)
})

/**
 * 新增一個品項
 * body{
 *    name: 獎項名稱
 *    count: 剩餘數量
 *    origCount: 原始數量
 *    list_name: 對應抽獎名稱
 * }
 */
router.post('/', async (req, res) =>{
  const {name, count, origCount, list_name} = req.body

  const [prize, isCreated] = await Prize.findOrCreate({where: {list_name, name}})
  let result = {code: 0}
  if(isCreated){
    console.dir('新增')
    await prize.update({count, origCount})
    result = {...result, prize}
  }else{
    console.dir('已存在')
    result = {...result, code: -1, data: '已存在'}
  }

  res.json(result)
})

/**
 * 修改獎項資料
 * /api/prize/(抽獎名稱)
 * body {
 *    name: 獎項名稱
 *    count: 剩餘數量
 *    origCount: 原始數量
 * }
 */
router.patch('/:name', async (req, res) =>{
  const {name} = req.params, {name: prizeName, count, origCount} = req.body
  console.dir(`patch ${prizeName} ${count} ${origCount}`)
  const [prize, isCreated] = await Prize.findOrCreate({where: {list_name: name, name: prizeName}})

  let result = {code: 0}
  if(isCreated){    // 新的資料
    await prize.update({count, origCount})
    result = {...result, prize}
    console.dir('新增')
  }else{
    await prize.update({count, origCount})
    result = {...result, prize}
    console.dir('更新')
  }

  res.json(result)
})

/**
 * 刪除某個列表的全部 item
 */
router.delete('/all/:list_name', async (req, res) =>{
  const {list_name} = req.params
  const count = await Prize.destroy({where: {list_name}})
  res.json({code: 0, count})
})


/**
 * 刪除指定的獎項
 * /api/prize/{獎項名稱}/{列表名稱}
 */
router.delete('/:name/:list_name', async (req, res) =>{
  const {name, list_name} = req.params
  const count = await Prize.destroy({where: {list_name, name}})
  res.json({code: 0, count})
})

module.exports = router