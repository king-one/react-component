/*
 * @Author: chen gong 
 * @Date: 2017-10-24 17:11:22 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-04-02 14:38:57
 */
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Popover from '../Popover'
import './index.less'
import '../Tooltip/index.less';
class Limit extends Component {
    state = {
        overflow:false
    }
    componentDidMount(){
        this.setState({
            overflow: this.computWidth()
        })
    }
    computWidth = () => {  //计算文本是否溢出 
        if (!this.rootNode) {
            this.rootNode = ReactDOM.findDOMNode(this)
        }
        return this.rootNode.offsetWidth < this.rootNode.scrollWidth
    }

    render() {
        const { prefixCls, showTip, children, className, ...other } = this.props
        return (
            <Popover
                className={classnames(`${prefixCls}__popover`, className)}
                content={children.props.children}
                shouldOpen={showTip ? false : this.state.overflow}// 指定不显示tooltip则不显示  默认会根据文字宽度计算是否展示toolTip
                {...other}
            >
                {React.cloneElement(children, {
                    className: classnames(children.props.className, `${prefixCls}-text-overflow`)
                })}
            </Popover>
        )
    }
}
Limit.defaultProps = {
    prefixCls:_PRE_
}
export default Limit;