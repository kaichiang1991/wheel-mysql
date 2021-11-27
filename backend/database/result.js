const { getPrizeByListName, createOrUpdatePrize, getOnePrize } = require('./prize')

/**
 * 取得 list 當中的結果
 * @param {string} list_name 
 */
const getResult = async (list_name) => {
  const result = await getPrizeByListName(list_name)
  const datas = result.map(r => r.toJSON())
  const totalCount = datas.reduce((pre, curr) => pre + curr.count, 0)
  if(totalCount == 0){      // 沒有剩餘獎項
    return {code: -1, error: '沒有獎品'}
  }

  const arr = datas.reduce((pre, curr) => [...pre, ...Array(curr.origCount).fill(curr.name)], [])
  let data
  do{
    const randomIdx = Math.floor(Math.random() * arr.length)
    const findFn = data => data.name === arr[randomIdx]
    data = datas.find(findFn).count > 0? datas.find(findFn): null
  }while(!data)

  return data
}

/**
 * 將資料寫回資料庫
 * @param {string} list_name 
 * @param {string} name 
 * @returns {Object} 寫回的資料 / 沒有數量則回傳錯誤
 */
const writeToDatabase = async (list_name, name)=>{
  const prize = await getOnePrize(list_name, name)
  if(prize.count <= 0){
    console.dir('writeToDatabase fail. no count.')
    return {code: -1, error: '數量錯誤'}
  }

  await prize.update({count: prize.count - 1})
  return prize
}

module.exports = {
  getResult,
  writeToDatabase
}