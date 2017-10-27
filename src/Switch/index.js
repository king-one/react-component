import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'
import './index.less'
const propTypes = {
  on: PropTypes.bool,
  defaultOn: PropTypes.bool,
  onChange: PropTypes.func,
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}
const defaultProps ={
    prefixCls: _PRE_ + "-switch"
}
class Switch extends Component {

  constructor(props) {
    super()
    this.state = {
      on: props.on || props.defaultOn || false
    }
  }

  componentWillReceiveProps(nextProps) {
    'on' in nextProps && this.setState({on: nextProps.on})  
  }

  handleChange = e => {
    e.stopPropagation()
    this.setState({on: e.target.checked})
    this.props.onChange && this.props.onChange(e.target.checked)
  }

  render() {
    
    const { prefixCls,className, defaultOn, iconOn,iconOff,onChange, labelOn, labelOff, ...other } = this.props;
    const { on } = this.state;
    const icon = iconOn && iconOff;
    const classNames = classnames(
        prefixCls,
         {  
             [`${prefixCls}-diy`] : icon
            },
         className
     )
    delete other.on 
    return (
      <label className={classNames} {...other}>
        <input type="checkbox" checked={on} onChange={this.handleChange} />
        {icon && <Icon type={on ? iconOn : iconOff} />}
        <span className={classnames(icon ?`${prefixCls}-diy-text` :`${prefixCls}-text`)}>{on ? labelOn : labelOff}</span>
      </label>
    )
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps

export default Switch