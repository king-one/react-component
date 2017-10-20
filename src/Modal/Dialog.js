import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const propTypes = {
    prefixCls: PropTypes.string
}
const defaultProps = {
    prefixCls: _PRE_ + '-modal'
}
const Dialog = props =>  {
        const { prefixCls, children,className, animationType, animation, showCloseButton,
              width, height, measure, duration, customStyles, onClose } = props;
              console.log(duration);
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
export default Dialog;