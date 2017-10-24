
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
const propTypes = {
  prefixCls:PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
const defaultProps = {
    prefixCls:_PRE_+ '-input',
}
class Input extends Component {
  /**
   * @description 同 HTMLInputElement.focus()
   */
  focus() {
    this.input.focus()
  }
  
  /**
   * @description 同 HTMLInputElement.select()
   */
  select() {
      this.input.select()
  }
  handleKeyDown = evt => {
    const { onKeyDown, onPressEnter } = this.props;
    if (onPressEnter && evt.keyCode === 13) {
      onPressEnter(evt);
    }
  };
  render() {
    const {prefixCls,className, size, onPressEnter,...other } = this.props
    const classNames = classnames(
      prefixCls,
      {
        [`${prefixCls}-${size}`]: size
      },
      className
    )
    return <input ref={input => this.input = input} 
    onKeyDown={this.handleKeyDown}
    className={classNames} { ...other } />
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
