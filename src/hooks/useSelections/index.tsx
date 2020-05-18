import { useState, useMemo } from 'react';

type selectionItem = {
  id: number | string;
  label: string | undefined;
};

const map2Array = (
  map: Map<string | number, string | undefined>
): selectionItem[] => {
  const arr: selectionItem[] = [];

  map.forEach((value: string | undefined, key: string | number) => {
    arr.push({
      id: key,
      label: map.get(key),
    });
  });
  return arr;
};

export default function useSelections<T>(
  items: selectionItem[],
  defaultSelected: selectionItem[] = []
) {
  const [selected, setSelected] = useState<selectionItem[]>(defaultSelected);
  const { selectedMap, isSelected, select, unSelect, toggle } = useMemo(() => {
    // 存放被选中的数组的一个map
    const selectedMap = new Map();
    selected.forEach((item: selectionItem) => {
      selectedMap.set(item.id, item.label);
    });

    // 是否被选中的方法
    const isSelected = (item: selectionItem) => {
      return selectedMap.has(item.id);
    };
    // 执行选中操作的方法
    const select = (item: selectionItem) => {
      selectedMap.set(item.id, item.label);
      return setSelected(map2Array(selectedMap));
    };
    // 执行取消选中操作的方法
    const unSelect = (item: selectionItem) => {
      selectedMap.delete(item.id);
      return setSelected(map2Array(selectedMap));
    };
    // 反选
    const toggle = (item: selectionItem) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return { selectedMap, isSelected, select, unSelect, toggle };
  }, [selected]);

  const {
    partiallySelected,
    noneSelected,
    allSelected,
    toggleAll,
    selectAll,
    unSelectAll,
  } = useMemo(() => {
    const selectAll = () => {
      items.forEach((o) => {
        selectedMap.set(o.id, o.label);
      });
      setSelected(map2Array(selectedMap));
    };

    const unSelectAll = () => {
      items.forEach((o) => {
        selectedMap.delete(o.id);
      });
      setSelected(map2Array(selectedMap));
    };
    const noneSelected = items.every((o) => !selectedMap.has(o.id));
    const allSelected =
      items.every((o) => selectedMap.has(o.id)) && !noneSelected;
    const partiallySelected = !noneSelected && !allSelected;
    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return {
      partiallySelected,
      noneSelected,
      allSelected,
      toggleAll,
      selectAll,
      unSelectAll,
    };
  }, [selectedMap, items]);

  return {
    selected,
    isSelected,
    partiallySelected,
    noneSelected,
    allSelected,
    toggle,
    toggleAll,
    select,
    unSelect,
    selectAll,
    unSelectAll,
  } as const;
}
