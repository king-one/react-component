
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';

import ButtonGroup from '../ButtonGroup'
import Button from '../Button'
import { CheckBox, CheckBoxGroup } from '../CheckBox';
import SearchInput from '../SearchInput'
import Icon from '../Icon';
import { SvgIcon } from 'common/src/Icon'
import Limit from '../Limit';
import xhr from '../xhr'
import './index.less';
const defaultProps = {
    prefixCls: _PRE_ + '-drop-check'
}
const pageSize = 30;
class DropCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            keyword: null,
            checkedList: props.checkedList ? props.checkedList : [],
            items: props.isComment ? ['正面', '负面', '空值'] : [],
            pageItems: props.isComment ? ['正面', '负面', '空值'] : [],
            page: 1,
            currentVal: props.checkedList ? props.checkedList.length >= 2 ? '多选' : props.checkedList[0] : '请选择'
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

    /*    componentWillReceiveProps(nextProps) {
            if (this.props.items.length != nextProps.items.length) {
                this.setState({
                    items: nextProps.items,
                    page: 1,
                }, () => this.getPage());
            }
        }*/
    componentWillUnmount() {
        document.removeEventListener('click', this.oneHandler)
    }
    dropToggle = (e) => {
        const { fid, isComment } = this.props;
        if (fid && !this.state.open && this.onece) {
            !isComment && this.handleSearch()
            this.onece = false
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            open: this.state.open ? false : true
        })
        const oneHandler = () => {
            this.setState({
                open: false
            })
            document.removeEventListener('click', oneHandler)
        }
        document.addEventListener('click', oneHandler)
    }
    stopPop = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }
    loadItems = (e) => {
        const el = e.currentTarget;
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
             this.getPage()
        }
    }
    // getPage = () => {
    //     const { page, items } = this.state;
    //     if (page * pageSize > items.length + pageSize)
    //         return
    //     const pageItems = items.slice(0, page * pageSize)
    //     this.setState({
    //         page: page + 1,
    //         pageItems
    //     })
    // }
    // checkbox 全选
    handleCheckedAll = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.state.items.slice() : []
        })
    }
    handleConfirm = (e) => {
        const { onConfirm, fieldInfo } = this.props;
        onConfirm && onConfirm(this.state.checkedList, fieldInfo)
    }
    handleCancel = (e) => {
        const { onCancel } = this.props;
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
        checkedList.indexOf(v) === -1 ? checkedList.push(v) : checkedList.remove(v);
        this.setState({ checkedList })
    }
    handleRemove = () => {
        const { onRemove, fieldInfo } = this.props;
        onRemove && onRemove(fieldInfo)
    }
    handleSearch = (keyword) => {
        this.setState({ keyword,items:[]}, e => {
            this.getPage(1)
        })
    }

    getPage = (pageNum) => {
        const { fid } = this.props;
        let { page, items, keyword } = this.state;
        console.log(page)
        xhr.post('/chart/searchForAutoComplete', {
            schemaId: fid,
            pageNum: pageNum || page,
            pageSize,
            keyword
        }, data => {
            this.setState({
                page: pageNum + 1|| page + 1,
                pageItems: data.result,
                items: items.concat(data.result)
            })
        })
    }
    render() {
        const { prefixCls, title, isComment } = this.props;
        const { items, checkedList, open, pageItems, currentVal } = this.state;
        const checkedAll = !!checkedList.length && (checkedList.length === items.length)
        const indeterminate = !!checkedList.length && (checkedList.length !== items.length)
        const classNames = classnames(
            `${prefixCls}-wrap`, {
                [`${prefixCls}-open`]: open
            })
        const overPanel = (<div className={`${prefixCls}-over-panel`}>
            <div className={`${prefixCls}-over-content`} onClick={this.stopPop}>
                {!isComment && <SearchInput onSearch={this.handleSearch} />}
                {items.length > 0 ? <div>
                    <CheckBox
                        checked={checkedAll}
                        indeterminate={indeterminate}
                        onChange={this.handleCheckedAll}
                    >全选</CheckBox>
                    <CheckBoxGroup block
                        className='auto-area'
                        checkedList={checkedList}
                        onScroll={this.loadItems}
                        onChange={(v) => this.handleChange(v)}>
                        {items.map(item => {
                            return <CheckBox key={item} value={item}><span title={item}>{item}</span></CheckBox>
                        })}
                    </CheckBoxGroup>
                </div> : <div className='load-icon'><SvgIcon name="icon-spinner-1" /></div>
                }
            </div>
            <ButtonGroup className={`${prefixCls}-footer`} feature='around'>
                <Button feature="transparent" onClick={this.handleConfirm}>确定</Button>
                <Button feature="transparent" onClick={this.handleCancel}>取消</Button>
            </ButtonGroup>
        </div>
        )
        return (
            <div className={classNames}>
                <span className="field-title" title={title}>{title + ':'}</span>
                <span className="filter-unit-close" onClick={this.handleRemove}></span>
                <div className={`${prefixCls}-box`} onClick={this.dropToggle}>{currentVal} <Icon type='caret-down' className={`${prefixCls}-icon`} /></div>
                {open ? overPanel : null}
            </div>
        )
    }
}
DropCheckBox.defaultProps = defaultProps;
export default DropCheckBox;