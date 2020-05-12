import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { IQueryOptionsItem } from '.';

export interface ISelectItemProps {
  keyName: string;
  queryOptions: IQueryOptionsItem;
  changeQueryOptions: (value: any, keyname: string) => void;
  allowClear?: boolean;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large' | undefined;
  style?: any;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  selectMode?: 'multiple' | 'tags';
  filterOption?: boolean | ((inputValue: any, option: any) => boolean);
  isRemote?: boolean; // 是否为远程搜索（select）
  getData?: Function; // 远程搜索请求方法（select）与 isRemote 联合使用
}

const { Option } = Select;

const SelectItem: React.FC<ISelectItemProps> = ({
  keyName,
  placeholder,
  allowClear,
  style,
  options,
  queryOptions,
  changeQueryOptions,
  selectMode,
  filterOption,
  isRemote,
  getData
}) => {
  const [selectOptions, setSelectOptions] = useState({})
  const [list, setList] = useState<{ value: string; label: string; disabled?: boolean }[]>([])

  useEffect(() => {
    if (isRemote) {
      setSelectOptions({
        showSearch: true,
        onSearch: onSearchFn
      })
    } else {
      options && setList(options)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRemote])

  const onSearchFn = async (value: string) => {
    if (value) {
      const result = await (getData && getData(value));
      setList(result)
    } else {
      setList([])
    }
  };

  const handleChange = (value: string | string[], keyName: string) => {
    changeQueryOptions(value, keyName);
  };
  return (
    <Select
      defaultValue={queryOptions[keyName]}
      value={queryOptions[keyName]}
      onChange={(value) => handleChange(value, keyName)}
      placeholder={placeholder}
      style={style}
      allowClear={allowClear}
      mode={selectMode}
      filterOption={filterOption}
      {...selectOptions}
    >
      {
        list?.map((op) => (
        <Option key={op.value} value={op.value} disabled={op.disabled}>
          {op.label}
        </Option>))
      }
    </Select>
  );
};

export default SelectItem;
