/**
 * n个接口请求函数的模块
 */

 import ajax from './ajax'


 //从数据库获取banner
 export const getBanner = ()=>ajax('/getbanner')

 //提交产品种类
 export const postType = (productType)=>ajax('/admin/posttype',productType,'POST')

 //获取产品种类
 export const getType = ()=>ajax('/gettype')

 //提交产品详情
 export const postProductInfo = (infoObj)=>ajax('/admin/postinfo',infoObj,'POST')

 //获取指定类所有产品
 export const getProductInfos = (productType)=>ajax('/getinfo',productType,'POST')

 //注册
 export const postRegister = (user) => ajax('/register',user,'POST')

 //登录
 export const postLogin = (user) => ajax('/login',user,'POST')
 
 //获取用户
 export const reqUser= ()=> ajax('/user')

 //提交评论
 export const postComment = ({comment,id})=>ajax('/usercomment',{comment,id},'POST')

 //获取评论
 export const reqComments = ({id,n})=>ajax('/comments',{id,n},'POST')

 //购物车
 //添加产品
 export const addCart = (product) =>ajax('/addcart',product,'POST')
 //删除产品
 export const delCart = (productid) => ajax('/delcart',productid,'POST')