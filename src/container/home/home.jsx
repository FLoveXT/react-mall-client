import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, Grid } from 'antd-mobile'
import {receiveBanner} from '../../redux/actions'
import Slider from '../../components/slider/slider-antd'

class Home extends Component {
  constructor(props) {
    super(props)
    //模拟数据
    this.data = [
      { icon: require('../../assets/images/nav/all.png'), text: '全部分类', path: '/all' },
      { icon: require('../../assets/images/nav/cuxiao.png'), text: '促销', path: '/all' },
      { icon: require('../../assets/images/nav/qiang.png'), text: '抢红包', path: '/all' },
      { icon: require('../../assets/images/nav/qian.png'), text: '结算', path: '/pay' },
      { icon: require('../../assets/images/nav/cart.png'), text: '购物车', path: '/shopcart' },
      { icon: require('../../assets/images/nav/vip.png'), text: '会员中心', path: '/personal' }
    ]
  }
  // componentDidMount(){
  //   this.props.receiveBanner()
  // }
  render() {
    return (
      <div className='home-container' style={{ marginTop: 45, marginBottom: 50 }}>
        <Slider banner={this.props.banner}/>
        <WhiteSpace />
        <Grid
          data={this.data}
          columnNum={3}
          renderItem={dataItem => (
            <div style={{ padding: '0.89rem' }} onClick={() => { this.props.history.replace(dataItem.path) }}>
              <img src={dataItem.icon} style={{ width: '5.35rem', height: '5.35rem' }} alt="" />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '0.857rem' }}>
                <span>{dataItem.text}</span>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default connect(
  state => ({ banner: state.topBanner }),
  {receiveBanner}
)(Home)