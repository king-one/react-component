import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Dialog,ModalBody,ModalFooter,ModalHeader} from './Dialog'
import classnames from 'classnames';
import './index.less';

class Modal extends Component {
     static propTypes = {
        prefixCls: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        measure: PropTypes.string,
        visible: PropTypes.bool,
        showMask: PropTypes.bool,
        closeOnEsc: PropTypes.bool,
        closeMaskOnClick: PropTypes.bool,
        showCloseButton: PropTypes.bool,
        animation: PropTypes.string, //zoom fade flip door rotate slideUp slideDown slideLeft slideRight
        enterAnimation: PropTypes.string,
        leaveAnimation: PropTypes.string,
        duration: PropTypes.number,
        className: PropTypes.string,
        onClose: PropTypes.func.isRequired,
     }
    static defaultProps = {
        prefixCls: _PRE_ + '-modal',
        width: 400,
        height: 240,
        measure: 'px',
        visible: false,
        showMask: true,
        closeOnEsc: true,
        closeMaskOnClick: true,
        showCloseButton: true,
        animation: 'zoom',
        duration: 200,
    };
    state = {
        animationType: 'enter'
    };
    componentWillReceiveProps(nextProps) {
        if (!this.props.visible　&& nextProps.visible) {
            this.open();
        } 
        if(this.props.visible && !nextProps.visible){
            this.close();
        }
    }
  shouldComponentUpdate(nextProps, nextState) {
      if(this.props.visible){
        return this.props.visible === nextProps.visible
      }else{
        return false;
      }
  }
  componentDidUpdate(){
         this.insertDiv()
  }
    open() {
         this.setState({
            animationType: 'enter'
        }) 
        this.insertDiv()
    }
    close() {
        // this.replaceAnimate();
        this.removeInsert();
    }
    // replaceAnimate(){
    //     const {prefixCls} = this.props;
    //     const cls = `.${prefixCls}-fade-enter`
    //     console.log(cls)
    //     let node = document.getElementById(this.mid).firstChild;
    //     node.setAttribute('class',node.getAttribute('class').replace('enter','leave'));
    //     node.children[1].setAttribute('class',node.children[1].getAttribute('class').replace('enter','leave'));
    // }
    onKeyUp = e => {
        const {closeOnEsc,onClose} = this.props
        if (closeOnEsc && e.keyCode === 27) {
            this.removeInsert();
        }
    }
   insertDiv(){
          if(!this.containerNode){
            this.mid = '_modal_'+ + new Date();
            this.containerNode = document.createElement('div');
            this.containerNode.setAttribute('id',this.mid);
            document.body.appendChild(this.containerNode);
        }
        const {...props} = this.props;
        const {animationType} = this.state;
        ReactDOM.render(
            <Dialog {...props} animationType ={animationType} />,this.containerNode)
    }
    removeInsert(){
              console.log(this.containerNode);
               ReactDOM.unmountComponentAtNode(this.containerNode);
               document.body.removeChild(document.getElementById(this.mid))
               delete this.containerNode;
    }
    render() { 
       return null
    }
}
Modal.ModalHeader = ModalHeader;
Modal.ModalBody = ModalBody;
Modal.ModalFooter = ModalFooter;
export default Modal;
      