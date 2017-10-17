import React, { Component } from 'react';
const getKeyFromChildrenIndex = (child, index, subPrefix = 'item') =>{
      return child.key || `${subPrefix}_${index}`;
  }
export default class CommonMenu extends Component {
  renderCommonMenuItem(c, i, subPrefix, extraProps) {
    const newChildProps = {
      index: getKeyFromChildrenIndex(c, i, subPrefix),
      onClick: this.handleClick,
      ...extraProps
    };
    return React.cloneElement(c, newChildProps);
  }
}