
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

class Checkbox extends Component {
    render() {
        const {
            prefixCls,
            children, className, block, indeterminate, onClick, value, checked, defaultChecked,
            onChange, disabled, ...other
  } = this.props

        const inputProps = { value, checked, defaultChecked, onChange, disabled }

        const classNames = classnames(`${prefixCls}-checkbox`, {
            ['${prefixCls}-disabled']: inputProps.disabled,
            ['${prefixCls}-block']: block,
            ['${prefixCls}-indeterminate']: indeterminate
        }, className)

        return (
            <label
                tabIndex={inputProps.disabled ? -1 : 0}
                className={classNames}
                onClick={e => {
                    if (e.target.tagName === 'INPUT') {
                        e.stopPropagation()
                    } else {
                        onClick && onClick(e)
                    }
                }}
                {...other}
            >
                <input
                    type="checkbox"
                    className="bfd-checkbox__input"
                    {...inputProps}
                />
                <span className="bfd-checkbox__status" />
                {children && <span className="bfd-checkbox__text">{children}</span>}
            </label>
        )
    }

}

Checkbox.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
}
export default Checkbox;
