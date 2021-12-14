const express = require('express')
const { getAllPrize, getPrizeByListName, createOrUpdatePrize, deletePrizeByList, deletePrize, patchAllPrize } = require('../database/prize')
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
 * 更新所有符合的獎項列表
 * /api/prize/updateAll
 * body {
 *    list_name: 抽獎名稱
 *    lists: 要更新的列表
 * }
 */
router.patch('/updateAll', async (req, res) =>{
  const {lists, list_name} = req.body
  const allResult = (await patchAllPrize({list_name, lists})).filter(_res => _res)
  res.json(allResult)
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