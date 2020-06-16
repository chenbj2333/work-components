# 分步表单组件 (v0.1.1-alpha)

## 何时使用

- 表单复杂，或有上下步骤时使用

## API

### props

| 属性               | 说明                       | 类型                  |
| ------------------ | -------------------------- | --------------------- |
| originStepInfoList | 传入的分步表单配置数据列表 | stepInfoItem[]        |
| onCloseFun         | 关闭的方法                 | () => void            |
| submitFun          | 提交的方法                 | (values: any) => void |
| btnLoading         | 提交按钮的状态             | boolean               |

### 类型定义

#### TStepStatusType

| 说明 | 类型 | |状态类型| 'error' / 'wait' / 'process' / 'finish' / undefined

### 接口定义

#### stepInfoItem

| 属性            | 说明                                        | 类型            |
| --------------- | ------------------------------------------- | --------------- |
| key             | 唯一值                                      | string / number |
| name            | 表单步骤名                                  | string          |
| status          | 步骤状态                                    | TStepStatusType |
| description     | _非必须_ 步骤描述                           | string          |
| dataWrapperName | _非必须_ 当前表单外层包裹 item 数据的字段名 | string          |
| component       | 需要显示的组件                              | ReactNode       |
