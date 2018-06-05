/*
 * @Author: chen gong 
 * @Date: 2017-10-10 17:15:04 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-06-05 17:58:49
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import './index.less';
const propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    feature: PropTypes.string
};
const defaultProps = {
    prefixCls: _PRE_ + '-btn',
    type: 'button',
    disabled: false,
    feature: 'primary'
};

class Button extends Component {
    render() {
        const { children, className, type, size, icon, feature, circle,transparent, prefixCls, ...other } = this.props;
        const classNames = classnames(
            prefixCls,
            {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-circle`]: circle,
                [`${prefixCls}-${feature}`]: feature,
                [`${prefixCls}-icon`]: icon && !children
            },
            className
        )
        return (
            <button type={type} className={classNames} { ...other }>
                {icon && <Icon type={icon} />}
                {children}
            </button>
        )
    }
}
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
export default Button;