import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';


const propTypes = {
  prefixClass: PropTypes.string,
  pullRight: PropTypes.bool,
  onSelect: PropTypes.func,
  activeKey: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  prefixClass: 'dropdown',
  pullRight: false,
  onSelect: null,
  activeKey: null
};

class DorpdownMenu extends React.Component {
  render() {
    const {pullRight, children,className,activeKey,onSelect, prefixCls,...other} = this.props;
    const classNames = classNames({
      [`${prefixCls}-menu-right`]: pullRight
    }, `${prefixCls}-menu`, className);
    function mapCloneElement(children, func, context) {
        return map( children, (child, index) => (
          React.cloneElement(child, {
            key: index,
            ...func(child, index)
          })
        ), context);
      }
      
    const items = React.Children.map(children, (item) => { //使用React.Children.map不用关心 children是否存在
      let { eventKey, active, onSelect: onItemSelect } = item.props;
      React.cloneElement(child,{
        onSelect: onItemSelect,
        active: activeKey
      })
    });
    return (
      <ul
        {...props}
        className={classNames}
      >
        {items}
      </ul>
    );
  }

}
DorpdownMenu.propTypes = propTypes;
DorpdownMenu.defaultProps = defaultProps;

export default DorpdownMenu;