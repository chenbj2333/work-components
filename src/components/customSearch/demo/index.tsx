import React from 'react';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import CustomSearch, { ISearchItem, IQueryOptionsItem } from '..';

const CustomSearchDemo: React.FC = () => {
  const fetch = (value: any) => {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    return jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then((response: any) => response.json())
      .then((d: any) => {
        const { result } = d;
        const list: any[] = [];
        result.forEach((r: any) => {
          list.push({
            value: r[0],
            label: r[0],
          });
        });
        return list;
      });
  };

  const handleFilterOption = (inputValue: any, option: any) => {
    return option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };

  const searchList: ISearchItem[] = [
    {
      componentName: 'input',
      componentLabel: '测试名称',
      placeholder: '请输入您要查询的内容',
      allowClear: true,
      size: 'middle',
      keyName: 'testName',
    },
    {
      componentName: 'select',
      componentLabel: '姓名',
      placeholder: '请选择您要查询的内容',
      allowClear: false,
      keyName: 'peopleName',
      style: { width: '100%' },
      options: [
        { value: '1', label: 'lucy' },
        { value: '2', label: 'tom' },
        { value: '3', label: 'xxxx', disabled: true },
        { value: '4', label: 'john' },
        { value: '5', label: 'lily' },
      ],
      filterOption: handleFilterOption,
    },
    {
      componentName: 'select',
      componentLabel: '阿里巴巴',
      placeholder: '远程查询的内容',
      allowClear: false,
      keyName: 'alipapa',
      style: { width: '100%' },
      filterOption: false,
      selectMode: 'multiple',
      isRemote: true,
      getData: fetch,
    },
    {
      componentName: 'datepicker',
      componentLabel: '日期选择1',
      keyName: 'datep1',
      showTime: true,
    },
    {
      componentName: 'datepicker',
      componentLabel: '日期选择2',
      keyName: 'datep2',
      format: 'YYYY/MM/DD'
    }
  ];

  const searchFn = (options: IQueryOptionsItem) => {
    console.log(options);
  };

  return (
    <div>
      <CustomSearch searchList={searchList} searchFn={searchFn} />
    </div>
  );
};

export default CustomSearchDemo;
