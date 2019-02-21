import Vue from 'vue';
import { Message } from 'element-ui';
import axios from 'axios'

// const { PREFIX } = process.env
// console.log('process.env: ',  JSON.stringify(process.env));


axios.defaults.timeout =  60000;
axios.defaults.baseURL = 'http://127.0.0.1:3009';

export class http {
    static handleSuccess(respond) {
        const { data, status } = respond
        if (status >= 200 && status < 400) {
          if(data.code!=0) {
            Message({
              message: data.msg,
              type: 'warning'
            });
          }
            return data
        }
    }
    static handleError(respond) {
      Message({
        message: '网络错误',
        type: 'warning'
      });
      return new Error()
    }
    static get(url, data) {
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(err=>this.handleError)
    }
    static post(url, data) {
        return axios.post(url, data).then(this.handleSuccess).catch(this.handleError)
    }
}

export const getDate = (time)=> {
    var now = new Date(time),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
