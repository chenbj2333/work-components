import React, { useState, useEffect } from 'react';
import { Moment } from 'moment';
import { Button, Row, Col } from 'antd';
import './index.css';
import InputItem from './InputItem';
import SelectItem from './SelectItem';
import DatePickerItem from './DatePickerItem';

export interface IQueryOptionsItem {
  [name: string]: string | string[] | number[] | [Moment | null, Moment | null] | undefined; // 返给后端的查询条件
}

export interface ISearchItem {
  componentName: string; // 使用的组件名称
  componentLabel: string; // 组件框的 label
  keyName: string; // 提交给后端的字段名
  allowClear?: boolean; // 是否支持清除
  placeholder?: string; // 默认文字
  size?: 'small' | 'middle' | 'large' | undefined; // 大小
  style?: { [name: string]: string }; // 样式
  options?: { value: string; label: string; disabled?: boolean }[] | undefined; // 选项(select)
  selectMode?: 'multiple' | 'tags'; // 设置 Select 的模式为多选或标签(select)

  filterOption?: boolean | ((inputValue: any, option: any) => boolean); // 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  isRemote?: boolean; // 是否为远程搜索(select)
  getData?: Function; // 远程搜索请求方法(select)与 isRemote 联合使用
  showTime?: boolean; // 增加时间选择功能 (datePicker)
  format?: string | string[]; // 设置日期格式 (datePicker)
  disabledDates?: number; // 只能选择的日期天数
}

export interface ICustomSearchProps {
  searchLabel?: string; // 查询的文字，如果不传默认“查询”
  searchStyle?: { [name: string]: string }; // 查询按钮的样式
  searchFn: (options: IQueryOptionsItem) => void; // 查询的方法
  resetLabel?: string; // 重置的文字，如果不传默认“重置”
  resetStyle?: { [name: string]: string }; // 重置按钮的样式
  searchList: ISearchItem[]; // 源数据列表
}

const CustomSearch: React.FC<ICustomSearchProps> = ({
  searchList,
  searchLabel,
  resetLabel,
  searchStyle,
  resetStyle,
  searchFn,
}) => {
  const [queryOptions, setQueryOptions] = useState<IQueryOptionsItem>({});

  useEffect(() => {
    let temp = {};
    searchList.forEach((item) => {
      temp = { ...temp, [item.keyName]: undefined };
    });
    setQueryOptions({
      ...temp,
    });
  }, [searchList]);

  const changeQueryOptions = (value: string | string[], keyName: string) => {
    const temp: IQueryOptionsItem = { ...queryOptions };
    temp[keyName] = value;
    setQueryOptions(temp);
  };

  // 查询
  const search = () => {
    searchFn(queryOptions);
  };

  // 清空
  const reset = () => {
    const temp: IQueryOptionsItem = {};
    Object.keys(queryOptions).forEach((key: string) => {
      temp[key] = undefined;
    });
    setQueryOptions(temp);
  };

  // 主体内容
  const content = (item: ISearchItem, children: React.ReactElement) => {
    return (
      <Col span={8} key={item.keyName} style={{minWidth: 460}}>
        <Row align='middle'>
          <Col span={6} style={{ textAlign: 'right', paddingRight: 16 }}>
            {item.componentLabel}
          </Col>
          <Col span={18}>{children}</Col>
        </Row>
      </Col>
    );
  };

  return (
    <div className='custom-search-wrapper'>
      <Row
        gutter={[16, 16]}
        align='middle'
        className='search-box'
      >
        {searchList.map((item: ISearchItem) => {
          if (item.componentName.toLocaleLowerCase() === 'input') {
            return content(
              item,
              <InputItem
                keyName={item.keyName}
                size={item.size}
                placeholder={item.placeholder}
                queryOptions={queryOptions}
                changeQueryOptions={changeQueryOptions}
                allowClear={item.allowClear}
              />
            );
          } else if (item.componentName.toLocaleLowerCase() === 'select') {
            return content(
              item,
              <SelectItem
                keyName={item.keyName}
                style={item.style}
                options={item.options}
                size={item.size}
                placeholder={item.placeholder}
                queryOptions={queryOptions}
                changeQueryOptions={changeQueryOptions}
                allowClear={item.allowClear}
                selectMode={item.selectMode}
                filterOption={item.filterOption}
                isRemote={item.isRemote}
                getData={item.getData}
              />
            );
          } else if (item.componentName.toLocaleLowerCase() === 'datepicker') {
            return content(
              item,
              <DatePickerItem
                queryOptions={queryOptions}
                changeQueryOptions={changeQueryOptions}
                keyName={item.keyName}
                showTime={item.showTime}
                format={item.format}
                disabledDates={item.disabledDates}
              />
            );
          } else {
            return null;
          }
        })}
      </Row>
      <Row className='handle-btn' justify='end' align='middle'>
        <Button type='primary' style={searchStyle} onClick={search}>
          {searchLabel || '查询'}
        </Button>
        <Button style={resetStyle} onClick={reset}>
          {resetLabel || '重置'}
        </Button>
      </Row>
    </div>
  );
};

export default CustomSearch;
