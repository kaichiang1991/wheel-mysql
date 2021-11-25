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

router.post('/', async (req, res) =>{
  const {name, count, origCount, list_name} = req.body

  const findOne = await Prize.findOne({where: {list_name, name}}).catch(err => console.log('not find'))
  if(findOne){
    res.json({code: -2, err: '已經存在'})
    return
  }

  const prize = await Prize.create({name, count, origCount, list_name}).catch(err => {
    res.json({code: -1, err})
  })

  if(!prize)  return
  res.json({code: 0, newPrize: prize})
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
    result = {...result, prize: prize.toJSON()}
    console.dir('更新')
  }

  res.json(result)
})

module.exports = router