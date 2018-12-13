/**
 * 是要axios封装的ajax请求，返回的书promise对象
 */

import axios from 'axios'

export default function ajax(url='',data={},type='GET'){
  if(type.toUpperCase() === 'GET'){
    //get方式的数据是要放在url上，
    //1.先把数据data进行拼接成字符串
    let dataStr = ''
    Object.keys(data).forEach(key=>{
      dataStr += key + '=' + data[key] + '&'
    })
    if(dataStr !== ''){
      //拼接的字符串最后又个&，要去掉
      dataStr = dataStr.substring(0,dataStr.length-1)
      //拼接url
      url = url + '?' + dataStr
    }
    return axios.get(url)
  }else {
    //post 
    return axios.post(url,data)
  }
}