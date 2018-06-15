import React, { Component } from 'react';
import pages from '../../pages';
import "./index.less"
export default class Side extends Component {
  state = { showMenuBtn: false }
  showMenuBtn = e => {
    this.setState({
      showMenuBtn: !this.state.showMenuBtn
    })
  }
  render() {
    const { showMenuBtn } = this.state;
    const {currentPage} = this.props;
    return <div>
      {showMenuBtn && <div className="drag-bg"></div>}
      <nav className={showMenuBtn ? "side-nav m-side-active" : "side-nav"}>
        <div className="mobile-button" onClick={this.showMenuBtn}>
          ≡
         </div>

        <ul>
          {
            pages.map((v, k) =>
              <li className="nav-item" key={k}> <a>{v.categoryCn}</a>
                <ul className="pure-menu-list sub-nav">
                  {
                    v.components.map((page, k) => {
                      return (
                        <li className={currentPage === page.en ? 'nav-item active':'nav-item '} key={k}>
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
    </div>
  }
}