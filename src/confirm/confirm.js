// need wetoo-style support

import React, { Component } from 'react'
import { SvgIcon as Icon } from 'common/src/Icon'
import ModalController from './modal-controller'

const BUTTON_TYPE = {
  OK: 'Ok',
  OKCancel: 'OkCancel',
  YesNo: 'YesNo'
}

const emptyFunction = x => x

const modalController = new ModalController()

class Confirm extends Component {
  static defaultProps = {
    title: '确认',
    html: false,
    content: '',
    button: BUTTON_TYPE.YesNo,
    onConfirm: emptyFunction,
    onCancel: emptyFunction
  }

  render() {
    const { props } = this
    let ModalFooter = null

    switch(props.button) {
      case BUTTON_TYPE.OK:
        ModalFooter = (
          <div className="modal-footer">
            <button className="button" onClick={this.handleClickConfirm}>确认</button>
          </div>
        )
        break
      case BUTTON_TYPE.OKCancel:
        ModalFooter = (
          <div className="modal-footer">
            <button className="button" onClick={this.handleClickConfirm}>确认</button>
            &nbsp;
            <button className="button button-text" onClick={this.handleClickCancel}>取消</button>
          </div>
        )
        break
      case BUTTON_TYPE.YesNo:
        ModalFooter = (
          <div className="modal-footer">
            <div className="modal-footer">
              <button className="button" onClick={this.handleClickConfirm}>是</button>
              &nbsp;
              <button className="button button-text" onClick={this.handleClickCancel}>否</button>
            </div>
          </div>
        )
        break
      default:
        break
    }

    return (
      <div className="modal modal-confirm">
        <div className="modal-header">
          <span className="left-title">{props.title}</span>
          <span className="center-title" />
          <a href="javascript:;" className="btn-close" onClick={this.handleClickCancel}>
            <svg className="icon"><Icon name="icon-cross" /></svg>
          </a>
        </div>
        {
          props.html
          ? <div className="modal-body" dangerouslySetInnerHTML={{__html: content}} />
          : <div className="modal-body">{props.content}</div>
        }
        {ModalFooter}
      </div>
    )
  }

  handleClickConfirm = e => {
    modalController.unmount()
    this.props.onConfirm()
  }

  handleClickCancel = e => {
    modalController.unmount()
    this.props.onCancel()
  }
}

const renderConfirmModal = function(content, option = {}) {
  return new Promise(resolve => {
    let props = {
      content,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    }

    if ('title' in option) { props.title = option.title }
    if ('html' in option) { props.html = option.html }
    if ('button' in option) { props.button = option.button }

    modalController.render(
      <Confirm {...props} />
    )
  })
}

export default renderConfirmModal