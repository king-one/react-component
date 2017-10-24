import React from 'react';
import ReactDOM from 'react-dom';
import '@/stylesheets/common/loading.css';
export default class Loading extends React.Component{
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {
    const {type,show} = nextProps;
    if (show && (type==='global')) {
      this.node = document.createElement('div');
      this.node.className = 'load-div';
      document.getElementsByTagName('body')[0].appendChild(this.node);
      let cubes = (
        <div className = 'cube-grid'>
          {this.setCube()}
        </div>
      );
      let loadDiv = document.getElementsByClassName('load-div');
        ReactDOM.render(cubes, loadDiv[0])
    }
    if (type==='global' && !show) {
      ReactDOM.unmountComponentAtNode(this.node);
    }
  }
  componentWillUnmount() {
    const {type} = this.props;
    let node = document.getElementsByClassName('load-div')[0];
    if (type === 'global') {
      ReactDOM.unmountComponentAtNode(node);
      document.getElementsByTagName('body')[0].removeChild(node)
    }
  }
  setCube(){
    let cubs = [];
    for( var i = 0; i < 9; i++ ){
      cubs.push(<div className = "sk-cube" key = {i} ></div>);
    }
    return cubs;
  }
  render(){
    const {type} = this.props;
    if(type==='part'){
      return(
        <div className = 'load-div'>
          <div className = 'cube-grid'>
            {this.setCube()}
          </div>
        </div>
      )
    }else{
      return null
    }
  }
}
Loading.defaultProps={
  type:'part',
  show:true
};
