import React, { useState, useEffect } from 'react';
import { Moment } from 'moment';
import { DatePicker } from 'antd';
import { IQueryOptionsItem } from '.';

export interface IInputItemProps {
  keyName: string;
  queryOptions: IQueryOptionsItem;
  changeQueryOptions: (value: any, keyname: string) => void;
  showTime?: boolean;
  format?: string | string[];
  allowClear?: boolean;
  disabledDates?: number;
}

const { RangePicker } = DatePicker;

const DatePickerItem: React.FC<IInputItemProps> = ({
  keyName,
  queryOptions,
  changeQueryOptions,
  showTime,
  format,
  allowClear,
  disabledDates
}) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (!queryOptions[keyName]) {
      setDates([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryOptions])

  const onCalendarChange = (value: any) => {
    setDates(value)
    changeQueryOptions(value, keyName);
  };
  const disabledDate = ((current: Moment): boolean => {
    if (!dates || dates.length === 0 || !disabledDates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > disabledDates
    const tooEarly = dates[1] && (dates[1] as Moment).diff(current, 'days') > disabledDates
    return tooEarly || tooLate;
  })
  return (
    <RangePicker
      style={{width: '100%'}}
      value={queryOptions[keyName] as [Moment | null, Moment | null] | undefined}
      showTime={showTime}
      format={format}
      allowClear={allowClear}
      onCalendarChange={onCalendarChange}
      disabledDate={disabledDate}
    />
  );
};

export default DatePickerItem;
