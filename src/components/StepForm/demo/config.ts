/*
 * @Description: 配置
 * @Author: GuoKang
 * @Date: 2020-06-16 10:55:42
 * @LastEditors: GuoKang
 * @LastEditTime: 2020-06-16 10:59:31
 */

export interface ConcurrenccyPolicyItem {
  value: string;
  lable: string;
}

export const RESTARTPOLICY: Array<ConcurrenccyPolicyItem> = [
  {
    lable: 'Always',
    value: 'Always',
  },
  {
    lable: 'OnFailure',
    value: 'OnFailure',
  },
  {
    lable: 'Never',
    value: 'Never',
  },
];

// 定义镜像拉取策略list
export const IMAGEPULLRTPOLICY: Array<ConcurrenccyPolicyItem> = [
  {
    value: 'Always',
    lable: 'Always',
  },
  {
    value: 'IfNotPresent',
    lable: 'Never',
  },
];
