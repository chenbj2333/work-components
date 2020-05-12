import React from 'react';
import { Input } from 'antd';
import { IQueryOptionsItem } from '.';

export interface IInputItemProps {
  keyName: string;
  queryOptions: IQueryOptionsItem;
  changeQueryOptions: (value: any, keyname: string) => void;
  allowClear?: boolean;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large' | undefined;
}

const InputItem: React.FC<IInputItemProps> = ({
  keyName,
  placeholder,
  allowClear,
  size,
  queryOptions,
  changeQueryOptions,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyName: string
  ) => {
    e.persist();
    changeQueryOptions(e.target.value, keyName);
  };
  return (
    <Input
      allowClear={allowClear}
      onChange={(e) => handleChange(e, keyName)}
      placeholder={placeholder}
      size={size}
      value={queryOptions[keyName] as string | undefined}
    />
  );
};

export default InputItem;
