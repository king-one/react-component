/**
 * Created by dell on 2017/8/9.
 */
import '@/stylesheets/common/goTop.css';
import React from 'react';
export default class GoTop extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      btnShow:false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      btnShow:nextProps.btnShow
    })
  }
  render(){
    return(<div id="goTopBtn" style={{display:this.state.btnShow ? 'block' : 'none'}} onClick={this.props.handleGoTop}><span className="icon icon-double-angle-up"></span><span className="back-text">顶部</span></div>)
  }
}
