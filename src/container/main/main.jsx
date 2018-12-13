import React, { Component } from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import Home from '../home/home'
import All from '../all/all'
import Personal from '../personal/personal'
import Shopcart from '../shopcart/shopcart'
import NavFooter from '../../components/nav-footer/nav-footer'
import ProductInfo from '../product-info/product-info'
import Login from '../login/login'
import Register from '../register/register'

import {receiveBanner,getUser} from '../../redux/actions'

import '../../assets/css/index.less'

 class Main extends Component {

  //模拟navfooter组件的属性
  navList = [
    {
      path: '/home',
      component: Home,
      title: '深圳xx服装',
      icon: 'home',
      text: '首页'
    },
    {
      path: '/all',
      component: All,
      title: '全部商品',
      icon: 'all',
      text: '全部'
    },
    {
      path: '/shopcart',
      component: Shopcart,
      title: '购物车',
      icon: 'cart',
      text: '购物车'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'my',
      text: '我的'
    }
  ]

  componentDidMount(){
    this.props.receiveBanner()
    const userid = Cookies.get('userid')
    if (userid) {
      this.props.getUser()
    }
  }
  render() {
    //得到当前请求的path
    const pathname = this.props.location.pathname
    if(pathname === '/'){
      return <Redirect to='/home' />
    }
    //得到当前的nav
    const currentNav = this.navList.find(nav => nav.path === pathname)
    //得到购物车里面产品数
    const userid = Cookies.get('userid')
    if(userid){
      const mycartArr = this.props.user.mycart
      var nums = mycartArr.reduce((pre,el)=>{
        return pre + el.num
      },0)
    }
    return (
      <div className='main-container'>
        {currentNav ? <NavBar className="navbar">{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/all' component={All} />
          <Route path='/personal' component={Personal} />
          <Route path='/shopcart' component={Shopcart} />
          <Route path='/productinfo/:id' component={ProductInfo} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
        {currentNav ? <NavFooter className="navfooter" navList={this.navList} nums={nums?nums:0}></NavFooter> : null}
      </div>
    )
  }
}

export default connect(
  state => ({ banner: state.topBanner,user:state.user }),
  {receiveBanner,getUser}
)(Main)