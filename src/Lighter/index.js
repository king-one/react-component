import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './index.less'
const propTypes = {
    prefixCls: PropTypes.string,
};
const defaultProps = {
    prefixCls: _PRE_ + '-lighter',
};
class Lighter extends Component {
    render() {
        const {prefixCls} = this.props;
        return (
            <div className={`${prefixCls}-double-bounce`}>
                <div className={`${prefixCls}-double-bounce1`}></div>
                <div className={`${prefixCls}-double-bounce2`}></div>
            </div>
        )
    }
}
Lighter.propTypes = propTypes;
Lighter.defaultProps = defaultProps;
export default Lighter;