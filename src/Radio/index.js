import React, {Component, PropTypes } from 'react'
import classnames from 'classnames'
class Radio extends Component {
  render() {
    const {
    prefixCls,
      children, className, value, name, checked, defaultChecked, onChange, disabled,
      ...other
  } = this.props
    const inputProps = { value, checked, defaultChecked,onChange, disabled ,name }
    console.log(defaultChecked)
    const classNames = classnames(prefixCls, {
      [`${prefixCls}-disabled`]: inputProps.disabled
    }, className)
    return (
      <label
        tabIndex={inputProps.disabled ? -1 : 0}
        className={classNames}
        {...other}
      >
        <input type="radio" {...inputProps} />
        <span className={`${prefixCls}-status`} />
        {children && <span className={`${prefixCls}-text`}>{children}</span>}
      </label>
    )
  }
}
Radio.defaultProps = {
  prefixCls: _PRE_ + '-radio'
}
Radio.propTypes = {
  // 值，如果结合 RadioGroup 使用，与其 value 或 defaultValue 对应
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // 单独使用时，是否选中，与 RadioGroup 一起使用时无需指定
  checked: PropTypes.bool,
  // 单独使用时，初始是否选中（不可控），与 RadioGroup 一起使用时无需指定
  defaultChecked: PropTypes.bool,
  // 单独使用时，切换选中后的回调，参数为 event 对象，与 RadioGroup 一起使用时无需指定
  onChange: PropTypes.func,
  // 是否禁用
  disabled: PropTypes.bool
}
export default Radio