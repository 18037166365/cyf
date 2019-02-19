import { http } from '../utils/axios'

console.log('http')
console.log(http)
export const getUser = (params) => http.get('/getUser', params)

export const getHospitalList = (params) => http.get('/getHospitalList', params)

export const addHospital = (params) => http.post('/addHospital', params)
