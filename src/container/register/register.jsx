import React, { Component } from 'react'
import { NavBar, InputItem, WingBlank, WhiteSpace, Button,Toast,Icon } from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
 class Register extends Component {
  state = {
    username:'',
    password:'',
    password2:''
  }
  onHandleChange = (type, val) => {
   this.setState({ [type]: val })
 }
 register = () => {
   const {msg} = this.props.user
   const {username,password,password2} = this.state
   const usernamex =  username.trim()
   const passwordx =  password.trim()
   const password2x=  password2.trim()
   if(!usernamex || !passwordx || !password2x){
    Toast.info('请正确填写格式', 2)
   }
   if(passwordx !== password2x){
    Toast.info('两次密码不一样', 2)
   }
   const charReg = /[^\u4E00-\u9FA5\w]/
   if(charReg.test(usernamex)){
    Toast.info('用户名仅支持中英文，数字和下划线', 2)
   }
   if(msg){
    Toast.info(`${msg}`, 2)
   }
  this.props.register(this.state)
}
  render() {
    const userid = Cookies.get('userid')
    if (userid) {
      return <Redirect to='/personal' />
    }
    return (
      <div className="register-container">
        <NavBar 
        icon={<Icon type="left" />}
        leftContent="首页"
        onLeftClick={() => this.props.history.replace('/home')}
        type='primary'>注册</NavBar>
        <div className="logo">
          <img src={require('../../assets/images/logo/logo.png')} alt="logo" />
        </div>
        <WingBlank>
          <InputItem
            placeholder="请输入账号"
            onChange={(v) => { this.onHandleChange('username',v) }}
          ></InputItem>
          <WhiteSpace />
          <InputItem
            placeholder="请输入密码"
            onChange={(v) => { this.onHandleChange('password',v) }}
          ></InputItem>
          <WhiteSpace />
          <InputItem
            placeholder="请再次输入密码"
            onChange={(v) => { this.onHandleChange('password2',v) }}
          ></InputItem>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type='primary' onClick={()=>this.register()}>注册</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type='primary' onClick={()=>{this.props.history.replace('/login')}}  >登录</Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {register}
)(Register)