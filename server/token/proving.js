const jwt = require('jsonwebtoken');
// const serect = 'token';  //密钥，不能丢
const serect = require('../config/secret.json')
 module.exports =(tokens) => {
   if (tokens){
     let toke = tokens.split(' ')[1];
     // 解析
     let decoded = jwt.decode(toke, serect.sign);
     return decoded;
   }
 };
