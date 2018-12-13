import React, { Component } from 'react'
import { Result, List, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import { getUser } from '../../redux/actions'
const Item = List.Item;

class Personal extends Component {

  componentDidMount() {
    const userid = Cookies.get('userid')
    if (userid) {
      this.props.getUser()
    }
  }
  logout = () => {
    Cookies.remove('userid')
    this.props.history.go(0)
  }
  render() {
    const userid = Cookies.get('userid')
    if (!userid) {
      return <Redirect to='/login' />
    }
    const { username } = this.props.user
    const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
    return (
      <div style={{ marginTop: 45, marginBottom: 50 }} className='personal-container'>
        <Result
          img={myImg(require('../../assets/images/header/header1.jpg'))}
          title={username}
          message={<div><span onClick={() => { this.logout() }}>退出</span></div>}
        />
        <WhiteSpace />
        <Item extra="查看全部订单" arrow="horizontal" onClick={() => { this.props.history.replace('/shopcart') }}>全部订单</Item>
        <div className="order">
          <div className='order-item' onClick={() => { this.props.history.replace('/shopcart') }}>
            <span className='icon-coin-dollar'></span>
            <p>待付款</p>
          </div>
          <div className='order-item'>
            <span className='icon-coin-euro'></span>
            <p>待收货</p>
          </div>
          <div className='order-item'>
            <span className='icon-coin-pound'></span>
            <p>待确认</p>
          </div>
          <div className='order-item'>
            <span className='icon-coin-yen'></span>
            <p>待评价</p>
          </div>
        </div>
        <WhiteSpace />
        <Item arrow="horizontal" onClick={() => { this.props.history.replace('/shopcart') }}>购物车</Item>
        <Item arrow="horizontal" onClick={() => { }}>搜索</Item>
        <Item arrow="horizontal" onClick={() => { }}>我的优惠</Item>
        <Item arrow="horizontal" onClick={() => { }}>我的收藏</Item>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Personal)