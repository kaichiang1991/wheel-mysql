var express = require('express');
var router = express.Router();

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

router.use('/list', require('./list'))

// 製作 Table
class Prize extends Model{}
Prize.init({
  name: {type: DataTypes.STRING},
  count: {type: DataTypes.INTEGER},
  origCount: {type: DataTypes.INTEGER}
}, {sequelize})
Prize.sync()

// GET ALL
router.get('/', async (req, res) =>{
  const allPrize = await Prize.findAll()
  res.json(allPrize)
})

// GET ONE
router.get('/:name', async (req, res) =>{
  const {name} = req.params
  const prize = await Prize.findOne({where: {name}})

  if(!prize){
    res.json({code: -1, err: `not found ${name}`})
  }else{
    res.json(prize.toJSON())
  }
})

// POST ONE
router.post('/', async (req, res) =>{
  const {name, count} = req.body
  const prize = await Prize.create({name, count, origCount: count}).catch(err =>{
    res.json({code: -1, err})
  })
  res.json(prize)
})


module.exports = router;
