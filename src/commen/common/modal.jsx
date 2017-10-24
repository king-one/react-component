/**
 * Created by dell on 2017/8/7.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
const style = {
  container:'modal-panel',
  mask:'modal-box'
}
export default class Modal extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) { // 从无到有
      this.node = document.createElement('div'); // 创建 DOM
      this.node.className = 'reactModal'; // 给上 ClassName
      document.getElementsByTagName('body')[0].appendChild(this.node);
      const {children,rest} = nextProps;
      let modal = (
        <div className={style.container}>
          <div className={style.mask} {...rest}></div>
          {nextProps.children}
        </div>
      );
      // 这个时候创建了 Modal 的虚拟 Dom
      let allClass = document.getElementsByClassName('reactModal');
      ReactDOM.render(modal, allClass[allClass.length - 1])
    }
    if (!nextProps.open) { // 从有到无
      ReactDOM.unmountComponentAtNode(this.node);
      // document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('ReactModal')[0])
    }
  }
  render() {
    return null // 只要这个Component的方法，不要它的render，它的render将会render到内层。
  }
}
Modal.defaultProps = {
  open: false
};