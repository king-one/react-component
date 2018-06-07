import React, { Component } from 'react';
import pages from '../../pages';
import "./index.less"
export default class Side extends Component {
  render() {
   return <nav className="side-nav">
      <ul>
        {
          pages.map((v,k) =>
          <li className="nav-item" key={k}> <a>{v.categoryCn}</a>
            <ul className="pure-menu-list sub-nav">
              {
                v.components.map((page,k) => {
                  return (
                    <li className="nav-item" key={k}>
                      <a href={`#/${v.categoryEn}/${page.en}`}>{page.cn}</a>
                    </li>
                  )
                })
              }
            </ul>
          </li>)
        }
      </ul>
    </nav>
  }
}