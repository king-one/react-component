/*
 * @Author: chen gong 
 * @Date: 2017-10-24 14:40:19 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-30 15:43:11
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Limit from '../../Limit'
import Icon from '../../Icon'
import './index.less'
const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  active: PropTypes.bool
}
const defaultProps =   {
  prefixCls: _PRE_+'-select-option'
}
const Option = props => {
  const {prefixCls, children, className, data, value, selected, onSlected, ...other } = props;
  console.log(props)
  const classNames = classnames(
    prefixCls,
    {
      [`${prefixCls}-active`]: selected,
      [`${prefixCls}-selected`]: selected
    },
    className
  )
  const handleClick = () =>{
     onSlected(props)
  }
  return (
    <li className={classNames} onClick = {handleClick} {...other}>
      <Limit>
        <div>{children}</div>
      </Limit>
      {selected && <Icon type="check" className={`${prefixCls}-icon-selected`} />}
    </li>
  )
}

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;
export default Option
