// import React from 'react';
// import { useTodoStore } from '@/store';
// import { Button } from 'antd';
// import { toJS } from 'mobx';

// const TodoList: React.FC = () => {
//   const { todoList, doneCount, undoneCount, add } = useTodoStore();

//   console.log(todoList.length);
//   return (
//     <div>
//       <div>
//         Done: {doneCount}
//         Undone: {undoneCount}
//       </div>
//       <Button onClick={add}>添加</Button>
//       {toJS(todoList).map((item) => (
//         <p>
//           {item.id}-{item.name}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default TodoList;
import React from 'react';
import { observer } from 'mobx-react';
import { useTodoStore } from '@/store';
import { Button, Tag, List, Switch } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const TodoList: React.FC = observer(() => {
  const {
    todoList,
    doneCount,
    undoneCount,
    add,
    toggleStatus,
  } = useTodoStore();

  const handleClick = (id: string) => {
    toggleStatus(id);
  };

  return (
    <>
      <section style={{ marginBottom: 16 }}>
        <Tag icon={<CheckCircleOutlined />} color='success'>
          已完成: {doneCount}
        </Tag>
        <Tag icon={<ClockCircleOutlined />} color='default'>
          未完成: {undoneCount}
        </Tag>
        <Button
          style={{ float: 'right' }}
          type='primary'
          onClick={add}
          size='small'
        >
          + 添加
        </Button>
      </section>
      <section>
        <List
          bordered
          dataSource={todoList}
          renderItem={(item) => (
            <List.Item>
              {item.done ? (
                <s style={{ color: '#1DA57A' }}>
                  {item.name}-{item.desc}({item.id})
                </s>
              ) : (
                <span>
                  {item.name}-{item.desc}({item.id})
                </span>
              )}
              <Switch
                style={{ float: 'right' }}
                checkedChildren='已完成'
                unCheckedChildren='未完成'
                checked={item.done}
                onClick={() => handleClick(item.id)}
              />
            </List.Item>
          )}
        />
      </section>
    </>
  );
});

export default TodoList;
