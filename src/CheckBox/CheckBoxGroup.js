import React, {Component,PropTypes} from 'react'
import classnames from 'classnames'
class CheckboxGroup extends Component {
handleCheckBoxChange = (v) =>{
        const {onChange} = this.props;
        onChange &&　onChange(v)
    }
  render() {
    const {
     prefixCls, children, className,  onChange,  values, checkedList, block, ...other
    } = this.props;
    let checkboxes;
    if (values) {
      checkboxes = values.map((value, i) => {
       const checked =  checkedList.length === 0 ?  false : checkedList.indexOf(value) !== -1;
        return (
          <Checkbox
            key={i}
            value={value}
            checked={checked}
            onChange={ (value) => this.handleCheckBoxChange(value)}
            block={block}
          >
            {value}
          </Checkbox>
        )
      })
    } else {
      checkboxes = React.Children.map(children, (Checkbox, i) => {
        if (!Checkbox) return
        const props = Checkbox.props
        const value = props.value;
        const checked =  checkedList.length === 0 ?  false : checkedList.indexOf(value) !== -1;
        return React.cloneElement(Checkbox, {
          checked,
          key: i,
          block: props.block || block,
          onChange: () => {
            const value = props.value;
            this.handleCheckBoxChange(value)
          }
        })
      })
    }
    return (
      <div className={classnames(prefixCls, className)} {...other}>
        {checkboxes}
      </div>
    )
  }
}
CheckboxGroup.defaultProps = {
  prefixCls: _PRE_ + '-checkbox-group'
}
CheckboxGroup.propTypes = {
  // 更改选择后的回调，参数为选中的值
  onChange: PropTypes.func,
  // 针对 value 和 label 相同时快速创建复选框组，无需再调用 Checkbox
  values: PropTypes.array,
  // 是否垂直排列
  block: PropTypes.bool,
}
export default CheckboxGroup
