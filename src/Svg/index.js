/*
 * @Author: chen gong 
 * @Date: 2018-06-14 16:20:57 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-06-14 16:23:16
 */
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
class Svg extends Component {
    render() {
        const { className, name, ...other } = this.props
        return (
          <svg className={"icon " + (className || '')} {...other}>
            <use xlinkHref={"#" + name}></use>
          </svg>
        )
    }
}
Svg.propTypes = {
    name: PropTypes.string.isRequired
}