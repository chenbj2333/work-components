# 操作按钮组 (v0.1.0-alpha)

## 何时使用

- 有一系列操作按钮时使用，例如 table 中的操作项
- 当操作按钮小于等于 3 个时，平铺显示
- 大于 3 个时，以下拉菜单的方式显示

## API

### props

| 属性         | 说明                    | 类型       |
| ------------ | ----------------------- | ---------- |
| btns         | 传入的按钮组对象数组    | IBtnItem[] |
| dropdownName | _非必须_ 下拉菜单的名字 | string     |

### 接口定义

#### IBtnItem

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 按钮名 | string |
| handleClk | 点击按钮调用的方法 | (item?: any) => void; |
| popconfirm | _非必须_ 是否有确认提示，title 提示文字，okText 确认文字，cancelText 取消文字 | {title: string;okText: string;cancelText: string;} |
