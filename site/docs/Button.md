## Button 按钮
常用的操作按钮。

### 基础用法

2基础的按钮用法。

:::demo Button 组件默认提供7种主题，由`type`属性来定义，默认为`default`。

```js
render() {
  return (
    <div>
         <Button feature='minor'>minor</Button>
         <Button feature='success'>success</Button>
    </div>
  )
}
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```js
render() {
  return (
    <div>
         <Button disabled >disabled</Button>
    </div>
  )
}
```
:::

### 有颜色倾向

不同的颜色倾向代表不同的提示

:::demo 朴素按钮同样设置了不同的`type`属性对应的样式（可选值同上），默认为`info`。设置`plain`属性，它接受一个`Boolean`。注意，在该情况下，`type`虽然可以为`text`，但是是没有意义的，会显示为`text button`的样式。

```js
render() {
  return (
    <div className="intro-block">
      <div className="block">
        <Button feature='warning'>warning</Button>
        <Button feature='danger'>danger</Button>
        <Button circle >start</Button>
        <Button feature="transparent">transparent</Button>           
      </div>
    </div>
  )
}
```
:::

### 图标按钮

带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```js
render() {
  return (
    <div>
        <Button icon="plus">add</Button>
        <Button icon="plus" circle />
    </div>
  )
}
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`large`、`small`、`mini`，通过设置`size`属性来配置它们。

```js
render() {
  return (
    <div>
              <Button size="lg">大尺寸</Button>
              <Button size="sm">小尺寸</Button>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   large,small,mini            |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,info,text |     —    |
| plain     | 是否朴素按钮   | Boolean    | true,false | false   |
| loading     | 是否加载中状态   | Boolean    | — | false   |
| disabled  | 禁用    | boolean   | true, false   | false   |
| icon  | 图标，已有的图标库中的图标名 | string   |  —  |  —  |
| nativeType | 原生 type 属性 | string | button,submit,reset | button |
