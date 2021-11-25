var express = require('express');
var router = express.Router();

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

// 取得所有 List
router.get('/', async (req, res) =>{
  const allList = await List.findAll()
  res.json(allList)
})

// 新增一個List
router.post('/', async (req, res) =>{
  const {title} = req.body
  const newList = await List.create({title}).catch(err =>{
    res.json({code: -1, err})
  })

  if(!newList) 
    return
  res.json({code: 0, newList})
})

// 刪除一個list
router.delete('/:title', async (req, res) =>{
  const {title} = req.params
  await List.destroy({where: {title}})
  // ToDo 刪除 prize 裡面符合的獎項
  res.json({code: 0})
})

module.exports = router;
