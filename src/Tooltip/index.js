/*
 * @Author: chen gong 
 * @Date: 2017-10-24 15:46:45 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-03-17 17:51:04
 */
import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Popover from '../Popover'
import './index.less'

export default class Tooltip extends Component {
    render() {
        const { prefixCls, children, className, title, ...other } = this.props;
        console.log(children);
        const classNames = classnames(`${prefixCls}-popover`, className)
        return (
            <Popover
                className={classNames}
                content={title}
                {...other}
            >
                {children}
            </Popover>
        )
    }
}
Tooltip.defaultProps = {
    prefixCls: _PRE_ + '-tooltip',
    triggerMode: 'hover',
    direction: 'up',
    align: 'middle'
}

Tooltip.propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.element.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),// 提示框显示内容，可以是文本字符串，也可以是 React 元素
    triggerMode: PropTypes.oneOf(['hover', 'click']),
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}