## Pagination 分页器
简单实现基本的分页功能

### 基础用法

普通分页用法。

:::demo Pagination 组件未提供多种主题，默认为bootstrap风格。

```js
constructor(props) {
    super(props);
    this.state = {
    totalNumber:1000,
    pageSize: 10,
    currentPage: 31
  }
}
handleChange = (idx) => {
    console.log('当前页码', idx);
}
render() {
    const {totalNumber, pageSize, currentPage } = this.state;
    return (
        <div>
            <Pagination
                totalNumber={totalNumber}
                currentPage={currentPage}
                pageSize={pageSize}
                middlePage={5}
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

显示上下页。

:::demo Pagination 组件提供精简的上下页分页，适用于一些简单的，数据量较小的列表分页

```js
constructor(props) {
    super(props);
    this.state = {
    totalNumber:1000,
    pageSize: 10,
    currentPage: 31
  }
}
handleChange = (idx) => {
    console.log('当前页码', idx);
}
render() {
    const {totalNumber, pageSize, currentPage } = this.state;
    return (
        <div>
            <Pagination
                totalNumber={totalNumber}
                currentPage={currentPage}
                pageSize={pageSize}
                middlePage={5}
                onChange={this.handleChange}
                showPrev
                showNext
            />
        </div>
    )
}
```
:::

精简模式分页。

:::demo Pagination 组件提供精简的上下页分页，适用于一些简单的，数据量较小的列表分页

```js
constructor(props) {
    super(props);
    this.state = {
    totalNumber:1000,
    pageSize: 10,
    currentPage: 31
  }
}
handleChange = (idx) => {
    console.log('当前页码', idx);
}
render() {
    const {totalNumber, pageSize, currentPage } = this.state;
    return (
        <div>
            <Pagination
                totalNumber={totalNumber}
                currentPage={currentPage}
                pageSize={pageSize}
                showPages={false}
                middlePage={5}
                onChange={this.handleChange}
                showPrev
                showNext
                prevText='上一页'
                nextText='下一页'
            />
        </div>
    )
}
```
:::

输入页码跳转。

:::demo Pagination 组件提供输入页码跳转，只需要增加showGo的属性即可。

```js
constructor(props) {
    super(props);
    this.state = {
    totalNumber:1000,
    pageSize: 10,
    currentPage: 31
  }
}
handleChange = (idx) => {
    console.log('当前页码', idx);
}
render() {
    const {totalNumber, pageSize, currentPage } = this.state;
    return (
        <div>
            <Pagination
                totalNumber={totalNumber}
                currentPage={currentPage}
                pageSize={pageSize}
                middlePage={5}
                onChange={this.handleChange}
                showPrev
                showNext
                showGo
            />
        </div>
    )
}
```
:::