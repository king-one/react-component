/*
 * @Author: chen gong 
 * @Date: 2017-10-13 15:16:15 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-13 18:10:00
 */
/*布局规则与使用 参考bootsrap*/
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
const propTypes = {
    prefixCls: PropTypes.string,
    col: PropTypes.string,
    fr: PropTypes.bool // 是否右浮动
}
const defaultProps = {
    prefixCls: _PRE_ + '-col',
    fr: false // 是否右浮动
}
class Col extends Component {
    render() {
        const { children, className, prefixCls, col, fr, ...other } = this.props
        const classNames = classnames(
            prefixCls,
            col && col.split(' ').map((v) => `${prefixCls}-${v}`),
            {
                [`${prefixCls}-fr`]: fr
            },
            className
        )
        return (
            <div className={classNames} {...other}>
                {children}
            </div>)
    }
}
Col.propTypes = propTypes;
Col.defaultProps = defaultProps;
export default Col