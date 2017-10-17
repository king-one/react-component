import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class MenuItem extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
  };
  static defaultProps = {
    prefixCls: _PRE_ +'menu-item'
  };

  onClick = e => {
    const { index, onClick, disabled } = this.props;
    if (disabled) return;
    onClick(e, index);
  };

  render() {
    const { prefixCls,className, children, disabled } = this.props;
    const classNames = classnames(
        prefixCls,
        {[`${prefixCls}-menu-item-disabled`]: disabled},
        className
    )
    return (
      <li
        className={classNames}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}