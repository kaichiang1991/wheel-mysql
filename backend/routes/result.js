const express = require('express')
const router = express.Router()
const { getResult, writeToDatabase } = require('../database/result')

/**
 * 取得獎項結果
 * /api/result/{抽獎名稱}
 */
router.get('/:list_name', async (req, res) =>{
  const result = await getResult(req.params.list_name)
  res.send(result)
})

/**
 * 將結果寫回資料庫
 * /api/result/{抽獎名稱}
 * 
 * body{
 *    name: 獎項名稱
 * }
 */
router.post('/:list_name', async (req, res) =>{
  const result = await writeToDatabase(req.params.list_name, req.body.name)
  res.json(result)
})

module.exports = router