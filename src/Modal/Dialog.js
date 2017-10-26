import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import classnames from 'classnames';
const propTypes = {
    prefixCls: PropTypes.string
}
const defaultProps = {
    prefixCls: _PRE_ + '-modal'
}
const ModalHeader = props =>{
    const{children} = props;
    return(
        <div className="header">{children}</div>
    )
}
const ModalBody = props => {
    const {children} = props;
    return(
    <div className="body">{children}</div>
    )
}
const ModalFooter = props => {
    const {children,onClose} = props;
    return(
        <div className="footer">
        <Button className="confirm-btn" onClick={onClose}>确定</Button>
        <Button className="cancel-btn" feature='transparent' onClick={onClose}>取消</Button>
        </div>
    )
}
class Dialog extends Component{
  render(){
        const { prefixCls, className, children, closeMaskOnClick,showCloseButton, animation,
        width,height,measure,customStyles,animationType,
        onClose, showMask, duration, customMaskStyles, ...ohter } = this.props;
        const onClick = closeMaskOnClick ? onClose : null;
        const CloseButton = showCloseButton ? <span className={`${prefixCls}-close`} onClick={onClose} /> : null;
        const classNames = classnames(
            prefixCls,
            {
                [`${prefixCls}-fade-${animationType}`]: animationType
            },
            className
        ) 
        const childCls = classnames(
            prefixCls,
            `${prefixCls}-dialog`,
            {  
                [`${prefixCls}-${animation}-${animationType}`]: animation && animationType
            },
            className
        );
        const mask = showMask ? <div className={`${prefixCls}-mask`} style={customMaskStyles} onClick={onClick} /> : null;
        const style = {
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        const childStyle = {
            width: width + measure,
            height: height + measure,
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        const mergedStyles = { ...childStyle, ...customStyles };
        return(
           <div
                className={classNames}
                ref={el => { this.el = el; }}
                onKeyUp={this.onKeyUp}
            >
                {mask}
                <div style={mergedStyles} className={childCls}>
                {CloseButton}
                {children}
            </div>
            </div>
        )
                
      }
  }
Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
export {Dialog,ModalHeader,ModalBody,ModalFooter};