import React, { Component, PropTypes } from "react"
import classnames from "classnames"
import Icon from "common/src/Icon"
import { CheckBox, CheckBoxGroup } from "common/src/CheckBox"
import Jsutils from "../_utils/jsutils";
class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      checkedList: []
    };
  }
  // checkbox 全选
  handleCheckedAll = (e) => {
    const checkedList = e.target.checked ? this.props.items.slice() : []
    this.setState({
      checkedList
    })
    const { handleChange } = this.props;
    handleChange(this.props.items.slice(), checkedList) // 传入items的目的是删除已经添加到总的checklist中的值
  }
  handleChange = (v) => {
    /*原型上添加删除方法*/
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    const { checkedList } = this.state;
    const { handleChange } = this.props;
    checkedList.indexOf(v) === -1 ? checkedList.push(v) : checkedList.remove(v);
    this.setState({ checkedList })
    handleChange(this.props.items.slice(), checkedList)
  }
  handleSubPanel = e => {
    const pel = e.currentTarget
    const el = pel.parentNode.lastChild;
    Jsutils.hasClass(pel, 'rotate') ? Jsutils.removeClass(pel, 'rotate') : Jsutils.addClass(pel, 'rotate');
    el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }
  render() {
    const { checkedList } = this.state;
    const { items,classify } = this.props;
    const checkedAll = !!checkedList.length && (checkedList.length === items.length)
    const indeterminate = !!checkedList.length && (checkedList.length !== items.length)
    return (
      <li className="parent-item">
        <Icon type='caret-down' className="rotate" onClick={this.handleSubPanel} />
        <CheckBox
          checked={checkedAll}
          indeterminate={indeterminate}
          onChange={this.handleCheckedAll}
        >{classify}</CheckBox>
        <ul className="sub-panel" style={{ display: 'none' }}>
          <CheckBoxGroup block
            checkedList={checkedList}
            onChange={(v) => this.handleChange(v)}>
            {items.map(item => {
              return <CheckBox key={item} value={item}><span title={item}>{item}</span></CheckBox>
            })}
          </CheckBoxGroup>
        </ul>
      </li>
    )
  }
}
export default Unit;