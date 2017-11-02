/*
 * @Author: chen gong 
 * @Date: 2017-10-24 17:11:22 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-11-02 17:08:34
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
            overflow: this.computWhith()
        })
    }
    computWhith = () => {
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
                shouldOpen={showTip ? false : this.state.overflow}
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