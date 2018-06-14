// wetoo-style standard checkbox

import React, { Component } from 'react'
// import Utils from './util'

const Utils = {
  getDataSetProps(obj) {
    const dataset = {}

    Object.keys(obj).forEach(key => {
      if (/^data\-.+$/.test(key)) {
        dataset[key] = obj[key]
      }
    })

    return dataset
  }  
}

class CheckBox extends Component {
  static defaultProps = {
    className: '',
    name: '',
    checked: false,
    disabled: false,
    onChange: e => e
  }

  render() {
    const { props } = this
    const datasetProps = Utils.getDataSetProps(props)

    return (
      <label className={props.className} title={props.children}>
        <div className="checkbox">
          <input
            checked={props.checked}
            type="checkbox"
            name={props.name}
            onChange={props.onChange}
            disabled={props.disabled}
            {...datasetProps}
          />
          <div className="checkbox-body" />
        </div>
        &nbsp;
        <span>{props.children}</span>
      </label>
    )
  }
}

export default CheckBox