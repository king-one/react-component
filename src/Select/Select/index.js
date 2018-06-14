
import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Icon from '../../Icon'
import './index.less'
const defaultProps = {
    prefixCls: _PRE_ + '-select'
}
class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectValue: props.defaultValue
        };
    }
    componentDidMount() {
        this.oneHandler = () => { //document 点击事件执行了就要清除
            this.setState({
                open: false
            });
            document.removeEventListener('click', this.oneHandler)
        }
        document.addEventListener('click', this.oneHandler)

    }
    componentWillReceiveProps(nexProps){
          if(this.props.defaultValue != nexProps.defaultValue){
              this.setState({
                  selectValue:nexProps.defaultValue
              })
          }
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
        document.addEventListener('click', this.oneHandler)
    }
    handleSelect = (props) => {
        const { onChange } = this.props;
        this.setState({
            text: props.children,
            selectValue: props.value
        });
        onChange && onChange(props.value);
    }
    render() {
        const { selectValue, open } = this.state
        const { prefixCls, children, title } = this.props;
        const options = React.Children.map(children, (child, key) => { //使用React.Children.map不用关心 children是否存在
            const { value, selected, children } = child.props;
            if (selectValue) {
                value === selectValue ? (this.text = children) : key === 0 && (this.text = children)
            } else {
                key === 0 && (this.text = children)
            }
            return React.cloneElement(child, {
                onSlected: this.handleSelect,
                selected: selectValue ? value === selectValue : key === 0 ? true : false
            })
        });
        const classNames = classnames(
            `${prefixCls}-wrap`, {
                [`${prefixCls}-open`]: open
            })

        return (
            <ul className={prefixCls}>
                <span className={`${prefixCls}-label`}>{title ? title : null}</span>
                <div className={classNames} onClick={this.dropToggle}>
                    <span className={`${prefixCls}-box`}>{this.text}</span><Icon type='arrow-down' className={`${prefixCls}-icon`}></Icon>
                    <div className={`${prefixCls}-options`}>
                        {open ? options : null}
                    </div>
                </div>
            </ul>
        )
    }
}
Select.defaultProps = defaultProps;
export default Select;