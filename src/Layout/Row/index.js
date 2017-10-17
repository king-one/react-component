import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './index.less';

const propTypes = {
    prefixCls: PropTypes.string,
    row: PropTypes.string,
    fluid: PropTypes.bool
}
const defaultProps = {
    prefixCls: _PRE_ + '-row',
    fluid: false
}
class Row extends Component {
    render() {
        const { children, className, prefixCls, row, gutther, fluid, ...other } = this.props;
        const classNames = classnames(
            prefixCls,
            {
                [`${prefixCls}-gutther`]: gutther,
                [`${prefixCls}-fluid`]: fluid
            },
            className
        )
        return (
            <div className={classNames} {...other}>
                {children}
            </div>
        )
    }
}
Row.propTypes = propTypes;
Row.defaultProps = defaultProps;
export default Row;

