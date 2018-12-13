//引入常量模块
import { GET_BANNER, RECEIVE_MSG, GET_TYPE, ERROR_MSG,ERROR_MSG2,ERROR_MSG3, GET_PRODUCT_INFO,
         RECEIVE_USER,CONFIRM_SUCCESS } from './action-type'

//引入api
import { getBanner, postType, getType, postProductInfo, getProductInfos,
         postLogin,postRegister,reqUser } from '../api'

import store from './store'
//同步actions
export const Banner = (banner) => ({ type: GET_BANNER, data: banner })

export const receiveMsg = (msg) => ({ type: RECEIVE_MSG, data: msg })
export const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
export const errorMsg2 = (msg) => ({ type: ERROR_MSG2, data: msg })
export const errorMsg3 = (msg) => ({ type: ERROR_MSG3, data: msg })

export const getTypes = (types) => ({ type: GET_TYPE, data: types })

export const getProductInfo = (ProductInfos) => ({ type: GET_PRODUCT_INFO, data: ProductInfos })

//接收用户信息
export const receiveUser = (user)=>({type:RECEIVE_USER,data:user})

const confirmSuccess = (user) => ({ type: CONFIRM_SUCCESS, data: user })




//异步actions
/*
* 获取Banner图
**/
export const receiveBanner = () => {
  return async dispatch => {
    const result = await getBanner()
    const res = result.data
    if (res.code === 2) {
      dispatch(Banner(res.data))
    } else {
      // 模拟数据
      let data = [{
        "id": 1,
        "name": "banner01",
        "title": "Banner Title",
        "description": "衣服1",
        "image_url": "http://localhost:3000/assets/images/banner/banner01.jpg",
        "link": "http://www.baidu.com"
      },
      {
        "id": 2,
        "name": "banner02",
        "title": "Banner Title",
        "description": "衣服2",
        "image_url": "http://localhost:3000/assets/images/banner/banner02.jpg",
        "link": "http://www.baidu.com"
      },
      {
        "id": 2,
        "name": "banner03",
        "title": "Banner Title",
        "description": "衣服3",
        "image_url": "http://localhost:3000/assets/images/banner/banner03.jpg",
        "link": "http://www.baidu.com"
      }
      ]
      dispatch(Banner(data))
    }
  }
}

/**
 * 异步提交产品种类
 */
export const postProductType = (productType) => {
  postType({ productType })
  return async dispatch => {
    const result = await postType({ productType })
    const res = result.data
    console.log(res)
    if (res.code === 0) {
      dispatch(receiveMsg(res.msg))//成功
    } else {
      dispatch(errorMsg(res.msg))//失败
    }
  }
}
/**
 * 异步获取产品种类
 */
export const getProductTypes = () => {
  return async dispatch => {
    const result = await getType()
    const res = result.data
    if (res.code === 0) {
      dispatch(getTypes(res.data))//成功
    } else {
      dispatch(errorMsg(res.msg))//失败
    }
  }
}

/**
 * 异步提交产品详情
 */
export const postProInfo = (infoObj) => {
  postProductInfo(infoObj)
  return async dispatch => {
    const result = await postProductInfo(infoObj)
    const res = result.data
    if (res.code === 0) {
      dispatch(receiveMsg(res.msg))
    } else {
      dispatch(errorMsg2(res.msg))
    }
  }
}

/**
 * 异步获取指定类产品所有详情
 */

 export const getProInfos = (productType)=>{
   getProductInfos({productType}).then((result)=>{
      const res = result.data
        if(res.code === 0){
          store.dispatch(getProductInfo(res.data))
        }else {
          store.dispatch(errorMsg2(res.msg))
        }
   })

   //下面这个用async 和 await 后这个return不执行，参数也进不去，不知道原因？
    // return async dispatch => {
    //   const result = await getProductInfos({productType})
    //   const res = result.data
    //   if(res.code === 0){
    //     dispatch(getProductInfo(res.data))
    //   }else {
    //     dispatch(errorMsg(res.msg))
    //   }
    // }
 }

 /**
 * 异步注册
 */

 export const register = ({username,password})=>{
   return async dispatch =>{
     const result = await postRegister({username,password})
     const res = result.data
     
     if(res.code===0){
      console.log(res.data)
       dispatch(confirmSuccess(res.data))
     }else {
       dispatch(errorMsg3(res.msg))
     }
   }
 }

  /**
 * 异步登录
 */
export function login({ username, password }) {
  return async dispatch => {
    const result = await postLogin({ username, password })
    const res = result.data
    //登录成功
    if (res.code === 0) {
      dispatch(confirmSuccess(res.data))
    } else {
      //失败
      dispatch(errorMsg3(res.msg))
    }
  }
}

 /**
 * 异步获取用户
 */
export function getUser() {
  return async dispatch => {
    const result = await reqUser()
    const res = result.data
    if (res.code === 0) {
      dispatch(receiveUser(res.data))
    } else {
      dispatch(errorMsg3(res.msg))
    }
  }
}

