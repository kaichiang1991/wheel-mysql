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

router.patch('/:name', async (req, res) =>{
  const {name} = req.params, {name: prizeName, count, origCount} = req.body
  const findPrize = await Prize.findOne({where: {list_name: name, name: prizeName}})
  if(!findPrize){
    await Prize.create({name: prizeName, count, origCount, list_name: name})
    res.json({code: -1, err: 'not found'})
    return
  }

  await findPrize.update({count, origCount})
  res.json({code: 0, prize: findPrize})
})
module.exports = router