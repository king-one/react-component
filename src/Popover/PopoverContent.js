/*
 * @Author: chen gong 
 * @Date: 2017-10-24 15:23:47 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-24 16:57:37
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'
import placementFactory from './placementFactory'

class PopoverContent extends Component {

  getChildContext() {
    return {
      popoverContent: this
    }
  }

  componentDidMount() {
    this.setPosition()
  }

  componentDidUpdate() {
    this.setPosition()
  }
  setPosition() {
    const {prefixCls,triggerNode, direction, align } = this.props
    const rootNode = ReactDOM.findDOMNode(this)
    rootNode.style.display = 'block'

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(rootNode).remove(...this.positionClassNames.split(' '))
    }
    const [computedDirection, computedAlign] = placementFactory(
      triggerNode, rootNode, direction, align
    )
    this.positionClassNames = classnames({
      [`${prefixCls}-${computedDirection}`]: true,
      [`${prefixCls}-align-${computedAlign}`]: !!computedAlign
    })
    classlist(rootNode).add(this.positionClassNames)
  }

  render() {
    const {
     prefixCls, children, className, triggerNode, triggerMode, direction, align, ...other
    } = this.props
    return (
      <div className={classnames(prefixCls, {
        [`${prefixCls}-animation`]: triggerMode === 'hover'
      }, className)} {...other}>
        <div className={`${prefixCls}-content`}>
          {children}
        </div>
      </div>
    )
  }
}

PopoverContent.childContextTypes = {
  popoverContent: PropTypes.instanceOf(PopoverContent)  //校验累的实例
}
PopoverContent.defaultProps = {
  prefixCls:_PRE_ + '-popover'
}

export default PopoverContent
