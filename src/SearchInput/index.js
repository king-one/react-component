import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Input from '../Input'
import Button from '../Button'
import './index.less'

class SearchInput extends Component {

    constructor(props) {
        super()
        this.state = {
            value: 'value' in props ? props.value : props.defaultValue ? props.defaultValue : ''
        }
    }

    componentWillReceiveProps(nextProps) {
        'value' in nextProps && this.setState({ value: nextProps.value })
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
    }

    handleSearch = () => {
        this.props.onSearch && this.props.onSearch(this.state.value)
    }

    handleKeyDown = (e) => {
        e.keyCode === 13 && this.handleSearch()
    }

    render() {
        const { prefixCls, text, className, mode, width, defaultValue, onChange, onSearch, block, size, placeholder, ...other
    } = this.props
        const { value } = this.state
        delete other.value
        const inputProps = { width, value, size, placeholder }
        const classNames = classnames(
            prefixCls, {
                [`${prefixCls}-block`]: block,
                [`${prefixCls}-inner`]: mode === 'inner',
                [`${prefixCls}-outer`]: mode === 'outer'
            },
            className
        )
        const feature = mode === 'inner' ? 'transparent' :'primary'
        return (
            <div className={classNames} {...other}>
                <Input
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    {...inputProps}
                />
                <Button
                    tabIndex="-1"
                    icon="search"
                    size={size}
                    className={prefixCls}
                    feature={feature}
                    onClick={this.handleSearch}
                >
                    {mode == 'outer' ? <span>{text}</span> : null}
                </Button>
            </div>
        )
    }
}

SearchInput.defaultProps = {
    prefixCls: _PRE_ + '-search',
    placeholder: '请输入关键词',
    width: '260px',
    mode: 'inner',
    text: '搜索'
}

SearchInput.propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'lg']),
    placeholder: PropTypes.string,
    block: PropTypes.bool,
    mode: PropTypes.oneOf(['outer', 'inner']),
    text: PropTypes.string
}
export default SearchInput;
