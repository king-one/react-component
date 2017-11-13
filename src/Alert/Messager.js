/*
 * @Author: chen gong 
 * @Date: 2017-10-28 01:46:54 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-11-12 02:28:50
 */
import Notification from './core'; //notification为 messgaer 和 notify的基础组件
const NOTICE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};
const defaultProps = {
  style: { top: 5 },
  duration: 3,
  className: _PRE_ + '-messager'
};

  // 获取notification的实例  如果已经存在实例则返回当前实例 否则创建实例 
  // 这样可以保证每次新建消息组件在一个div中  并依次排列不会重合
function getInstance(instance) {  
  return instance || Notification.instance(defaultProps);
}
let messagerInstance;
function newNotice(options) {
  const {content,onClose,type} = options;
  messagerInstance = getInstance(messagerInstance);
  messagerInstance.notice({ //调用实例的创建方法
    content,
    onClose,
    type,
    closable: true
  });
}
/**
 * succee({
 *   content:xxxx,
 *   onCLose"xxxx,
 *   ....
 * })
 */
export default {
  success(options) {
    options.type = NOTICE_TYPES.SUCCESS
    newNotice(options);
  },
  error(options) {
    options.type = NOTICE_TYPES.ERROR
    newNotice(options);
  },
  info(options) {
    options.type = NOTICE_TYPES.INFO
    newNotice(options);
  },
  warning(options) {
    options.type = NOTICE_TYPES.WARNING
    newNotice(options);
  },
  config (options) {
    Object.assign(defaultProps, options)
  }
};