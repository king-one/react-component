import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import controlledPropValidator from '../_shared/propValidator/controlled'
import Input from '../Input'
import Button from '../Button'
import './index.less'

class SearchInput extends Component {

    constructor(props) {
        super()
        this.state = {
            value: 'value' in props ? props.value : props.defaultValue
        }
    }

    componentWillReceiveProps(nextProps) {
        'value' in nextProps && this.setState({ value: nextProps.value })
    }

    handleChange(e) {
        const { value } = e.target
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
    }

    handleSearch() {
        this.props.onSearch && this.props.onSearch(this.state.value)
    }

    handleKeyDown(e) {
        e.key === 'Enter' && this.handleSearch()
    }

    render() {

        const {
      perfixCls, className, mode,defaultValue, onChange, onSearch, block, size, placeholder, ...other
    } = this.props
        const { value } = this.state
        delete other.value

        const inputProps = { value, size, placeholder }
        classNames = classnames(prefixCls, , {
            [`${prefix}-block`]: block
        },
            className)
        return (
            <div className={classnames} {...other}>
                <Input
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    {...inputProps}
                />
                <Button
                    tabIndex="-1"
                    icon="search"
                    size='sm'
                    transparent
                    className={`${prefix}-search`}
                    onClick={this.handleSearch}
                />
            </div>
        )
    }
}

SearchInput.defaultProps = {
    placeholder: '请输入关键词',
    size: 'sm',
    mode:'inner'
}

SearchInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'lg']),
    placeholder: PropTypes.string,
    block: PropTypes.bool,
    mode:PropTypes.oneOfType(['outer','inner'])
}
export default SearchInput;
