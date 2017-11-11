
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';

import ButtonGroup from '../ButtonGroup'
import Button from '../Button'
import { CheckBox, CheckBoxGroup } from '../CheckBox';
import  Icon from '../Icon';
import  Limit from '../Limit';
import './index.less';
const defaultProps = {
    prefixCls:_PRE_ + '-drop-check'
}
class DropCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checkedList: []
        };
    }
    dropToggle = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            open: this.state.open ? false : true
        })
        const oneHandler= () =>{
             this.setState({
                open: false
            })
            document.removeEventListener('click',oneHandler)
        }
        document.addEventListener('click', oneHandler)
    }
    stopPop = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }
    // checkbox 全选
    handleCheckedAll = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.props.items.slice() : []
        })
    }
    
    handleConfirm = (e) =>{
        const {onConfrim} = this.props;
         console.log(this.state.checkedList)
        onConfrim && onConfrim(this.state.checkedList)
    }
    handleCancel = (e) =>{
         const {onCancel} = this.props;
         onCancel && onCancel()
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
        console.log(v);
        checkedList.indexOf(v) === -1 ? checkedList.push(v) : checkedList.remove(v);
        this.setState({ checkedList })
    }
    render() {
        const { prefixCls,title, items } = this.props;
        const { checkedList,open } = this.state
        const checkedAll = !!checkedList.length && (checkedList.length === items.length)
        const indeterminate = !!checkedList.length && (checkedList.length !== items.length)
        const classNames = classnames(
            `${prefixCls}-wrap`, {
                [`${prefixCls}-open`]: open
            })
        const overPanel =(<div className= {`${prefixCls}-over-panel`}>
            <div onClick = {this.stopPop}>
                 <CheckBox
                checked={checkedAll}
                indeterminate={indeterminate}
                onChange={this.handleCheckedAll}
            >全选</CheckBox>
            <CheckBoxGroup block
                checkedList={checkedList}
                onChange={(v) => this.handleChange(v)}>
                {items.map(item => {
                    return <CheckBox key={item} value={item}><span title={item}>{item}</span></CheckBox>
                })}
            </CheckBoxGroup>
            </div>
            <ButtonGroup className={`${prefixCls}-footer`} feature='around'>
            <Button feature="transparent" onClick={this.handleConfirm}>确定</Button>
            <Button  feature="transparent" onClick={this.handleCancel}>取消</Button>
            </ButtonGroup>
        </div>)
        return (
            <div className={classNames}>
                <div className={`${prefixCls}-box`} onClick={this.dropToggle}>{title} <Icon type='caret-down' className={`${prefixCls}-icon`} /></div>
                {open ? overPanel : null}
            </div>
        )
    }
}
DropCheckBox.defaultProps =defaultProps;
export default DropCheckBox;