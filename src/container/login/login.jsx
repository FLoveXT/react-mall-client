import React, { Component } from 'react'
import { NavBar, InputItem, WingBlank, WhiteSpace, Button, Toast,Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
class Login extends Component {

  state = {
    username: '',
    password: ''
  }
  onHandleChange = (type, val) => {
    this.setState({ [type]: val })
  }
  login = () => {
    const { username, password } = this.state
    const usernamex = username.trim()
    const passwordx = password.trim()
    if (!usernamex || !passwordx) {
      Toast.info('请正确填写格式', 2)
    }
    this.props.login(this.state)
  }
  render() {
    const userid = Cookies.get('userid')
    if (userid) {
      return <Redirect to='/personal' />
    }
    return (
      <div className="login-container">
        <NavBar
          icon={<Icon type="left" />}
          leftContent="首页"
          onLeftClick={() => this.props.history.replace('/home')}
          type='primary'>登录</NavBar>
        <div className="logo">
          <img src={require('../../assets/images/logo/logo.png')} alt="logo" />
        </div>
        <WingBlank>
          <InputItem
            placeholder="请输入账号"
            onChange={(v) => { this.onHandleChange('username', v) }}
          ></InputItem>
          <WhiteSpace />
          <InputItem
            placeholder="请输入密码"
            onChange={(v) => { this.onHandleChange('password', v) }}
          ></InputItem>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type='primary' onClick={() => this.login(this.state)}>登录</Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type='primary' onClick={() => { this.props.history.replace('/register') }} >免费注册</Button>
        </WingBlank>

      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)