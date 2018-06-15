/*
 * @Author: chen gong 
 * @Date: 2017-08-05 16:32:20 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-06-15 16:07:48
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'
import './index.less';

const propTypes = {
  currentPage: PropTypes.number,
  pagesPage: PropTypes.bool,      //表示一页显示的数据
  totalNumber: PropTypes.number,  //表示数据总数
  pageSize: PropTypes.number,     //页码改变时的回调
  middlePage: PropTypes.number,   //为页码中间所显示的页数。默认为5

  showGo: PropTypes.bool,         //是否显示跳转 
  showPages: PropTypes.bool,      //是否显示分页页码
  showPrev: PropTypes.bool,       //是否显示上一页
  showNext: PropTypes.bool,      //是否显示下一页
  prevText:PropTypes.string,
  nextText:PropTypes.string
}
const defaultProps = {
  prefixCls: _PRE_ + '-pagination',

  currentPage: 1,
  pagesPage: true,
  middlePage: 5,

  showGo: false,
  showPages: true,
  showPrev: false,
  showNext: false,
  prevText:'«',
  nextText:'»'
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.getRange = (start = 0, stop = null, step = 1) => {
      let [_start, _stop] = [0, start];
      if (stop !== null) {
        [_start, _stop] = [start, stop];
      }
      const length = Math.max(Math.ceil((_stop - _start) / step), 0);
      const range = Array(length);
      for (let idx = 0; idx < length; idx++ , _start += step) {
        range[idx] = _start;
      }
      return range;
    }
    this.state = {
      currentPage: props.currentPage,
      pageCount: Math.ceil(props.totalNumber / props.pageSize),
      inputPage:''
    };
  }
  componentWillReceiveProps(nextProps) {
    const { onChange, currentPage, totalNumber } = this.props;
    // 更新当前页码
    if (nextProps.currentPage !== currentPage) {
      this.setState({
        currentPage: nextProps.currentPage
      });
      onChange && onChange(nextProps.currentPage);
    }
    // 更新总数
    if (nextProps.totalNumber !== totalNumber) {
      let pageCount = Math.ceil(nextProps.totalNumber / nextProps.pageSize);
      // 重新更新了总数，判断页码是否在总页码范围内，如果不在则重置当前页码为1
      if (this.state.currentPage > pageCount) {
        this.setState({
          pageCount: pageCount,
          currentPage: 1
        });
        onChange && onChange(1);
      } else {
        this.setState({
          pageCount: pageCount
        });
        onChange && onChange(currentPage);
      }
    }
  }
  // 页码
  renderPages = e => {
    const { showPrev, prevText,nextText,showNext, pagesPage, showPages, prefixCls } = this.props;
    const { currentPage, pageCount } = this.state;
    let ret = [];
    if (showPrev) {
      const classNames = classnames(
        {
          [`${prefixCls}-prevPage`]: showPrev,
          [`${prefixCls}-disabled`]: currentPage === 1
        }
      )
      ret.push(<li onClick={this.handlePrevPage} className={classNames}>{prevText}</li>);
    }
    if (pagesPage && showPages) {
      ret = ret.concat(this.calculatePages());
    }
    if (showNext) {
      const classNames = classnames(
        {
          [`${prefixCls}-nextPage`]: showNext,
          [`${prefixCls}-disabled`]: currentPage === pageCount
        }
      )
      ret.push(<li onClick={this.handleNextPage} className={classNames} key="wt-pagination-nextPage">{nextText}</li>);
    }
    return ret;
  }
  // 页码点击跳转
  handlePageClick = idx => {
    if (idx === this.state.currentPage) {
      return;
    }
    this.jumpPage(idx);
  }
  // 上一页
  handlePrevPage = e => {
    const { currentPage } = this.state;
    
    if (currentPage > 1) {
      this.jumpPage(currentPage - 1);
    }
  }
  // 下一页
  handleNextPage = e => {
    const { currentPage, pageCount } = this.state;
    if (currentPage < pageCount) {
      this.jumpPage(currentPage + 1);
    }
  }
  // 跳转到某一页
  handleGo = e => {
    debugger
    if(e.key !== "Enter")
    return
    const { currentPage, pageCount} = this.state;
    let {inputPage} = this.state;
    // 输入页码必须为数字
    if (!/^(\d)+$/.test(inputPage)) {
      return;
    }
    inputPage = parseInt(inputPage);
    if (inputPage === this.state.currentPage) {
      return;
    }
    if (inputPage < 1 && pageCount > 1) {
      this.jumpPage(1);
      this.setState({
        inputPage:1
      })
      return;
    }
    if (inputPage > pageCount) {
      this.jumpPage(pageCount);
      this.setState({
        inputPage:pageCount
      })
      return
    }
    this.jumpPage(inputPage);
  }
  handleInput = v => {
     this.setState({
       inputPage:v
     }) 
  }
  jumpPage = idx => {
    const { onChange } = this.props;
    onChange && onChange(idx);
    this.setState({ currentPage: idx })
  }
  // 计算页码，返回页码元素
  calculatePages = e => {
    const { totalNumber, pageSize, middlePage, prefixCls } = this.props;
    const { currentPage, pageCount } = this.state;
    let fixPage = 0;									      // 根据middlePage修正页码
    let viewPageStart = 0;									// 中间页码开始
    let viewPageEnd = 0;								    // 中间页码结束
    let ret = [];
    // 中间页码修正，middlePage为偶数，viewPageEnd需要减1
    fixPage = middlePage % 2 === 0 ? 1 : 0;
    if (currentPage <= middlePage) {
      // 检测前边界值
      viewPageStart = 1;
      viewPageEnd = (middlePage + Math.floor(middlePage / 2)) > pageCount ? pageCount : middlePage + Math.floor(middlePage / 2);
    } else if (currentPage >= pageCount - Math.floor(middlePage / 2) - 1) {
      // -1 是为了最后一页显示6条分页数据 32..33 是不合理的 应该是 32 33

      // 检测后边界值
      viewPageStart = pageCount - middlePage;
      viewPageEnd = pageCount;
    } else {
      // middlePage在中间
      viewPageStart = currentPage - Math.floor(middlePage / 2);
      viewPageEnd = currentPage + Math.floor(middlePage / 2) - fixPage;
    }
    // 检测是否显示第一页和第一页后面的省略号
    if (viewPageStart > 2) {
      ret.push(<li onClick={e => this.handlePageClick(1)}>1</li>);
      ret.push(<li className={`${prefixCls}-dot`}>...</li>);
    }
    this.getRange(viewPageStart, viewPageEnd + 1).map((index, key) => {
      ret.push(<li onClick={e => this.handlePageClick(index)} key={'pagination-' + key}
        className={currentPage === index  ? `${prefixCls}-current` : null}>{index}</li>);
    });

    if (viewPageEnd !== pageCount) {
      ret.push(<li className={`${prefixCls}-dot`}>...</li>);
      ret.push(<li
        onClick={e => this.handlePageClick(pageCount)}>{pageCount}</li>
      );
    }
    return ret;
  }
  
  render() {
    const { showGo, prefixCls} = this.props;
    const {inputPage} = this.state;
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-pages`}>
          <ul>
            {this.renderPages()}
          </ul>
        </div>
        {
          showGo
            ? (
              <div className={`${prefixCls}-go-wrap`}>
                <div className={`${prefixCls}-go`}>
                  跳转到&nbsp;<input  value={inputPage} onChange={ e => this.handleInput(e.currentTarget.value)}  onKeyDown={this.handleGo}/>&nbsp;页
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }
}
Pagination.PropTypes = propTypes;
Pagination.defaultProps = defaultProps
export default Pagination;
