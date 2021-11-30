import axios from "axios";
console.log('ApiUrl', process.env.REACT_APP_ApiUrl, 'env', process.env)

const fetchData = async (url, method = 'GET', data) => {
  url = process.env.REACT_APP_ApiUrl + url
  return (await axios({ url, method, data })).data

}
export default fetchData