import React, { Component } from 'react'
import banner01 from '../../assets/images/banner/banner01.jpg'
import TouchSlide from '../../assets/lib/TouchSlide'
export default class Slider extends Component {
  
  componentDidUpdate() {
    if (!this.hasSlideInit && this.sliderData) {
      this.hasSlideInit=true
      this.slideInit()
    }
  }
  componentDidMount(){
    this.props.receiveBanner();
  }
  slideInit() {
    TouchSlide({
      slideCell: "#slideBox",
      titCell: ".hd ul",
      mainCell: ".bd ul",
      effect: "leftLoop",
      autoPage: true,//自动分页
      autoPlay: true, //自动播放
      interTime: 4000 //轮播间隔
    });
  }
  render() {
    let renderTpl
    this.sliderData = this.props.banner
    if (this.sliderData) {
      renderTpl = (
        <div id="slideBox" className="slideBox">
          <div className="bd">
            <ul>
              {
                this.sliderData.map(function (item, index) {
                  return <li key={index}>
                    <a href={item.link}>
                      <img className="pic" src={banner01} alt={item.description}/>
                      <span>{item.description}</span>
                    </a>
                  </li>
                })
              }
            </ul>
          </div>
          <div className="hd"><ul></ul></div>
        </div>
      )
    }
    else {
      renderTpl = (
        <div style={{ height: 180 }}></div>
      )
    }
    return (
      <div>
        {renderTpl}
      </div>
    )
  }
}