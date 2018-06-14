import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ModalController {
  constructor() {
    this.backdropRendered = false

    // 如果要在句柄里访问this.modalBackdrop变量，则只能把方法作为实例的一个对象
    this.handleClickBackDrop = e => {
      if (e.target === this.modalBackdrop) {
        this.unmount()
      }
    }
    this.modalBackdrop = document.createElement('div')
    this.modalBackdrop.className = 'modal-backdrop'
    this.modalBackdrop.addEventListener('click', this.handleClickBackDrop, false)
  }

  render(ReactElement) {
    if (!this.backdropRendered) {
      document.body.append(this.modalBackdrop)
    }

    ReactDOM.render(ReactElement, this.modalBackdrop)
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.modalBackdrop)
    this.modalBackdrop.remove()
    this.backdropRendered = false
  }
}

export default ModalController