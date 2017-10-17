import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CommonMenu from './CommonMenu';
const propTypes = {
    prefix: PropTypes.string,
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    index: PropTypes.string,
    overlayCls: PropTypes.string
  };
class PopupMenu extends CommonMenu {
  handleClick = (e, index) => {
    const { onClick } = this.props;
    onClick(e, index);
  };

  renderSubMenuItems = (c, i) => {
    if (!c) {
      return null;
    }
    const { index } = this.props;
    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const { children, prefixCls, visible, overlayCls } = this.props;
    const classNames = classnames(
        `${prefixCls}-menu`, 
        `${prefixCls}-submenu-content`, 
        overlayCls)
    if (!visible) {
      return null;
    }
    return (
      <ul
        className={classNames}
      >
        {React.Children.map(children, this.renderSubMenuItems)}
      </ul>
    );
  }
}
PopupMenu.propTypes = propTypes;
export default PopupMenu;