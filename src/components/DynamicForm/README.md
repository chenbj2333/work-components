# 动态增减表单项组件 (v0.1.0-alpha)

## 何时使用

- 当在表单项中需要动态增加或删除某一项表单项时使用
- 目前包括两种类型：input 和 select

## API

### props

| 属性             | 说明                                         | 类型            |
| ---------------- | -------------------------------------------- | --------------- |
| keyName          | 自定义的属性名称，对应表单成功提交时的属性名 | string[]        |
| formItemTemplate | 表单项的数据模板                             | IFormTemplate   |
| originData       | 表单接受的源数据                             | IFormListItem[] |
| formRef          | 当前表单的引用                               |

### 接口定义

#### IFormTemplate

| 属性           | 说明                                                       | 类型      |
| -------------- | ---------------------------------------------------------- | --------- |
| [name: string] | 一个对象，key 为任意 string 类型的名字，value 为 IFormItem | IFormItem |

#### IFormListItem

| 属性           | 说明               | 类型            |
| -------------- | ------------------ | --------------- |
| id             | 唯一值             | string / number |
| [name: string] | 继承 IFormTemplate | IFormItem       |

#### IFormItem

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| componentName | 组件名 | 'input' / 'select' |
| placeholder | _非必须_ 默认文字 | string |
| disabled | _非必须_ 是否禁用 | boolean |
| value | 初始值 | string |
| key | _非必须_ key 值，字段名 | string |
| rules | _非必须_ 验证规则 | any[] |
| hasAddonAfter | _非必须_ 是否有后缀 | boolean |
| options | _非必须_ select 选项 | formSelectOption[] |
| onSelectChange | _非必须_ select 值变化时调用的方法 | (value: string, option: any, element: IFormItem) => void |

#### formSelectOption

| 属性          | 说明                            | 类型    |
| ------------- | ------------------------------- | ------- |
| value         | 默认根据此属性值进行筛选        | string  |
| label         | 页面实际显示的内容              | string  |
| disabled      | _非必须_                        | boolean |
| hasAddonAfter | _非必须_ 某个 option 是否有后缀 | boolean |
