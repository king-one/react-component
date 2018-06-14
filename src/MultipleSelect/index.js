/**
 * Created by cg on 2018/2/24.
 */
import React, { Component, PropTypes } from "react"
import classnames from "classnames"
import Icon from "../Icon"
import { CheckBox, CheckBoxGroup } from "../CheckBox"
import Unit from "./unit"
import Jsutils from "../_utils/jsutils";
import './index.less'
const defaultProps = {
  prefixCls: _PRE_ + '-multiple-select',
  list: []
}
class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checkedList: []
    };
  }
  componentDidMount() {
    this.onece = true;
    this.oneHandler = () => {
      this.setState({
        open: false
      });
      document.removeEventListener('click', this.oneHandler)
    }
    document.addEventListener('click', this.oneHandler)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.oneHandler)
  }
  dropToggle = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      open: this.state.open ? false : true
    })
    const oneHandler = () => {
      this.setState({
        open: false
      })
      const { onChange } = this.props;
      const { checkedList } = this.state;
      onChange && onChange(checkedList);
      document.removeEventListener('click', oneHandler)
    }
    document.addEventListener('click', oneHandler)
  }
  stopPop = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation()
  }
  handleChange = (arr1, arr2) => {
    let { checkedList } = this.state;
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    arr1.forEach(v => checkedList.indexOf(v) != -1 && checkedList.remove(v));
    checkedList = Jsutils.uniqueArray(checkedList.concat(arr2))
    this.setState({ checkedList })
  }
  render() {
    const { prefixCls, list } = this.props;
    const { open,checkedList} = this.state;
    const classNames = classnames(
      `${prefixCls}-wrap`, {
        [`${prefixCls}-open`]: open
      });
    return (
      <div className={classNames}>
        <div className={`${prefixCls}-box`} onClick={this.dropToggle}><Icon type='caret-down' className={`${prefixCls}-icon`} />{checkedList.length ? checkedList.join() : "请选择"}</div>
        <div className={`${prefixCls}-over-panel`} style={{ display: open ? 'block' : 'none' }}>
          <div onClick={this.stopPop}>
            <ul>
              {list.map((v, k) => <Unit key={k} items={v.contain} classify={v.classify} handleChange={this.handleChange} />)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
MultipleSelect.defaultProps = defaultProps;
export default MultipleSelect;