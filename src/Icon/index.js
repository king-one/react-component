/*
 * @Author: chen gong 
 * @Date: 2017-10-12 15:23:28 
 * @Last Modified by: chen gong
 * @Last Modified time: 2017-10-12 15:28:36
 */
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import 'font-awesome/css/font-awesome.css'

class Icon extends Component {

    render() {
        const { className, type, ...other } = this.props
        return (
            <i className={classnames('sw-icon fa', 'fa-' + type, className)} {...other}></i>
        )
    }
}
Icon.propTypes = {
    // 图标类型，http://fontawesome.io/icons/
    type: PropTypes.string.isRequired
}

export default Icon