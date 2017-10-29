/*
 * @Author: chen gong 
 * @Date: 2017-10-28 15:14:16 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-29 17:22:45
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  duration: PropTypes.number,
  content: PropTypes.any,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string
};

const defaultProps = {
  prefixCls:_PRE_ + '-notification'

};
/**
 * @description: 生成提示内容组件 支持装入react elemnet 支持关闭回调
 */
class Notice extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
    };
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  close = () => {
    this.clearCloseTimer();
    this.props.onClose();
  }

  render() {
    const { prefixCls, closable, className,onClose,content, type,...other} = this.props;
    console.log(prefixCls)
    const classNames = classnames(
      `${prefixCls}-notice`,{
      [`${prefixCls}-notice-closable`]: closable,
      [`${prefixCls}-${type}`]: !!type,
    },
    className
  );

    return (
      <div className={`${prefixCls}-notice-wrapper`} {...other}>
        <div className={classNames}>
          <div className={`${prefixCls}-notice-content`}>{content}</div>
          {closable && <span onClick={this.close} className={`${prefixCls}-notice-close`}>
          </span>}
        </div>
      </div>
    );
  }
}

Notice.propTypes = propTypes;

Notice.defaultProps = defaultProps;

export default Notice;