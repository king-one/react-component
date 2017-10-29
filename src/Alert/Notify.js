import React from 'react';
import classnames from 'classnames';
import Notification from './core';
const PLACEMENT_TYPES = {
  TOPLEFT: 'topLeft',
  TOPRIGHT: 'topRight',
  BOTTOMLEFT: 'bottomLeft',
  BOTTOMRIGHT: 'bottomRight'
};
const NOTICE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

const defaultProps = {
  placement: 'topRight',
  top: 24,
  bottom: 24,
  duration: 4.5
}

let notityInstance = {};
/**
 * 
 * @param {*} placement  位置情况
 */
function getPlacementStyle(placement) {
  const { defaultPlacement, defaultTop, defaultBottom, defaultDuration } = defaultProps;
  placement = !!placement ? placement : defaultPlacement;
  let style = {};
  let className;
  switch (placement) {
    case PLACEMENT_TYPES.TOPLEFT:
      style = {
        top: defaultTop,
        left: 24,
      };
      className = 'rsuite-topLeft';
      break;
    case PLACEMENT_TYPES.TOPRIGHT:
      style = {
        top: defaultTop,
        right: 24,
      };
      className = 'rsuite-topRight';
      break;
    case PLACEMENT_TYPES.BOTTOMLEFT:
      style = {
        bottom: defaultBottom,
        left: 24,
      };
      className = 'rsuite-bottomLeft';
      break;
    case PLACEMENT_TYPES.BOTTOMRIGHT:
      style = {
        bottom: defaultTop,
        right: 24,
      };
      className = 'rsuite-bottomRight';
      break;
    default:
      style = {
        top: defaultTop,
        left: 24,
      };
      break;
  }
  return { style, className };
}
/**
 * 
 * @description: notityInstance[placement] 说明 notify 的定位 与 notification的实例有关 与notice组件无关  
 * 按定位分类 notification的实例，  可以实现 新增的notice组件直接插入对应placement的notification的容器中
 * dom自动调整位置 这就不需要再次设定notice组件的位置
 */
function getInstance(placement = defaultPlacement) {
  if (!notityInstance[placement]) {
    let className = {
      'rsuite-notify': true,
      [getPlacementStyle(placement).className]: true
    }
    notityInstance[placement] = Notification.instance({
      style: getPlacementStyle(placement).style,
      className: classnames(className),
    });
  }
  return notityInstance[placement];
}

/**
 *
 * @param {*} options : title,description,style,duration,placement,top, bottom, onClose,type, key
 */
function notice(options) {
  const { title, description, placement, onClose, type, key } = options;
  let content = (
    <div className="notify">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
  let instance = getInstance(placement);
  instance.notice({
    content,
    duration,
    closable: true,
    onClose,
    key,
    type,
  });
};

export default {
  open(options) {
    notice(options);
  },
  success(options) {
    options.type = NOTICE_TYPES.SUCCESS;
    notice(options);
  },
  error(options) {
    options.type = NOTICE_TYPES.ERROR;
    notice(options);
  },
  info(options) {
    options.type = NOTICE_TYPES.INFO;
    notice(options);
  },
  warning(options) {
    options.type = NOTICE_TYPES.WARNING;
    notice(options);
  },
  remove(key) {
    if (notityInstance[defaultPlacement]) {
      notityInstance[defaultPlacement].remove(key);
    }
  },
  config(options) {
    Object.assign(defaultProps, options)
  }
};