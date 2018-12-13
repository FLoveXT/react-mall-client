import React, { Component } from 'react'
import { NavBar, Icon, Carousel, WhiteSpace, Card, Button, TextareaItem, Toast, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { getUser } from '../../redux/actions'
import { postComment, reqComments, addCart } from '../../api'
import Cookies from 'js-cookie'
import moment from 'moment'
const Item = List.Item;
class ProductInfo extends Component {
  state = {
    data: ['banner-info01', 'banner-info02', 'banner-info03'],
    imgHeight: 176,
    num: 0,
    comments: [],
    n: 1//规定显示评论条数，发给后台的参数
  }

  addNums = () => {

    let oldnum = this.state.num
    oldnum++
    this.setState({
      num: oldnum
    })
  }
  reduceNums = () => {
    let oldnum = this.state.num
    if (oldnum === 0) {
      return
    }
    oldnum--
    this.setState({
      num: oldnum
    })
  }
  componentDidMount() {
    const id = this.props.match.params.id
    reqComments({ id, n: this.state.n }).then((res) => {
      if (res.data.code === 0) {
        this.setState({
          comments: res.data.data
        })
      }
    })
  }
  //提交后更新comments
  updateComments = (oo) => {
    console.log(oo)
    const id = this.props.match.params.id
    reqComments({ id, n: this.state.n }).then((res) => {
      if (res.data.code === 0) {
        this.setState({
          comments: res.data.data
        })
      }
    })
  }
  //更多评论
  moreComments = () => {
    let n2 = this.state.n
    n2++
    this.setState({
      n: n2
    }, () => {
      const id = this.props.match.params.id
      reqComments({ id, n: this.state.n }).then((res) => {
        if (res.data.code === 0) {
          this.setState({
            comments: res.data.data
          })
        }
      })
    })
  }
  // 点击加入购物车
  toAddCart = (oneInfo) => {
    const userid = Cookies.get('userid')
    if(!userid){
      Toast.info('请先登录',2)
    }else{
      if (this.state.num > 0) {
        addCart({ productid: oneInfo._id, title: oneInfo.title, sell_price: oneInfo.sell_price, num: this.state.num }).then((res) => {
          if (res.data.code === 0) {
            this.props.getUser()
          }
        })
      }
    } 
  }
  render() {

    const id = this.props.match.params.id
    const proInfos = this.props.proInfos
    const oneInfo = proInfos.filter(info => info._id === id)[0]
    const userid = Cookies.get('userid')
    if (userid) {
      const mycartArr = this.props.user.mycart
      var nums = mycartArr.reduce((pre, el) => {
        return pre + el.num
      }, 0)
    }
    return (
      <div className="info-container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { this.props.history.goBack() }}
        >产品详情
        </NavBar>
        <Carousel
          autoplay={true}
          infinite
        >
          {this.state.data.map(val => (
            <a
              key={val}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={require(`../../assets/images/goods/${val}.jpg`)}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {

                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <WhiteSpace />
        <Card>
          <Card.Header
            title={oneInfo.title}
          />
          <Card.Body>
            <div className='price'>
              <span className='sell-price'>售价:{oneInfo.sell_price}</span>
              <span className='market-price'>原价:{oneInfo.market_price}</span>
            </div>
            <div className='buy-num'>
              <span>购买数量：</span><Button type="primary" inline size="small" onClick={() => this.reduceNums()} >-</Button>
              <span className='nums'>{this.state.num}</span>
              <Button type="primary" inline size="small" onClick={() => this.addNums()} >+</Button>
              <div className="shopNums" onClick={() => { this.props.history.replace('/shopcart') }}>
                <img src={require('../../assets/images/nav/cart.png')} alt="" />
                <span>{nums?nums:0}</span>
              </div>
            </div>
            <div className="button">
              <Button type="primary" inline size="small" >立即购买</Button>
              <Button type="warning" inline size="small" onClick={() => { this.toAddCart(oneInfo) }} >加入购物车</Button>
            </div>
          </Card.Body>
        </Card>
        <WhiteSpace />
        <Card>
          <Card.Header
            title='商品参数'
          />
          <Card.Body>
            <div className="product-info">
              {oneInfo.content}
            </div>
          </Card.Body>
        </Card>
        <WhiteSpace />
        <CommentsArea id={id} updateComments={this.updateComments} />
        <WhiteSpace />
        <List renderHeader={() => '评论列表'} className="my-list"></List>
        {
          this.state.comments.map((com, index) => {
            return (
              <List key={index} renderHeader={() => <div><span>用户名:{com.username}</span><span>时间:{moment(com.create_time).format('YYYY-MM-DD hh:mm:ss')}</span></div>} className="my-list">
                <Item multipleLine wrap>{com.comment}</Item>
              </List>
            )
          })
        }
        <WhiteSpace />
        <Button type='primary' onClick={() => { this.moreComments() }}>更多评论</Button>
      </div>
    )
  }
}
//提交评论
class Comments extends Component {
  state = {
    comment: ''
  }

  //提交评论
  addComments = () => {
    const userid = Cookies.get('userid')
    const id = this.props.id
    if (!userid) {
      Toast.info('请先登录账号', 2)
    }
    else if (this.state.comment === '') {
      Toast.info('请填写内容', 2)
    } else {
      postComment({ comment: this.state.comment, id }).then((res) => {
        if (res.data.code === 0) {
          Toast.info('提交成功', 2)
          reqComments({ id, n: 1 }).then((res) => {
            if (res.data.code === 0) {
              this.props.updateComments(res.data.data)
            }
          })

        } else {
          Toast.info('提交失败', 2)
        }
      })
      this.setState({ comment: '' })
      // this.props.updateComments()
    }
  }
  render() {
    const { getFieldProps } = this.props.form

    return (
      <div className="comments">
        <Card>
          <Card.Header
            title='产品评论'
          />
          <Card.Body>
            <TextareaItem
              {...getFieldProps('count')}
              rows={5}
              count={100}
              placeholder='请输入您的意见'
              value={this.state.comment}
              onChange={v => { this.setState({ comment: v }) }}
            />
          </Card.Body>
        </Card>
        <WhiteSpace />
        <Button type='primary' onClick={() => { this.addComments() }}>提交评论</Button>
      </div>
    )
  }
}
const CommentsArea = createForm()(Comments)


export default connect(
  state => ({ proInfos: state.allProInfo, user: state.user }),
  { getUser }
)(ProductInfo)