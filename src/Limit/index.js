/*
 * @Author: chen gong 
 * @Date: 2017-10-24 17:11:22 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-24 17:20:53
 */
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Popover from '../Popover'
import './index.less'
import '../Tooltip/index.less';
class Limit extends Component {
    computWhith = () => {
        if (!this.rootNode) {
            this.rootNode = ReactDOM.findDOMNode(this)
        }
        return this.rootNode.offsetWidth < this.rootNode.scrollWidth
    }
    render() {
        const { prefixCls, Showtip, children, className, ...other } = this.props
        return (
            <Popover
                className={classnames(`${prefixCls}__popover`, className)}
                content={children.props.children}
                shouldOpen={Showtip ? this.computWhith() : false}
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