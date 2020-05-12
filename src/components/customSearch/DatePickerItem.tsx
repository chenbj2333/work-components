import React from 'react';
import { DatePicker } from 'antd';
import { IQueryOptionsItem } from '.';

export interface IInputItemProps {
  keyName: string;
  queryOptions: IQueryOptionsItem;
  changeQueryOptions: (value: any, keyname: string) => void;
  showTime?: boolean;
  format?: string | string[];
  allowClear?: boolean;
}

const { RangePicker } = DatePicker;

const DatePickerItem: React.FC<IInputItemProps> = ({
  keyName,
  queryOptions,
  changeQueryOptions,
  showTime,
  format,
  allowClear
}) => {
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   keyName: string
  // ) => {
  //   e.persist();
  //   changeQueryOptions(e.target.value, keyName);
  // };
  return (
    <RangePicker showTime={showTime} format={format} allowClear={allowClear} />
  );
};

export default DatePickerItem;
