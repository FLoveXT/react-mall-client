import React, { Component } from 'react'
import { InputItem, WingBlank, WhiteSpace, List, NavBar, Button, Toast, TextareaItem, Picker } from 'antd-mobile';
import { postProductType, postProInfo } from '../../redux/actions'

export default class Admin extends Component {
  state = {
    productType: '',
    type: '',
    title: '',
    content: '',
    sell_price: 0,
    market_price: 0,
    selled_quantity: 0
  }
  onHandleChange = (type, val) => {
    if (type === this.state.type) {
      val = val.toString()
    }
    this.setState({ [type]: val })
  }

  addType = (productType) => {
    if (!productType) {
      Toast.info('请输入值', 1);
    }
    postProductType(productType)
    this.setState({
      productType: ''
    })
  }
  postInfo = (infoObj) => {
    const { type, title, content, sell_price, market_price, selled_quantity } = infoObj
    if (!type || !title || !content || !sell_price || !market_price || !selled_quantity) {
      Toast.info('请全部填写', 1);
      if (typeof sell_price !== 'number' || typeof market_price !== 'number' || typeof selled_quantity !== 'number') {
        Toast.info('请填写数字', 1);
      }
    }
    postProInfo(infoObj)
  }
  render() {
    // 模拟从后台拿到的数据
    const types = [
      {
        label:
          (<div>
            <span>男装</span>
          </div>),
        value: '男装',
      },
      {
        label:
          (<div>
            <span>女装</span>
          </div>),
        value: '女装',
      },
      {
        label:
          (<div>
            <span>大衣</span>
          </div>),
        value: '大衣',
      },
      {
        label:
          (<div>
            <span>冬装</span>
          </div>),
        value: '冬装',
      },
      {
        label:
          (<div>
            <span>童装</span>
          </div>),
        value: '童装',
      },
      {
        label:
          (<div>
            <span>裙子</span>
          </div>),
        value: '裙子',
      }
    ];

    return (
      <div className='admin-container'>
        <NavBar>用户后台数据管理</NavBar>
        <WhiteSpace />
        <List renderHeader={() => '首页banner图'} className="my-list">
          <form action='http://localhost:4000/admin/postbanner' method='post' encType="multipart/form-data">
            <WingBlank>
              <InputItem type="file" name="pics" ref='banner' ></InputItem>
              <InputItem type="submit" value="上传" className='postbanner' ></InputItem>
            </WingBlank>
          </form>
        </List>
        <WhiteSpace />
        <List renderHeader={() => '添加您的产品种类'}>
          <InputItem
            placeholder="请输入产品种类"
            value={this.state.productType}
            onChange={val => this.onHandleChange('productType', val)}
          >
            种类：
        </InputItem>
        </List>
        <Button type='primary' onClick={() => { this.addType(this.state.productType) }}>提交</Button>
        <WhiteSpace />
        <List renderHeader={() => '添加您的产品详情'}>
          <Picker
            data={types}
            value={this.state.type}
            cols={1}
            onChange={val => this.onHandleChange('type', val)}
          >
            <List.Item arrow="horizontal" key={types.index}>选择产品类别</List.Item>
          </Picker>
          <InputItem
            placeholder="请输入产品标题"
            value={this.state.title}
            onChange={val => this.onHandleChange('title', val)}
          >
            标题：
        </InputItem>
          <TextareaItem
            rows={4}
            title="产品参数"
            placeholder="请输入产品参数"
            value={this.state.content}
            onChange={val => this.onHandleChange('content', val)}
          ></TextareaItem>
          <InputItem
            placeholder="0"
            value={this.state.sell_price}
            onChange={val => this.onHandleChange('sell_price', val)}
          >
            售价：
        </InputItem>
          <InputItem
            placeholder="0"
            value={this.state.market_price}
            onChange={val => this.onHandleChange('market_price', val)}
          >
            市场价：
        </InputItem>
          <InputItem
            placeholder="0"
            value={this.state.selled_quantity}
            onChange={val => this.onHandleChange('selled_quantity', val)}
          >
            已售：
        </InputItem>
          <Button type='primary' onClick={() => { this.postInfo(this.state) }}>提交</Button>
        </List>
      </div>
    )
  }
}