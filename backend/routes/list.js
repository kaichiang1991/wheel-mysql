var express = require('express');
const { getAllList, createList, deleteList } = require('../database/list');
var router = express.Router();

// 取得所有 List
router.get('/', async (req, res) =>{
  const allList = await getAllList()
  res.json(allList)
})

// 新增一個List
router.post('/', async (req, res) =>{
  const {title} = req.body
  const created = await createList(title)
  const result = typeof created === 'string'? {code: -1, error: created}: {code: 0, data: created}
  res.json(result)
})

// 刪除一個list
router.delete('/:title', async (req, res) =>{
  const {title} = req.params
  const result = await deleteList(title)
  res.json(result)
})

module.exports = router;
