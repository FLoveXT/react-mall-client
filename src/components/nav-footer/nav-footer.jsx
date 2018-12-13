import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item
class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    nums:PropTypes.number.isRequired
  }

  render() {
    const { pathname } = this.props.location
    return (
      <div className='navfooter-container'>
        <TabBar>
          {
            this.props.navList.map((nav) => (
              <Item
                icon={{ uri: require(`../../assets/images/navfooter/${nav.icon}.png`) }}
                selectedIcon={{ uri: require(`../../assets/images/navfooter/${nav.icon}-selected.png`) }}
                title={nav.text}
                key={nav.path}
                badge={nav.path === '/shopcart' ? this.props.nums : 0}
                selected={pathname === nav.path}
                onPress={() => {
                  this.props.history.replace(nav.path)
                }}
              >
              </Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default withRouter(NavFooter)