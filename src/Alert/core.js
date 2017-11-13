import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Notice from './Notice';

let id = 0;
/**
 * @description:创建dom的 id
 */
const getUid = () => {
  return `rsuite-noticition-${Date.now()}-${id++}`;
};
const propTypes = {
  prefixCls:PropTypes.string,
  style:PropTypes.object
};
const defaultProps = {
  prefixCls: _PRE_ +'-notification',
  style: {
    top: '5px',
  }
};

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []  // 暂存已经打开的提示组件
    };
  }
  /**
   * @description: 增加提示组件 储存在state中  为每个加入的组件增加key标识
   */
  add = (notice) => {
    const { notices } = this.state;
    let key;
    if (notice.key === undefined || notice.key === null) {
      key = getUid();
    } else {
      key = notice.key;
    }
    notice.key = key;
    //检测新增加的notice的key是否与与储存的key相同
    if (!notices.filter(notice => notice.key === key).length) { //filter方法返回的是一个新数组
      this.setState({
        notices: notices.concat(notice)
      });
    }
  }
  /**
   * @decription: 删除
   */
  remove = (key) => {
    console.log(this.state.notices.filter(notice => notice.key !== key));
    // 注意 setState((prevState, props) =>{...}))可以接收一个函数，两个参数，第一个参数表示上一个状态值，第二参数表示当前的 props
    this.setState((prevState) => {
      return {
        notices: prevState.notices.filter(notice => notice.key !== key)
      };
    });
  }

  render() {
    console.log(this.props)
    const { notices } = this.state;
    const { prefixCls ,className, style , duration, ...other } = this.props;
    const noticeNodes = notices.map((notice) => {
      return <Notice
        className={prefixCls}
        {...notice}
        duration={duration}
        style={style}
        onClose={(key=notice.key) => this.remove(key)}
      />;
    });
    const classNames = classnames(
      prefixCls,
      className
    );
    return (
      <div className={classNames} style={style}  {...other} id='ooo'>
       {noticeNodes}
      </div>
    );
  }
}

Notification.propTypes = propTypes;

Notification.defaultProps = defaultProps;

Notification.instance = properties => {
  const { getContainer, ...props } = properties || {};
  let container;
  if (getContainer) { //暂时没有指定容器的功能  这里为后续拓展准备
    container = getContainer();
  } else {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  const notificationInstance = ReactDOM.render(<Notification {...props} />, container); //
  return {
    notice(noticeProps) {
       notificationInstance.add(noticeProps);
    },
    remove(key) {
      notificationInstance.remove(key);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(container);
      document.removeChild(container);
    }
  };
};

export default Notification;