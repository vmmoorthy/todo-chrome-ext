import { useContext } from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
import { todoListSetstateContext } from "./TodoContainer";
const TodoList = ({ item, cb }) => {
    const [todoList, setTodoList] = useState(item.content || (() => ([{ uuid: uuidv4(), status: false, todo: "" }])));
    const Focus = useState(-1);

    const setTodo = useContext(todoListSetstateContext)

    useEffect(() => {
        setTodo(p => ({ ...p, list: p.list.map(i => i.uuid === item.uuid ? { ...i, content: todoList } : i) }))
    }, [todoList]);

    return (
            <div onMouseOver={e => e.target.parentElement.classList.remove('scrollFocus')} className="todoList bg-[#222] border-[1px] border-solid border-white w-full min-h-[5rem] p-1 rounded-[10px] mb-2">
                {todoList.map((item) => (
                    <Todo item={item} setTodoList={setTodoList} Focus={Focus} key={item.uuid} />
                ))}
            </div>
    );
}

export default TodoList;