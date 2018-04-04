import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../constants';
export default class PanelGrid extends (PureComponent || Component) {
  // 采用static 修饰  等价于  PanelUnit.propTYpes = {}
  static propTypes = {
    onHover: PropTypes.func,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    onHover: noop
  };

  onClickCell = unit => {
    !cell.isDisabled && this.props.onSelect(cell.value);
  };

  getTbody() {
    const { cells, onHover } = this.props;
    return cells.map((row, i) => {
      let tds = row.map((col, j) => {
        return (
          <li className="grid-unit" role="gridcell" key={j}>
            <div
              onClick={() => this.onClickCell(col)}
              onMouseOver={() => onHover(col.value)}
              className={col.className}
              title={col.title}
            >
              {col.text}
            </div>
          </li>
        );
      });

      return (
        <ul className="panel-table__row" role="row" key={i}>
          {tds}
        </ul>
      );
    });
  }

  render() {
    return <div>{this.getTbody()}</div>;
  }
}
