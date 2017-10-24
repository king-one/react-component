import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import isPlainObject from 'lodash/isPlainObject'
import Modal from '../Modal'
import Button from '../Button'
class Confirm extends Component {
    state ={
        open:true
    }
  handleConfirm = () => {
      this.props.onConfirm && this.props.onConfirm()
      this.close()
  }
  open = () => {
    this.setState({
        open:true
    })
  }

  close = () => {
    this.setState({
        open:false
    })
  }

  render() {
    const {title, content, operation, okText, cancelText } = this.props;
        return (
            <Modal className="bfd-confirm" visible={this.state.open} onClose = {this.close}>
             <Modal.ModalHeader>{title}</Modal.ModalHeader>
             <Modal.ModalBody>{content}</Modal.ModalBody>
                  {operation ? operation : (
                    <div className="footer">
                      <Button onClick={this.handleConfirm}>{okText}</Button>
                      <Button feature="transparent" onClick={this.close}>{cancelText}</Button>
                    </div>
                  )}
            </Modal>
          )
    }
  }


Confirm.defaultProps = {
  title: '确认提示',
  okText: '确定',
  cancelText: '取消'
}

Confirm.propTypes = {
  title: PropTypes.node,
  okText: PropTypes.node,
  cancelText: PropTypes.node,
  content: PropTypes.node,
  operation: PropTypes.element,
  onConfirm: PropTypes.func
}

/**
 * @public
 * @name confirm
 * @param  { ReactNode | Object } content 显示内容 | 配置项
 * @param  { function } [onConfirm] 确定后的回调
 * @description 确认提示，eg
 * ```js
 * confirm('确认删除吗？', () => console.log('确认'))
 * ```
 * 更多控制请使用配置项方式：
 * ```js
 * confirm({
 *   content: 'xxx', // 提示内容
 *   onConfirm: function() {}, // 确定后的回调，非自定义操作下使用
 *   operation: <Button>xxx</Button>, // 自定义操作逻辑，默认两个按钮：确认、取消
 *   title: 'xxx', // 提示框标题，默认`确认提示`，可全局配置
 *   okText: 'xxx', // 确定按钮文字，默认`确定`，可全局配置
 *   cancelText: 'xxx', // 取消按钮文字，默认`取消`，可全局配置
 * })
 * ```
 */

let instance, container
function confirm(content, onConfirm) {
  let props
  if (isPlainObject(content) && !React.isValidElement(content)) {
    props = content
  } else {
    props = { content, onConfirm }
  }
  if (!container) {
    container = document.createElement('div')
  }
  // Model 会单独创建真实 DOM 容器，所以 Confirm 的容器无需挂在到真实 DOM 中
  instance = render(<Confirm {...props} />, container)
  instance.open()
}

/**
 * @public
 * @name confirm.close
 * @description 关闭确认提示
 */
confirm.close = () => {
  instance.close()
}

/**
 * @public
 * @name confirm.config
 * @param { Object } options
 * @description confirm 全局配置，配置项
 * ```js
 * {
 *   title: 'xxx', // 提示框标题，默认`确认提示`
 *   okText: 'xxx', // 确定按钮文字，默认`确定`
 *   cancelText: 'xxx', // 取消按钮文字，默认`取消`
 * }
 * ```
 */
confirm.config = options => {
  Object.assign(Confirm.defaultProps, options)
}

export default confirm