import { combineReducers } from 'redux'

//引入常量模块
import {
  GET_BANNER, GET_TYPE, RECEIVE_MSG, ERROR_MSG, ERROR_MSG2, ERROR_MSG3, GET_PRODUCT_INFO,
  CONFIRM_SUCCESS, RECEIVE_USER
} from './action-type'

//初始化banner
const initBanner = []
//处理首页的banner
function topBanner(state = initBanner, action) {
  switch (action.type) {
    case GET_BANNER:
      return action.data
    default:
      return state
  }
}
//初始化types
const initTypes = []
//处理所有的产品种类
function allPT(state = initTypes, action) {
  switch (action.type) {
    case GET_TYPE:
      return action.data
    case RECEIVE_MSG:
      return action.msg
    case ERROR_MSG:
      return action.msg
    default:
      return state
  }
}

//处理产品详情
const initProInfo = []
function allProInfo(state = initProInfo, action) {
  switch (action.type) {
    case GET_PRODUCT_INFO:
      return action.data
    case RECEIVE_MSG:
      return action.msg
    case ERROR_MSG2:
      return action.msg
    default:
      return state
  }
}

//处理用户
const initUser = {
  username: '',
  msg: ''
}
function user(state = initUser, action) {
  switch (action.type) {
    case CONFIRM_SUCCESS:
      return action.data
    case RECEIVE_USER:
      return action.data
    case ERROR_MSG3:
      return { ...state, msg: action.data }
    default:
      return state
  }
}



export default combineReducers({
  topBanner,
  allPT,
  allProInfo,
  user
})