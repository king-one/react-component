

import { PropTypes } from 'react'

const DropdownMenu = () => null

DropdownMenu.defaultProps = {
  direction: 'down',
  align: 'left'
}
DropdownMenu.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle']),
  right: PropTypes.bool
}
export default DropdownMenu
