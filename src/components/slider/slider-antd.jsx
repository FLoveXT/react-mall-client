import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types'

export default class Slider extends Component {
  static propTypes = {
    banner:PropTypes.array.isRequired
  }

  state = {
    imgHeight: 180,
  }
  render() {
    this.sliderData = this.props.banner
    return (
      <div>
          <Carousel
          autoplay
          infinite
        >
          {this.sliderData.map((item, index) => (
            <a
              key={index}
              href={item.link}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={require(`../../assets/images/banner/${item.name}.jpg`)}
                alt=""
                style={{ width: '100%', height: 180, verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              
            </a>
          ))}
        </Carousel>
      </div>
    )
  }
}