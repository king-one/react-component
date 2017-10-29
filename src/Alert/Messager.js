/*
 * @Author: chen gong 
 * @Date: 2017-10-28 01:46:54 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-29 12:17:47
 */
import Notification from './core';
const NOTICE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};
const defaultProps = {
  style: { top: 5 },
  duration: 10.5,
  className: _PRE_ + '-messager'
};
function getInstance(instance) {
  return instance || Notification.instance(defaultProps);
}
let messagerInstance;
function newNotice(options) {
  debugger
  const {content,onClose,type} = options;
  messagerInstance = getInstance();
  messagerInstance.notice({
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