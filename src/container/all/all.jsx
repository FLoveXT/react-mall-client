import React, { Component } from 'react'
import { SearchBar, Tabs } from 'antd-mobile'
import { connect } from 'react-redux'
import { getProductTypes, getProInfos } from '../../redux/actions'
import Lazyimg from 'react-lazyimg-component'; //图片懒加载
/**
 * 把数据库的数组转化成const tabs = [
      { title: '1 Tab' },
      { title: '2 Tab' },
      { title: '3 Tab' },
    ];
 * @param {种类的数据}} typeArr 
 */
function toTabs(typeArr) {
  const newArr = []
  typeArr.map((el) => {
    newArr.push({ title: el.productType })
  })
  return newArr
}
class All extends Component {

  state = {
    value: ''
  }
  componentDidMount() {
    this.props.getProductTypes()
    getProInfos('男装')
  }

  render() {
    const tabs = toTabs(this.props.types)
    return (
      <div style={{ marginTop: 45, marginBottom: 50 }} className='all-container'>
        <SearchBar placeholder="Search" maxLength={8}
          value={this.state.value}
          onChange={(value) => { this.setState({ value }, console.log(this.state.value)) }} />
        <div style={{ 'height': '45rem' }}>

          <Tabs tabs={tabs}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
            onTabClick={(tab, index) => { getProInfos(tab.title) }}
          >
            {
              tabs.map((tab, index) => {
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', height: '250px', backgroundColor: '#fff', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {this.props.proInfos.map(el => {
                      return (
                        <div key={el._id} className='goods-item' onClick={()=>{this.props.history.push(`/productinfo/${el._id}`)}}>
                          <Lazyimg src={require('../../assets/images/goods/clothe.jpg')} alt="衣服" />
                          <h2 className='title'>{el.title}</h2>
                          <div className="info">
                            <p className='price' >
                              <span className='sell'>售价:{el.sell_price}</span>
                              <span className='market'>原价:{el.market_price}</span>
                            </p>
                            <p className='selled'>
                              <span>热卖中</span>
                              <span>已售{el.selled_quantity}</span>
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }
          </Tabs>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ types: state.allPT, proInfos: state.allProInfo }),
  { getProductTypes, getProInfos }
)(All)