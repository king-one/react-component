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
const Dialog = props =>  {
        const { prefixCls, children,className, animationType, animation, showCloseButton,
              width, height, measure, duration, customStyles, onClose } = props;
        const CloseButton = showCloseButton ? <span className={`${prefixCls}-close`} onClick={onClose} /> : null;
        const classNames = classnames(
            prefixCls,
            `${prefixCls}-dialog`,
            {  
                [`${prefixCls}-${animation}-${animationType}`]: animation && animationType
            },
            className
        );
        const style = {
            width: width + measure,
            height: height + measure,
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        const mergedStyles = { ...style, ...customStyles };
        return (
            <div style={mergedStyles} className={classNames}>
                {CloseButton}
                {children}
            </div>
        )
}
Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
export {Dialog,ModalHeader,ModalBody,ModalFooter};