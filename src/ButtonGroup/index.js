/*
 * @Author: chen gong 
 * @Date: 2017-10-12 22:04:22 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-13 15:26:57
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import './index.less';
const propTypes = {
    prefixCls:PropTypes.string,
    feature:PropTypes.oneOf(['horizontal','vertical','around','bettween'])
};
const defaultProps = {
    prefixCls: _PRE_ + '-btn-group',
    feature:'horizontal'
};
class ButtonGroup extends Component {
    render() {
        const { className, feature, prefixCls, ...other } = this.props;
        const classNames = classnames(
            prefixCls,
            { 
                [`${prefixCls}-${feature}`]: feature
            },
            className
        )
        return (
            <div className={classNames} {...other}>
            </div>
        )
    }
}
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;
export default ButtonGroup;