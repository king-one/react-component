
import React from 'react'
import classnames from 'classnames'

const DropdownToggle = props => {
  const { className, children, open, ...other } = props
  return (
    <div className={classnames('bfd-dropdown-toggle', {
      'bfd-dropdown-toggle--open': open
    }, className)} {...other}>
      {children}
    </div>
  )
}

export default DropdownToggle
