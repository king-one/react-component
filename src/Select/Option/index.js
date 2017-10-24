/*
 * @Author: chen gong 
 * @Date: 2017-10-24 14:40:19 
 * @Last Modified by:   chen gong 
 * @Last Modified time: 2017-10-24 14:40:19 
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import TextOverflow from '../../TextOverflow'
import Icon from '../../Icon'
import './index.less'

const Option = props => {
  const { children, className, data, value, selected, active, ...other } = props
  const classNames = classnames(
    'bfd-select__option',
    {
      'bfd-select__option--active': active,
      'bfd-select__option--selected': selected
    },
    className
  )
  return (
    <li className={classNames} {...other}>
      <TextOverflow>
        <div>{children}</div>
      </TextOverflow>
      {selected && <Icon type="check" className="bfd-select__option-icon--selected" />}
    </li>
  )
}

Option.propTypes = {

  // 值，与 Select value 对应，数据类型也要一致
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  selected: PropTypes.bool,
  active: PropTypes.bool
}

export default Option
