import React from 'react';
import useSelections from '..';
import { Checkbox, Row, Col } from 'antd';

const SelectDemo: React.FC = () => {
  const list = [
    { id: 1, label: 'aaa' },
    { id: 2, label: 'bbb' },
    { id: 3, label: 'ccc' },
    { id: 4, label: 'ddd' },
    { id: 5, label: 'eee' },
    { id: 6, label: 'fff' },
    { id: 7, label: 'ggg' },
  ];
  const {
    selected,
    allSelected,
    isSelected,
    toggle,
    toggleAll,
    partiallySelected,
  } = useSelections(list, [{ id: 1, label: 'aaa' }]);

  return (
    <div>
      <div>selected: {selected.map(item => item.label)}</div>
      <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox indeterminate={partiallySelected} checked={allSelected} onClick={() => toggleAll()}>
          Check all
        </Checkbox>
      </div>
      <Row style={{ padding: '10px 0' }}>
        {list.map(item => (
          <Col span={8} key={item.id}>
            <Checkbox checked={isSelected(item)} onClick={() => toggle(item)}>
              {item.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SelectDemo;
