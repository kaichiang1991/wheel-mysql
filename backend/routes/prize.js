const express = require('express')
const { getAllPrize, getPrizeByListName, createOrUpdatePrize, deletePrizeByList, deletePrize } = require('../database/prize')
const router = express.Router()

// 取得所有 Prize
router.get('/', async (req, res) =>{
  const allPrize = await getAllPrize()
  res.json(allPrize)
})

/**
 * 取得指定List名稱的Prize
 * /api/prize/{List名稱}
 */
router.get('/:name', async (req, res) =>{
  const allResult = await getPrizeByListName(req.params.name)
  res.json(allResult)
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
  const {prize, isCreated} = await createOrUpdatePrize(req.body)
  res.json({code: 0, prize, data: isCreated? '新增': '更新'})
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
router.patch('/:list_name', async (req, res) =>{
  const {prize, isCreated} = await createOrUpdatePrize({...req.body, list_name: req.params.list_name})
  res.json({code: 0, prize, data: isCreated? '新增': '更新'})
})

/**
 * 刪除某個列表的全部 item
 */
router.delete('/all/:list_name', async (req, res) =>{
  const result = await deletePrizeByList(req.params)
  res.json(result)
})


/**
 * 刪除指定的獎項
 * /api/prize/{獎項名稱}/{列表名稱}
 */
router.delete('/:name/:list_name', async (req, res) =>{
  const result = await deletePrize(req.params)
  res.json(result)
})

module.exports = router