/*
 * @Author: chen gong 
 * @Date: 2017-10-24 15:46:45 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-24 17:05:15
 */
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Popover from '../Popover'
import './index.less'

const Tooltip = props => {
    const { prefixCls, children, className, title, ...other } = props;
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

Tooltip.defaultProps = {
    prefixCls: _PRE_ + '-tooltip',
    triggerMode: 'hover',
    direction: 'up',
    align: 'middle'
}

Tooltip.propTypes = {
    prefixCls:PropTypes.string,
    children: PropTypes.element.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),// 提示框显示内容，可以是文本字符串，也可以是 React 元素
    triggerMode: PropTypes.oneOf(['hover', 'click']),
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

export default Tooltip