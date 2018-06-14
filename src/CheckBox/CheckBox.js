
import React, {Component,PropTypes} from 'react'
import classnames from 'classnames'

class Checkbox extends Component {
    render() {
        const {
            prefixCls,
            children, className, block, indeterminate, value, checked, defaultChecked,
            onChange, disabled, ...other
  } = this.props;

        const inputProps = { value, checked, defaultChecked, onChange, disabled }
     
        const classNames = classnames(prefixCls, {
            [`${prefixCls}-disabled`]: inputProps.disabled,
            [`${prefixCls}-block`]: block,
            [`${prefixCls}-indeterminate`]: indeterminate
        }, className)
        return (
            <label
                tabIndex={inputProps.disabled ? -1 : 0}
                className={classNames}
                {...other}
            >
                <input
                    type="checkbox"
                    className={`${prefixCls}-input`}
                    {...inputProps}
                />
                <span className={`${prefixCls}-status`} />
                {children && <span className={`${prefixCls}-text`}>{children}</span>}
            </label>
        )
    }

}

Checkbox.propTypes = {
    prefixCls:PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
}
Checkbox.defaultProps = {
    prefixCls:_PRE_+'-checkbox'
}
export default Checkbox;
