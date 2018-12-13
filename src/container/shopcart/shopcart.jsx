import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, Switch, Button, Toast, ActionSheet } from 'antd-mobile'
import { getUser } from '../../redux/actions'
import { delCart } from '../../api'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
class Shopcart extends Component {
  state = {
    cartArr: [],
    pieces: 0,
    total: 0
  }
  //支付ui数据
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '支付宝' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信支付' }
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));
  // 计算已经勾选多少个产品，总价多少
  count = (Arr) => {
    const temPieces = Arr.reduce((pre, el) => {
      return pre + (el.checked === true ? 1 : 0)
    }, 0)
    const temTotal = Arr.reduce((pre, el) => {
      return pre + (el.checked === true ? el.num * el.sell_price : 0)
    }, 0)
    this.setState({
      pieces: temPieces,
      total: temTotal
    })
  }
  componentDidMount() {
    const userid = Cookies.get('userid')
    if (userid) {
      this.props.getUser().then(() => {
        const temArr = this.props.user.mycart
        temArr.forEach((el) => {
          el.checked = true
        })
        this.setState({
          cartArr: temArr
        }, () => {
          this.count(this.state.cartArr)
        })
      })
    }
  }
  addNums = (index) => {
    const temArr = this.state.cartArr
    temArr[index].num++
    this.setState({
      cartArr: temArr
    }, () => {
      this.count(this.state.cartArr)
    })
  }
  reduceNums = (index, num) => {
    const temArr = this.state.cartArr
    if (num > 0) {
      temArr[index].num--
      this.setState({
        cartArr: temArr
      }, () => {
        this.count(this.state.cartArr)
      })
      if (temArr[index].num === 0) {
        return
      }
    }
  }
  //开关的关闭
  switch = (index) => {
    const temArr = this.state.cartArr
    const isOpen = temArr[index].checked
    temArr[index].checked = !isOpen
    this.setState({
      cartArr: temArr
    }, () => {
      this.count(this.state.cartArr)
    })
  }
  //删除
  delete = (obj) => {
    delCart(obj).then((res) => {
      if (res.data.code === 0) {
        Toast.success(res.data.msg, 2)
        this.props.getUser().then(() => {
          const temArr = this.props.user.mycart
          temArr.forEach((el) => {
            el.checked = true
          })
          this.setState({
            cartArr: temArr
          }, () => {
            this.count(this.state.cartArr)
          })
        })
      }
    })
  }
  //显示支付页面
  showShareActionSheet = () => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      message: `总共需要支付￥：${this.state.total}`,
    },
      (buttonIndex) => {

        if (buttonIndex === 0) {
          Toast.success(`支付宝支付${this.state.total}成功`,2)
        }
        if (buttonIndex === 1) {
          Toast.success(`微信支付${this.state.total}成功`,2)
        }
      });
  }
  render() {
    const userid = Cookies.get('userid')
    if (!userid) {
      return <Redirect to='/login' />
    }
    return (
      <div className='shopcart-container' style={{ marginTop: 45, marginBottom: 50 }}>
        <WhiteSpace />
        {
          this.state.cartArr.map((el, index) => {
            return (
              <Card key={index}>
                <Card.Header
                  title={el.title}
                  thumb={require('../../assets/images/goods/clothe.jpg')}
                  extra={<Switch
                    checked={el.checked}
                    onClick={() => { this.switch(index) }}
                  />}
                />
                <Card.Body>
                  <span>购买数量：</span><Button type="primary" inline size="small" onClick={() => { this.reduceNums(index, el.num) }} >-</Button>
                  <span className='nums'>{el.num}</span>
                  <Button type="primary" inline size="small" onClick={() => { this.addNums(index) }} >+</Button>
                </Card.Body>
                <Card.Footer content={`￥：${el.num * el.sell_price}`}
                  extra={<Button type="primary" inline size="small" onClick={() => { this.delete({ productid: el.productid }) }} >删除</Button>} />
              </Card>
            )
          })
        }
        <WhiteSpace />
        <Card>
          <Card.Body>
            您购买的商品费用详情
          </Card.Body>
          <Card.Footer content={`已经勾选商品${this.state.pieces}件, 总价：￥:${this.state.total}`}
            extra={<Button type="primary" inline size="small" onClick={() => { this.showShareActionSheet() }} >结账</Button>} />
        </Card>
        <WhiteSpace />
      </div>
    )
  }
}


export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Shopcart)