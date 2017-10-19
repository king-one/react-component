import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const propTypes = {
    prefixCls: PropTypes.string
}
const defaultProps = {
    prefixCls: _PRE_ + '-modal'
}
class Dialog extends Component {
    render() {
        const { prefixCls, children, animationType, animation, showCloseButton, width, height, measure, duration, customStyles, onClose } = this.props;
        const CloseButton = showCloseButton ? <span className={`${prefixCls}-close`} onClick={onClose} /> : null;
        const classNames = classnames(
            prefixCls,
            {
                [`prefixCls-${animation}-${animationType}`]: animation && animationType
            }
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
}
Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
export default Dialog;