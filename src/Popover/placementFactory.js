/*
 * @Author: chen gong 
 * @Date: 2017-10-24 15:01:32 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-24 15:20:23
 */

 /**
  * @description: 获取滚动条位置
  */
function getDocumentScroll() {
  const { documentElement, body } = document
  return [
    documentElement && documentElement.scrollTop || body.scrollTop,
    documentElement && documentElement.scrollLeft || body.scrollLeft
  ]
}

function placementFactory(triggerNode, popoverNode, direction, align) {
  const [scrollTop, scrollLeft] = getDocumentScroll()
  const PF = placementFactory
  PF.triggerRect = triggerNode.getBoundingClientRect()  //获取元素在视口中的位置
  PF.popoverRect = popoverNode.getBoundingClientRect()
  PF.direction = PF.getComputedDirection(direction)
  PF.align = PF.getComputedAlign(align)
  PF.center = [
    PF.triggerRect.left + PF.triggerRect.width / 2 + scrollLeft,
    PF.triggerRect.top + PF.triggerRect.height / 2 + scrollTop
  ]

  const [left, top] = PF.placementMap[PF.direction].call(PF)
  popoverNode.style.left = left + 'px'
  popoverNode.style.top = top + 'px'

  return [PF.direction, PF.align]
}

Object.assign(placementFactory, {

  triggerRect: null,

  popoverRect: null,

  align: null,

  center: null,

  getComputedDirection(direction) {
    const { triggerRect, popoverRect } = this
    if (direction === 'up' || direction === 'down') {
      if (triggerRect.top < popoverRect.height) {
        direction = 'down'
      } else if (popoverRect.height + triggerRect.top + triggerRect.height > window.innerHeight) {
        direction = 'up'
      }
    }
    return direction
  },
/**
 * 
 * @param {*} align
 * @description 判断对齐方式
 * 
 */
  getComputedAlign(align) {
    if (align === 'middle') {
      return align
    }
    if (this.direction === 'up' || this.direction === 'down') {
      if (align === 'top' || align === 'bottom') {
        return 'middle'
      }
    } else {
      if (align === 'left' || align === 'right') {
        return 'middle'
      }
    }
    return align
  },

  getAlignPosition(horizontal) {
    const types = horizontal ? ['left', 'right'] : ['top', 'bottom']
    const axis = horizontal ? 0 : 1
    const size = horizontal ? 'width' : 'height'
    if (this.align === types[0]) {
      return this.center[axis] - this.triggerRect[size] / 2
    } else if (this.align === types[1]) {
      return this.center[axis] - this.popoverRect[size] + this.triggerRect[size] / 2
    } else {
      return this.center[axis] - this.popoverRect[size] / 2
    }
  },

  placementMap: {
    up() {
      const top = this.center[1] - this.triggerRect.height / 2 - this.popoverRect.height
      return [this.getAlignPosition(true), top]
    },
    down() {
      const top = this.center[1] + this.triggerRect.height / 2
      return [this.getAlignPosition(true), top]
    },
    left() {
      const left = this.center[0] - this.triggerRect.width / 2 - this.popoverRect.width
      return [left, this.getAlignPosition()]
    },
    right() {
      const left = this.center[0] + this.triggerRect.width / 2
      return [left, this.getAlignPosition()]
    }
  }
})

export default placementFactory
