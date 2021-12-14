const express = require('express')
const router = express.Router()
const { getResult, writeToDatabase } = require('../database/result')

//#region 得到資料的同時寫入server
/**
 * 取得獎項結果
 * /api/result/{抽獎名稱}/
 */
 router.get('/:list_name', async (req, res) =>{
    const {list_name} = req.params
    const result = await getResult(list_name)
    await writeToDatabase(list_name, result.name)
    res.send(result)
})
//#endregion 得到資料的同時寫入server

//#region 分成得到資料 / 寫入 server
// /**
//  * 取得獎項結果
//  * /api/result/{抽獎名稱}
//  */
// router.get('/:list_name', async (req, res) =>{
//   const result = await getResult(req.params.list_name)
//   res.send(result)
// })

// /**
//  * 將結果寫回資料庫
//  * /api/result/{抽獎名稱}
//  * 
//  * body{
//  *    name: 獎項名稱
//  * }
//  */
// router.post('/:list_name', async (req, res) =>{
//   const result = await writeToDatabase(req.params.list_name, req.body.name)
//   res.json(result)
// })
//#endregion 分成得到資料 / 寫入 server

module.exports = router